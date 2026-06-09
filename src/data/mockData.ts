import { PostcodeData } from '../types';

export const UK_REGIONS_DATA: Record<string, PostcodeData> = {
  'SCO': {
    postcode: 'SCO',
    region: 'Scotland',
    avgInstallCost: 6800,
    avgSunlightHours: 1150,
    avgBillSavings: 580,
    paybackPeriodYears: 11.5,
    efficiencyScore: 72,
    roiPercentage: 8.5,
  },
  'NW': {
    postcode: 'NW',
    region: 'North West',
    avgInstallCost: 7200,
    avgSunlightHours: 1380,
    avgBillSavings: 740,
    paybackPeriodYears: 9.5,
    efficiencyScore: 81,
    roiPercentage: 10.2,
  },
  'NE': {
    postcode: 'NE',
    region: 'North East',
    avgInstallCost: 7100,
    avgSunlightHours: 1320,
    avgBillSavings: 710,
    paybackPeriodYears: 9.8,
    efficiencyScore: 78,
    roiPercentage: 9.8,
  },
  'YOR': {
    postcode: 'YOR',
    region: 'Yorkshire',
    avgInstallCost: 7150,
    avgSunlightHours: 1410,
    avgBillSavings: 750,
    paybackPeriodYears: 9.4,
    efficiencyScore: 82,
    roiPercentage: 10.5,
  },
  'WAL': {
    postcode: 'WAL',
    region: 'Wales',
    avgInstallCost: 7300,
    avgSunlightHours: 1480,
    avgBillSavings: 790,
    paybackPeriodYears: 9.1,
    efficiencyScore: 85,
    roiPercentage: 11.0,
  },
  'WM': {
    postcode: 'WM',
    region: 'West Midlands',
    avgInstallCost: 7400,
    avgSunlightHours: 1450,
    avgBillSavings: 780,
    paybackPeriodYears: 9.3,
    efficiencyScore: 84,
    roiPercentage: 10.8,
  },
  'EM': {
    postcode: 'EM',
    region: 'East Midlands',
    avgInstallCost: 7350,
    avgSunlightHours: 1460,
    avgBillSavings: 785,
    paybackPeriodYears: 9.2,
    efficiencyScore: 84,
    roiPercentage: 10.9,
  },
  'EE': {
    postcode: 'EE',
    region: 'East of England',
    avgInstallCost: 7600,
    avgSunlightHours: 1580,
    avgBillSavings: 860,
    paybackPeriodYears: 8.6,
    efficiencyScore: 91,
    roiPercentage: 11.8,
  },
  'SW': {
    postcode: 'SW',
    region: 'South West',
    avgInstallCost: 7800,
    avgSunlightHours: 1720,
    avgBillSavings: 940,
    paybackPeriodYears: 8.1,
    efficiencyScore: 96,
    roiPercentage: 12.5,
  },
  'SE': {
    postcode: 'SE',
    region: 'South East',
    avgInstallCost: 8100,
    avgSunlightHours: 1680,
    avgBillSavings: 920,
    paybackPeriodYears: 8.4,
    efficiencyScore: 94,
    roiPercentage: 12.2,
  },
  'LON': {
    postcode: 'LON',
    region: 'London',
    avgInstallCost: 8400,
    avgSunlightHours: 1640,
    avgBillSavings: 910,
    paybackPeriodYears: 8.8,
    efficiencyScore: 92,
    roiPercentage: 11.5,
  },
  'NI': {
    postcode: 'NI',
    region: 'Northern Ireland',
    avgInstallCost: 6900,
    avgSunlightHours: 1220,
    avgBillSavings: 640,
    paybackPeriodYears: 10.5,
    efficiencyScore: 76,
    roiPercentage: 9.2,
  }
};

export const DATA_SOURCES = {
  pricing: 'MCS Dashboard & Installer Surveys (Q1 2026)',
  irradiance: 'Met Office MIDAS Open Geospatial Data',
  savings: 'Energy Saving Trust & Ofgem Price Cap Q2 2026',
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
