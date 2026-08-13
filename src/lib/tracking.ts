import { supabase } from './supabase';

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let vid = localStorage.getItem('solarpedia_vid');
  if (!vid) {
    vid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('solarpedia_vid', vid);
  }
  return vid;
}

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

    // 2. Get the Visitor ID and IP address
    const visitor_id = getVisitorId();
    if (!visitor_id) return;

    let ip = null;
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch (e) {
      console.warn('Could not fetch IP', e);
    }

    // 3. Fetch existing data for this Visitor ID
    const { data: existing, error: fetchError } = await supabase
      .from('visitor_tracking')
      .select('page_views, first_seen, last_seen')
      .eq('visitor_id', visitor_id)
      .single();

    let pageViews = existing?.page_views || {};
    pageViews[path] = (pageViews[path] || 0) + 1;

    const firstSeen = existing?.first_seen ? new Date(existing.first_seen) : new Date();
    const lastSeen = new Date();
    // Calculate session duration in seconds
    const session_duration = Math.floor((lastSeen.getTime() - firstSeen.getTime()) / 1000);

    // 4. Upsert the data
    const updateData: any = {
      visitor_id,
      page_views: pageViews,
      last_seen: lastSeen.toISOString(),
      session_duration: session_duration
    };

    if (ip) updateData.ip_address = ip;

    if (utm_source) updateData.utm_source = utm_source;
    if (utm_medium) updateData.utm_medium = utm_medium;
    if (utm_campaign) updateData.utm_campaign = utm_campaign;
    if (gclid) updateData.gclid = gclid;

    const { error: upsertError } = await supabase
      .from('visitor_tracking')
      .upsert(updateData, {
        onConflict: 'visitor_id'
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
    const visitor_id = getVisitorId();
    if (!visitor_id) return;

    const { error } = await supabase
      .from('visitor_tracking')
      .update({
        ...formData,
        last_seen: new Date().toISOString()
      })
      .eq('visitor_id', visitor_id);

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
    const visitor_id = getVisitorId();
    if (!visitor_id) return;
    
    // We only update if the new step is higher than the existing step
    const { data: existing } = await supabase
      .from('visitor_tracking')
      .select('wizard_dropoff_step')
      .eq('visitor_id', visitor_id)
      .single();
      
    if (!existing || step > (existing.wizard_dropoff_step || 0)) {
      await supabase
        .from('visitor_tracking')
        .update({ wizard_dropoff_step: step })
        .eq('visitor_id', visitor_id);
    }
  } catch (err) {
    console.error('Wizard Tracking Error:', err);
  }
}

export async function getVisitorData() {
  if (typeof window === 'undefined') return null;

  try {
    const visitor_id = getVisitorId();
    if (!visitor_id) return null;

    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('*')
      .eq('visitor_id', visitor_id)
      .single();

    if (error) {
      console.error('Get Visitor Data Error:', error);
      return { visitor_id };
    }

    return data;
  } catch (err) {
    console.error('Get Visitor Data Error (catch):', err);
    return null;
  }
}
