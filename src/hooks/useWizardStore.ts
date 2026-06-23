import { create } from 'zustand';
import { WizardState } from '../types';

interface WizardStore {
  step: number;
  data: WizardState;
  setStep: (step: number) => void;
  updateData: (data: Partial<WizardState>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  step: 1,
  data: {
    propertyType: 'residential',
    postcode: '',
    houseNumber: '',
    energyBill: 150,
    usagePattern: 'balanced',
    roofDirection: 'south',
    roofSize: 20,
    roofSizeSource: 'default',
    hasBattery: false,
    consentShared: false,
  },
  setStep: (step) => set({ step }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 1 }),
}));
