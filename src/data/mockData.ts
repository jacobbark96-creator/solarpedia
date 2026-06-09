import { PostcodeData } from '../types';

export const UK_REGIONS_DATA: Record<string, PostcodeData> = {
  'SCO': {
    postcode: 'SCO',
    region: 'Scotland',
    avgInstallCost: 6200,
    avgSunlightHours: 1200,
    avgBillSavings: 600,
    paybackPeriodYears: 10.2,
    efficiencyScore: 75,
    roiPercentage: 9.8,
  },
  'NW': {
    postcode: 'NW',
    region: 'North West',
    avgInstallCost: 6300,
    avgSunlightHours: 1400,
    avgBillSavings: 720,
    paybackPeriodYears: 8.8,
    efficiencyScore: 82,
    roiPercentage: 11.2,
  },
  'NE': {
    postcode: 'NE',
    region: 'North East',
    avgInstallCost: 6150,
    avgSunlightHours: 1350,
    avgBillSavings: 680,
    paybackPeriodYears: 9.1,
    efficiencyScore: 79,
    roiPercentage: 10.5,
  },
  'YOR': {
    postcode: 'YOR',
    region: 'Yorkshire',
    avgInstallCost: 6250,
    avgSunlightHours: 1420,
    avgBillSavings: 710,
    paybackPeriodYears: 8.9,
    efficiencyScore: 81,
    roiPercentage: 11.0,
  },
  'WAL': {
    postcode: 'WAL',
    region: 'Wales',
    avgInstallCost: 6350,
    avgSunlightHours: 1450,
    avgBillSavings: 750,
    paybackPeriodYears: 8.5,
    efficiencyScore: 85,
    roiPercentage: 11.5,
  },
  'WM': {
    postcode: 'WM',
    region: 'West Midlands',
    avgInstallCost: 6400,
    avgSunlightHours: 1500,
    avgBillSavings: 780,
    paybackPeriodYears: 8.2,
    efficiencyScore: 88,
    roiPercentage: 11.8,
  },
  'EM': {
    postcode: 'EM',
    region: 'East Midlands',
    avgInstallCost: 6380,
    avgSunlightHours: 1480,
    avgBillSavings: 770,
    paybackPeriodYears: 8.3,
    efficiencyScore: 87,
    roiPercentage: 11.7,
  },
  'EE': {
    postcode: 'EE',
    region: 'East of England',
    avgInstallCost: 6550,
    avgSunlightHours: 1600,
    avgBillSavings: 820,
    paybackPeriodYears: 7.8,
    efficiencyScore: 90,
    roiPercentage: 12.2,
  },
  'SW': {
    postcode: 'SW',
    region: 'South West',
    avgInstallCost: 6600,
    avgSunlightHours: 1700,
    avgBillSavings: 880,
    paybackPeriodYears: 7.2,
    efficiencyScore: 95,
    roiPercentage: 13.0,
  },
  'SE': {
    postcode: 'SE',
    region: 'South East',
    avgInstallCost: 6700,
    avgSunlightHours: 1680,
    avgBillSavings: 860,
    paybackPeriodYears: 7.4,
    efficiencyScore: 94,
    roiPercentage: 12.8,
  },
  'LON': {
    postcode: 'LON',
    region: 'London',
    avgInstallCost: 6900,
    avgSunlightHours: 1620,
    avgBillSavings: 840,
    paybackPeriodYears: 7.9,
    efficiencyScore: 91,
    roiPercentage: 12.0,
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
    link: '/education#grants'
  },
  {
    id: 2,
    date: 'June 2, 2026',
    title: '0% VAT on Solar Confirmed to 2027',
    summary: 'Homeowners will continue to benefit from zero-rated VAT on solar and battery storage until March 2027.',
    category: 'Policy',
    link: '/education#policy'
  },
  {
    id: 3,
    date: 'May 27, 2026',
    title: 'Plug-in "Balcony Solar" Legalised',
    summary: 'New regulations allow renters and flat owners to install smaller plug-in solar systems for the first time.',
    category: 'Innovation',
    link: '/education#innovation'
  },
  {
    id: 4,
    date: 'May 25, 2026',
    title: 'Energy Price Cap to Rise in July',
    summary: 'Ofgem announces a 13% increase in the price cap for Q3 2026 due to wholesale market volatility.',
    category: 'Market',
    link: '/education#market'
  }
];
