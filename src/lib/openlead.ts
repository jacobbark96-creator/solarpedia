import { logLeadActivity } from './tracking';

/**
 * Openlead Integration Service Layer
 * 
 * This service handles pushing qualified Solarpedia leads into the Openlead CRM.
 * For Phase 1, it acts as a structured placeholder until API credentials are provided.
 */

export interface OpenleadPayload {
  source: string;
  external_id: string;
  intent_level: string;
  lead_score: number;
  
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  
  property: {
    postcode: string;
    type: string;
    ownership: string;
  };
  
  solar_requirements: {
    estimated_kwp: number;
    monthly_spend: number;
    annual_usage: number | null;
    battery_interest: string;
    timeframe: string;
    bill_uploaded: boolean;
  };
}

export async function pushLeadToOpenlead(lead: any): Promise<boolean> {
  try {
    // 1. Map the Solarpedia lead structure to the Openlead expected payload
    const payload: OpenleadPayload = {
      source: 'Solarpedia Savings Wizard',
      external_id: lead.id,
      intent_level: lead.intent_category,
      lead_score: lead.lead_score,
      
      contact: {
        name: lead.full_name,
        email: lead.email,
        phone: lead.phone,
      },
      
      property: {
        postcode: lead.postcode,
        type: lead.property_type,
        ownership: lead.ownership,
      },
      
      solar_requirements: {
        estimated_kwp: lead.solar_data?.estimate?.size || 0,
        monthly_spend: Number(lead.monthly_spend) || 0,
        annual_usage: lead.energy_data?.annualUsageKwh || null,
        battery_interest: lead.battery_interest || 'unknown',
        timeframe: lead.timeframe || 'unknown',
        bill_uploaded: !!lead.bill_url,
      }
    };

    console.log('[Openlead Service] Preparing to push payload:', payload);

    // 2. TODO: Implement actual API call once Openlead credentials are provided
    /*
    const response = await fetch('https://api.openlead.co.uk/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.OPENLEAD_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Openlead API Error: ${response.statusText}`);
    }
    */

    // Simulate successful API call for Phase 1
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Log the successful push in the activity timeline
    await logLeadActivity(
      lead.id, 
      'Pushed to Openlead', 
      `Lead successfully routed to Openlead CRM as a ${lead.intent_category} intent opportunity.`
    );

    return true;

  } catch (error) {
    console.error('[Openlead Service] Error pushing lead:', error);
    
    // Log the failure
    await logLeadActivity(
      lead.id, 
      'Openlead Push Failed', 
      'Failed to route lead to Openlead CRM. Check system logs.'
    );
    
    return false;
  }
}