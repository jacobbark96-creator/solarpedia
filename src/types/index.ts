export interface PostcodeData {
  postcode: string;
  region: string;
  avgInstallCost: number;
  avgSunlightHours: number;
  avgBillSavings: number;
  paybackPeriodYears: number;
  efficiencyScore: number;
  roiPercentage: number;
}

export interface WizardState {
  propertyType: 'residential' | 'commercial' | 'farm' | 'other';
  ownership: 'yes' | 'no' | 'not_sure';
  name: string;
  email: string;
  phone: string;
  postcode: string;
  houseNumber: string;
  energyBill: number;
  knowsUsage: boolean;
  annualUsageKwh?: number;
  usagePattern: 'day' | 'evening' | 'balanced';
  roofDirection: 'south' | 'east' | 'west' | 'north' | 'not_sure';
  roofSize: number;
  roofSizeSource: 'default' | 'manual' | 'estimated';
  roofSizeConfidence?: 'low' | 'medium' | 'high';
  matchedAddress?: string;
  propertyLat?: number;
  propertyLon?: number;
  footprintArea?: number;
  roofEstimateMethod?: string;
  hasBattery: boolean; // Keeping for backward compatibility or simple toggles
  batteryInterest: 'yes' | 'no' | 'not_sure';
  timeframe: 'researching' | '12_months' | '6_months' | '3_months' | 'ready';
  intent: 'installer' | 'advice' | 'researching' | '';
  leadScore: number;
  billUploaded: boolean;
  consentShared: boolean;
}

export interface SavingsResult {
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  tenYearSavings: number;
  co2Reduction: number;
  systemSize: number;
  suitabilityScore: number;
}

export interface Installer {
  id: string;
  name: string;
  mcsCertified: boolean;
  rating: number;
  reviewCount: number;
  coverage: string[]; // List of city slugs or regions
  specialties: string[];
  description: string;
  logo?: string;
  website?: string;
}
