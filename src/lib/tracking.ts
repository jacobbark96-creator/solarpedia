import { supabase } from './supabase';

export async function trackPageView() {
  if (typeof window === 'undefined') return;

  try {
    // 1. Get the current path
    const path = window.location.pathname;
    
    // Parse URL params for UTMs
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get('utm_source') || undefined;
    const utm_medium = params.get('utm_medium') || undefined;
    const utm_campaign = params.get('utm_campaign') || undefined;
    const gclid = params.get('gclid') || undefined;

    // 2. Get the IP address
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    if (!ip) return;

    // 3. Fetch existing data for this IP
    const { data: existing, error: fetchError } = await supabase
      .from('visitor_tracking')
      .select('page_views, first_seen, last_seen')
      .eq('ip_address', ip)
      .single();

    let pageViews = existing?.page_views || {};
    pageViews[path] = (pageViews[path] || 0) + 1;

    const firstSeen = existing?.first_seen ? new Date(existing.first_seen) : new Date();
    const lastSeen = new Date();
    // Calculate session duration in seconds
    const session_duration = Math.floor((lastSeen.getTime() - firstSeen.getTime()) / 1000);

    // 4. Upsert the data
    const updateData: any = {
      ip_address: ip,
      page_views: pageViews,
      last_seen: lastSeen.toISOString(),
      session_duration: session_duration
    };

    if (utm_source) updateData.utm_source = utm_source;
    if (utm_medium) updateData.utm_medium = utm_medium;
    if (utm_campaign) updateData.utm_campaign = utm_campaign;
    if (gclid) updateData.gclid = gclid;

    const { error: upsertError } = await supabase
      .from('visitor_tracking')
      .upsert(updateData, {
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

export async function trackWizardStep(step: number) {
  if (typeof window === 'undefined') return;
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    if (!ip) return;
    
    // We only update if the new step is higher than the existing step
    const { data: existing } = await supabase
      .from('visitor_tracking')
      .select('wizard_dropoff_step')
      .eq('ip_address', ip)
      .single();
      
    if (!existing || step > (existing.wizard_dropoff_step || 0)) {
      await supabase
        .from('visitor_tracking')
        .update({ wizard_dropoff_step: step })
        .eq('ip_address', ip);
    }
  } catch (err) {
    console.error('Wizard Tracking Error:', err);
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
