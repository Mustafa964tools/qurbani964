import { useState, useEffect } from 'react';
import { QurbaniState, DEFAULT_STATE } from './types';

const STORAGE_KEY = 'qurbani_digital_system_state';

export function useQurbaniStore() {
  const [state, setState] = useState<QurbaniState>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item) as QurbaniState;
      }
    } catch (error) {
      console.warn('Error reading localStorage', error);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Error saving to localStorage', error);
    }
  }, [state]);

  // Handle Dark Mode Side Effect
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const updateState = (updates: Partial<QurbaniState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };

      // Business logic: if animal maxPartners is 1, reset partners to 1
      if (updates.animalType && prev.animalType !== updates.animalType) {
        if (updates.animalType === 'sheep' || updates.animalType === 'goat') {
          next.partners = 1;
        }
      }

      return next;
    });
  };

  const toggleDarkMode = () => updateState({ darkMode: !state.darkMode });

  return { state, updateState, toggleDarkMode };
}
