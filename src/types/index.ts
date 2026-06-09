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
  propertyType: 'residential' | 'commercial';
  postcode: string;
  energyBill: number;
  usagePattern: 'day' | 'evening' | 'balanced';
  roofDirection: 'south' | 'east' | 'west' | 'north';
  roofSize: number;
  hasBattery: boolean;
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
