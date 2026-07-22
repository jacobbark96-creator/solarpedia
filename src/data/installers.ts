import { Installer } from '../types';

export const INSTALLERS_DB: Installer[] = [
  {
    id: 'eco-solar-solutions',
    name: 'Eco Solar Solutions',
    mcsCertified: true,
    rating: 4.8,
    reviewCount: 156,
    coverage: ['london', 'southampton', 'bristol'],
    specialties: ['Residential', 'Battery Storage'],
    description: 'Leading provider of high-efficiency solar systems and Tesla Powerwall installations across the South of England.',
    logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 'northern-energy-partners',
    name: 'Northern Energy Partners',
    mcsCertified: true,
    rating: 4.9,
    reviewCount: 89,
    coverage: ['manchester', 'liverpool', 'leeds', 'sheffield'],
    specialties: ['Commercial', 'Heat Pumps'],
    description: 'Specializing in commercial-scale solar PV and large residential battery setups in the North West and Yorkshire.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 'midlands-solar-direct',
    name: 'Midlands Solar Direct',
    mcsCertified: true,
    rating: 4.7,
    reviewCount: 210,
    coverage: ['birmingham', 'leicester', 'nottingham'],
    specialties: ['Residential', 'Roof Repairs'],
    description: 'Vetted local installer with over 15 years experience in MCS-certified rooftop solar installations.',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f2f72310?auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 'scottish-solar-hub',
    name: 'Scottish Solar Hub',
    mcsCertified: true,
    rating: 4.9,
    reviewCount: 64,
    coverage: ['glasgow', 'edinburgh'],
    specialties: ['Off-grid', 'Residential'],
    description: 'The premier choice for solar in Scotland, focusing on high-durability panels suited for northern climates.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=128&q=80',
  }
];
