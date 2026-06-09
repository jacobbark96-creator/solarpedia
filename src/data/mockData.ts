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
  },
  'NI': {
    postcode: 'NI',
    region: 'Northern Ireland',
    avgInstallCost: 6100,
    avgSunlightHours: 1250,
    avgBillSavings: 620,
    paybackPeriodYears: 9.8,
    efficiencyScore: 78,
    roiPercentage: 10.2,
  }
};

export const NATIONAL_AVERAGES = {
  installCost: 6400,
  annualSavings: 780,
  paybackPeriod: 8.2,
  co2Reduction: 1.3, // Tonnes per year
  energyPrice: 0.2467, // £ per kWh (April - June 2026 Price Cap)
  nextEnergyPrice: 0.2611, // £ per kWh (July - Sept 2026 Estimate)
};

export const GRANTS_NEWS = [
  {
    id: 1,
    date: 'June 5, 2026',
    title: '£12,000 Solar & Heat Pump Boost',
    summary: 'Government fast-tracks grants for households earning under £36,000 via the Warm Homes Plan.',
    category: 'Grants',
    link: '#'
  },
  {
    id: 2,
    date: 'June 2, 2026',
    title: '0% VAT on Solar Confirmed to 2027',
    summary: 'Homeowners will continue to benefit from zero-rated VAT on solar and battery storage until March 2027.',
    category: 'Policy',
    link: '#'
  },
  {
    id: 3,
    date: 'May 27, 2026',
    title: 'Plug-in "Balcony Solar" Legalised',
    summary: 'New regulations allow renters and flat owners to install smaller plug-in solar systems for the first time.',
    category: 'Innovation',
    link: '#'
  },
  {
    id: 4,
    date: 'May 25, 2026',
    title: 'Energy Price Cap to Rise in July',
    summary: 'Ofgem announces a 13% increase in the price cap for Q3 2026 due to wholesale market volatility.',
    category: 'Market',
    link: '#'
  }
];
