import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logLeadActivity } from '../../../lib/tracking';
import { 
  ArrowLeft, Building2, Home, Mail, Phone, MapPin, 
  Battery, Zap, Sun, Clock, FileText, CheckCircle2,
  AlertCircle, Activity, Send
} from 'lucide-react';
import { pushLeadToOpenlead } from '../../../lib/openlead';

export default function LeadDetail({ leadId }: { leadId: string }) {
  const [lead, setLead] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchLead();
    fetchLogs();
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('*').eq('id', leadId).single();
      if (error) throw error;
      setLead(data);
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('lead_activity_logs')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
      await logLeadActivity(leadId, 'Status Changed', `Status updated to ${newStatus}`);
      await fetchLead();
      await fetchLogs();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePushToOpenlead = async () => {
    setUpdating(true);
    try {
      const success = await pushLeadToOpenlead(lead);
      if (success) {
        await handleStatusChange('Sent to Installer');
      } else {
        alert('Failed to push to Openlead. Check console for details.');
      }
    } catch (error) {
      console.error('Error pushing to Openlead:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-brand-muted">Loading lead details...</div>;
  if (!lead) return <div className="p-10 text-center text-red-500">Lead not found.</div>;

  return (
    <div className="min-h-screen bg-brand-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <a href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-bold text-brand-muted hover:text-brand-navy mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Leads
            </a>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-serif font-bold text-brand-navy">{lead.full_name}</h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">{lead.status}</span>
            </div>
            <p className="text-brand-muted mt-1">Lead ID: <span className="font-mono text-xs">{lead.id}</span></p>
          </div>
          <div className="flex gap-3">
            <select 
              value={lead.status} 
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="px-4 py-2 rounded-lg border border-brand-accent focus:outline-none font-bold text-sm bg-white"
            >
              <option value="New">New</option>
              <option value="Assessing">Assessing</option>
              <option value="Qualified">Qualified</option>
              <option value="Sent to Installer">Sent to Installer</option>
              <option value="Disqualified">Disqualified</option>
            </select>
            <button 
              onClick={handlePushToOpenlead}
              disabled={updating || lead.status === 'Sent to Installer'}
              className="bg-brand-navy text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-brand-navy/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Push to Openlead
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: 30-Second Summary */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Intent & Scoring Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-brand-accent p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-brand-muted mb-1">Intent Category</p>
                <p className="text-2xl font-serif font-bold text-brand-navy">{lead.intent_category}</p>
                <p className="text-sm text-brand-muted mt-1 capitalize">Requested: {lead.requested_action}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-brand-muted mb-1">Lead Score</p>
                <p className="text-4xl font-serif font-bold text-brand-navy">{lead.lead_score}</p>
              </div>
            </div>

            {/* Core Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Contact & Property */}
              <div className="bg-white rounded-2xl shadow-sm border border-brand-accent p-6">
                <h3 className="text-sm font-bold uppercase text-brand-muted mb-4 border-b border-gray-100 pb-2">Contact & Property</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-muted" /> <a href={`mailto:${lead.email}`} className="text-brand-navy font-medium hover:underline">{lead.email}</a></div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-muted" /> <a href={`tel:${lead.phone}`} className="text-brand-navy font-medium hover:underline">{lead.phone}</a></div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-muted" /> <span className="text-brand-navy font-medium">{lead.house_number} {lead.postcode}</span></div>
                  <div className="flex items-center gap-3">
                    {lead.property_type === 'commercial' ? <Building2 className="h-4 w-4 text-brand-muted" /> : <Home className="h-4 w-4 text-brand-muted" />} 
                    <span className="text-brand-navy font-medium capitalize">{lead.property_type} ({lead.ownership === 'yes' ? 'Owner' : 'Tenant'})</span>
                  </div>
                </div>
              </div>

              {/* Energy & Solar */}
              <div className="bg-white rounded-2xl shadow-sm border border-brand-accent p-6">
                <h3 className="text-sm font-bold uppercase text-brand-muted mb-4 border-b border-gray-100 pb-2">Energy & Assessment</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3"><Zap className="h-4 w-4 text-brand-muted" /> <span className="text-brand-navy font-medium">£{lead.monthly_spend}/month spend</span></div>
                  <div className="flex items-center gap-3"><Sun className="h-4 w-4 text-brand-muted" /> <span className="text-brand-navy font-medium">Est. {lead.solar_data?.estimate?.size || '?'} kWp System</span></div>
                  <div className="flex items-center gap-3"><Battery className="h-4 w-4 text-brand-muted" /> <span className="text-brand-navy font-medium capitalize">Battery: {lead.battery_interest?.replace('_', ' ')}</span></div>
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-brand-muted" /> <span className="text-brand-navy font-medium capitalize">Timeline: {lead.timeframe?.replace('_', ' ')}</span></div>
                </div>
              </div>

            </div>

            {/* Bill Upload Status */}
            {lead.bill_url && (
              <div className="bg-brand-green/10 rounded-2xl border border-brand-green/20 p-6 flex items-center gap-4">
                <div className="bg-brand-green/20 p-3 rounded-xl"><FileText className="h-6 w-6 text-brand-green" /></div>
                <div>
                  <h3 className="text-brand-green font-bold">Electricity Bill Uploaded</h3>
                  <p className="text-sm text-brand-green/80">The user has securely uploaded their bill for accurate qualification.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Activity Timeline & Signals */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-brand-accent p-6">
              <h3 className="text-sm font-bold uppercase text-brand-muted mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Activity className="h-4 w-4" /> Scoring Signals
              </h3>
              <ul className="space-y-2">
                {lead.scoring_signals?.map((signal: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-mono text-brand-navy bg-gray-50 px-3 py-2 rounded-md">
                    <CheckCircle2 className="h-3 w-3 text-brand-green" /> {signal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-brand-accent p-6">
              <h3 className="text-sm font-bold uppercase text-brand-muted mb-4 border-b border-gray-100 pb-2">Activity Timeline</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-accent before:to-transparent">
                {logs.map((log) => (
                  <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-brand-navy text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-white p-3 rounded-xl border border-brand-accent shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs text-brand-navy">{log.action}</span>
                      </div>
                      <p className="text-[10px] text-brand-muted mb-2">{new Date(log.created_at).toLocaleString()}</p>
                      {log.description && <p className="text-xs text-brand-navy/80">{log.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}