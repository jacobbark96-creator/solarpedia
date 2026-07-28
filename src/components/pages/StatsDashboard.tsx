import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Lock, Users, MousePointerClick, UserPlus, Activity, Clock } from 'lucide-react';

interface Visitor {
  ip_address: string;
  page_views: Record<string, number>;
  last_seen: string;
  created_at?: string;
  full_name?: string;
  email?: string;
  phone?: string;
}

const StatsDashboard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Bedders.1') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchVisitors = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('visitor_tracking')
        .select('*')
        .order('last_seen', { ascending: false });
        
      if (!error && data) {
        setVisitors(data);
      }
      setLoading(false);
    };

    fetchVisitors();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('public:visitor_tracking')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'visitor_tracking' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setVisitors((prev) => [payload.new as Visitor, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setVisitors((prev) => prev.map((v) => v.ip_address === payload.new.ip_address ? (payload.new as Visitor) : v));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isAuthenticated]);

  // Derived Statistics
  const stats = useMemo(() => {
    const totalVisitors = visitors.length;
    let totalPageViews = 0;
    const pageViewCounts: Record<string, number> = {};
    let leadsCount = 0;
    let activeNow = 0; // Seen in last 5 minutes

    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);

    visitors.forEach((visitor) => {
      // Leads
      if (visitor.email || visitor.phone) leadsCount++;

      // Active
      if (new Date(visitor.last_seen) >= fiveMinsAgo) activeNow++;

      // Page Views
      if (visitor.page_views) {
        Object.entries(visitor.page_views).forEach(([path, count]) => {
          totalPageViews += count;
          pageViewCounts[path] = (pageViewCounts[path] || 0) + count;
        });
      }
    });

    // Top Pages for Bar Chart
    const topPages = Object.entries(pageViewCounts)
      .map(([path, views]) => ({ path: path === '/' ? '/ (Home)' : path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Lead Conversion Data for Pie Chart
    const conversionData = [
      { name: 'Leads', value: leadsCount, color: '#16a34a' },
      { name: 'Visitors', value: Math.max(0, totalVisitors - leadsCount), color: '#94a3b8' }
    ];

    return {
      totalVisitors,
      totalPageViews,
      leadsCount,
      activeNow,
      topPages,
      conversionData
    };
  }, [visitors]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-white p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-accent max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-navy" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-brand-navy mb-2">Restricted Access</h1>
          <p className="text-brand-muted mb-8 text-sm">Please enter the password to view the analytics dashboard.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-brand-accent focus:ring-2 focus:ring-brand-navy focus:border-brand-navy outline-none transition-all text-center"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-navy/90 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-accent shadow-sm">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-navy">Live Visitor Analytics</h1>
            <p className="text-brand-muted flex items-center gap-2 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
              </span>
              Real-time tracking active
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-sm font-medium text-brand-muted hover:text-brand-navy transition-colors"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-brand-accent shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-muted uppercase tracking-wider">Active Now</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.activeNow}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-accent shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-muted uppercase tracking-wider">Total Visitors</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.totalVisitors}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-accent shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-muted uppercase tracking-wider">Page Views</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.totalPageViews}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-accent shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-muted uppercase tracking-wider">Total Leads</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.leadsCount}</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Pages Chart */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-brand-accent shadow-sm">
            <h2 className="text-xl font-serif font-bold text-brand-navy mb-6">Top Pages</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topPages} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="path" type="category" width={150} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="views" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Pie Chart */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-accent shadow-sm flex flex-col">
            <h2 className="text-xl font-serif font-bold text-brand-navy mb-6">Lead Conversion</h2>
            <div className="flex-grow flex items-center justify-center h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.conversionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                <span className="text-sm text-brand-muted">Leads ({((stats.leadsCount / Math.max(1, stats.totalVisitors)) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-sm text-brand-muted">Visitors</span>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Visitors Table */}
        <div className="bg-white rounded-3xl border border-brand-accent shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-brand-accent">
            <h2 className="text-xl font-serif font-bold text-brand-navy">Recent Visitors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-white/50 text-brand-muted text-xs uppercase tracking-wider border-b border-brand-accent">
                  <th className="px-6 py-4 font-semibold">IP Address</th>
                  <th className="px-6 py-4 font-semibold">Last Seen</th>
                  <th className="px-6 py-4 font-semibold">Total Views</th>
                  <th className="px-6 py-4 font-semibold">Lead Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-accent text-sm">
                {loading && visitors.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-brand-muted">Loading visitor data...</td>
                  </tr>
                ) : visitors.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-brand-muted">No visitors tracked yet.</td>
                  </tr>
                ) : (
                  visitors.slice(0, 15).map((visitor) => {
                    const views = visitor.page_views ? Object.values(visitor.page_views).reduce((a, b) => a + b, 0) : 0;
                    const isLead = visitor.email || visitor.phone;
                    
                    return (
                      <tr key={visitor.ip_address} className="hover:bg-brand-white/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-brand-navy">{visitor.ip_address}</td>
                        <td className="px-6 py-4 text-brand-muted flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(visitor.last_seen).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-semibold text-brand-navy">{views}</td>
                        <td className="px-6 py-4">
                          {isLead ? (
                            <div className="text-xs">
                              {visitor.full_name && <div className="font-bold text-brand-navy">{visitor.full_name}</div>}
                              {visitor.email && <div className="text-brand-muted">{visitor.email}</div>}
                              {visitor.phone && <div className="text-brand-muted">{visitor.phone}</div>}
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              Visitor
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsDashboard;