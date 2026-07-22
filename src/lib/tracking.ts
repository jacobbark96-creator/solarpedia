import { supabase } from './supabase';

export async function trackPageView() {
  if (typeof window === 'undefined') return;

  try {
    // 1. Get the current path
    const path = window.location.pathname;
    
    // 2. Get the IP address (using a public API since we are client-side)
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    if (!ip) return;

    // 3. Fetch existing data for this IP
    const { data: existing, error: fetchError } = await supabase
      .from('visitor_tracking')
      .select('page_views')
      .eq('ip_address', ip)
      .single();

    let pageViews = existing?.page_views || {};
    pageViews[path] = (pageViews[path] || 0) + 1;

    // 4. Upsert the data
    const { error: upsertError } = await supabase
      .from('visitor_tracking')
      .upsert({
        ip_address: ip,
        page_views: pageViews,
        last_seen: new Date().toISOString()
      }, {
        onConflict: 'ip_address'
      });

    if (upsertError) {
      console.error('Tracking Error (upsert):', upsertError);
    }
  } catch (err) {
    console.error('Tracking Error (catch):', err);
  }
}

export async function trackFormSubmission(formData: {
  full_name?: string;
  email?: string;
  phone?: string;
}) {
  if (typeof window === 'undefined') return;

  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    if (!ip) return;

    const { error } = await supabase
      .from('visitor_tracking')
      .update({
        ...formData,
        last_seen: new Date().toISOString()
      })
      .eq('ip_address', ip);

    if (error) {
      console.error('Form Tracking Error:', error);
    }
  } catch (err) {
    console.error('Form Tracking Error (catch):', err);
  }
}

export async function getVisitorData() {
  if (typeof window === 'undefined') return null;

  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    if (!ip) return null;

    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('*')
      .eq('ip_address', ip)
      .single();

    if (error) {
      console.error('Get Visitor Data Error:', error);
      return { ip_address: ip };
    }

    return data;
  } catch (err) {
    console.error('Get Visitor Data Error (catch):', err);
    return null;
  }
}
