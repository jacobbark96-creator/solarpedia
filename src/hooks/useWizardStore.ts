import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WizardState } from '../types';

interface WizardStore {
  step: number;
  data: WizardState;
  setStep: (step: number) => void;
  updateData: (data: Partial<WizardState>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      step: 1,
      data: {
        propertyType: 'residential',
        ownership: 'yes',
        name: '',
        email: '',
        phone: '',
        postcode: '',
        houseNumber: '',
        energyBill: 150,
        knowsUsage: false,
        usagePattern: 'balanced',
        roofDirection: 'south',
        roofSize: 20,
        roofSizeSource: 'default',
        hasBattery: false,
        batteryInterest: 'not_sure',
        timeframe: 'researching',
        intent: '',
        leadScore: 0,
        billUploaded: false,
        consentShared: false,
      },
      setStep: (step) => set({ step }),
      updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      reset: () => set({ 
        step: 1,
        data: {
          propertyType: 'residential',
          ownership: 'yes',
          name: '',
          email: '',
          phone: '',
          postcode: '',
          houseNumber: '',
          energyBill: 150,
          knowsUsage: false,
          usagePattern: 'balanced',
          roofDirection: 'south',
          roofSize: 20,
          roofSizeSource: 'default',
          hasBattery: false,
          batteryInterest: 'not_sure',
          timeframe: 'researching',
          intent: '',
          leadScore: 0,
          billUploaded: false,
          consentShared: false,
        }
      }),
    }),
    {
      name: 'wizard-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
