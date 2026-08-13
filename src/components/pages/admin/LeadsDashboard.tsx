import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Battery, 
  Zap, 
  Building2, 
  Home, 
  FileText,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  MoreVertical,
  Activity
} from 'lucide-react';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [intentFilter, setIntentFilter] = useState('All');
  
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.postcode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesIntent = intentFilter === 'All' || lead.intent_category === intentFilter;
    
    return matchesSearch && matchesStatus && matchesIntent;
  });

  const getIntentColor = (intent: string) => {
    switch(intent) {
      case 'VERY HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Sent to Installer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-brand-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-navy mb-2">Lead Intelligence</h1>
            <p className="text-brand-muted">Manage, qualify and assign solar opportunities.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-brand-accent text-center">
              <p className="text-[10px] font-bold uppercase text-brand-muted mb-1">Total Leads</p>
              <p className="text-2xl font-serif font-bold text-brand-navy">{leads.length}</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-brand-accent text-center">
              <p className="text-[10px] font-bold uppercase text-brand-muted mb-1">High Intent</p>
              <p className="text-2xl font-serif font-bold text-brand-navy">
                {leads.filter(l => l.intent_category === 'HIGH' || l.intent_category === 'VERY HIGH').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brand-accent overflow-hidden">
          <div className="p-4 border-b border-brand-accent bg-gray-50/50 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
              <input 
                type="text" 
                placeholder="Search by name or postcode..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-accent focus:outline-none focus:border-brand-navy text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 rounded-lg border border-brand-accent focus:outline-none text-sm font-medium bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Assessing">Assessing</option>
              <option value="Qualified">Qualified</option>
              <option value="Sent to Installer">Sent to Installer</option>
            </select>
            <select 
              className="px-4 py-2 rounded-lg border border-brand-accent focus:outline-none text-sm font-medium bg-white"
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
            >
              <option value="All">All Intents</option>
              <option value="VERY HIGH">Very High</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-brand-muted border-b border-brand-accent">
                  <th className="py-4 px-6 font-bold">Contact</th>
                  <th className="py-4 px-6 font-bold">Property</th>
                  <th className="py-4 px-6 font-bold">Score & Intent</th>
                  <th className="py-4 px-6 font-bold">System / Value</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-brand-muted">Loading leads...</td>
                  </tr>
                ) : filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-brand-navy">{lead.full_name}</p>
                      <p className="text-xs text-brand-muted mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 mb-1">
                        {lead.property_type === 'commercial' ? <Building2 className="h-4 w-4 text-brand-muted" /> : <Home className="h-4 w-4 text-brand-muted" />}
                        <span className="font-medium capitalize">{lead.property_type}</span>
                      </div>
                      <p className="text-xs text-brand-muted">{lead.postcode}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-brand-navy">{lead.lead_score}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getIntentColor(lead.intent_category)}`}>
                          {lead.intent_category}
                        </span>
                      </div>
                      {lead.bill_url === 'uploaded_securely' && (
                        <div className="flex items-center gap-1 text-[10px] text-brand-green font-bold mt-1">
                          <FileText className="h-3 w-3" /> Bill Uploaded
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-brand-navy">{lead.solar_data?.estimate?.size || '?'} kWp</p>
                      <p className="text-xs text-brand-muted mt-1">£{lead.monthly_spend}/mo spend</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a href={`/admin/leads/${lead.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-brand-navy hover:text-brand-accent transition-colors">
                        View <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}