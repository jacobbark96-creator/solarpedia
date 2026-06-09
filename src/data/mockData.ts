import { PostcodeData } from '../types';

export const UK_REGIONS_DATA: Record<string, PostcodeData> = {
  'SW': {
    postcode: 'SW',
    region: 'London & South West',
    avgInstallCost: 6500,
    avgSunlightHours: 1650,
    avgBillSavings: 850,
    paybackPeriodYears: 7.5,
    efficiencyScore: 92,
    roiPercentage: 12.5,
  },
  'EH': {
    postcode: 'EH',
    region: 'Scotland & Edinburgh',
    avgInstallCost: 6200,
    avgSunlightHours: 1200,
    avgBillSavings: 600,
    paybackPeriodYears: 10.2,
    efficiencyScore: 75,
    roiPercentage: 9.8,
  },
  'M': {
    postcode: 'M',
    region: 'North West & Manchester',
    avgInstallCost: 6300,
    avgSunlightHours: 1400,
    avgBillSavings: 720,
    paybackPeriodYears: 8.8,
    efficiencyScore: 82,
    roiPercentage: 11.2,
  },
  'B': {
    postcode: 'B',
    region: 'Midlands & Birmingham',
    avgInstallCost: 6400,
    avgSunlightHours: 1500,
    avgBillSavings: 780,
    paybackPeriodYears: 8.2,
    efficiencyScore: 88,
    roiPercentage: 11.8,
  },
  'CF': {
    postcode: 'CF',
    region: 'Wales & Cardiff',
    avgInstallCost: 6350,
    avgSunlightHours: 1450,
    avgBillSavings: 750,
    paybackPeriodYears: 8.5,
    efficiencyScore: 85,
    roiPercentage: 11.5,
  }
};

export const NATIONAL_AVERAGES = {
  installCost: 6400,
  annualSavings: 750,
  paybackPeriod: 8.5,
  co2Reduction: 1.2, // Tonnes per year
  energyPrice: 0.28, // £ per kWh
};
