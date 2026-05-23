export type AnimalType = 'sheep' | 'goat' | 'cow' | 'camel';
export type DeliveryStatus = 'pending' | 'delivered';
export type ListType = 'poor' | 'relative';

export interface Recipient {
  id: string;
  name: string;
  weight: number;
  status: DeliveryStatus;
  listType: ListType;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
}

export interface QurbaniState {
  animalType: AnimalType;
  partners: number;
  totalWeight: number;
  recipients: Recipient[];
  expenses: Expense[];
  darkMode: boolean;
}

export const ANIMAL_SPECS: Record<AnimalType, { name: string; minAge: string; maxPartners: number; icon: string }> = {
  sheep: { name: 'مەڕ', minAge: 'تەمەنی لە 6 مانگ کەمتر نەبێت.', maxPartners: 1, icon: '🐑' },
  goat: { name: 'بزن', minAge: 'تەمەنی لە 1 ساڵ کەمتر نەبێت.', maxPartners: 1, icon: '🐐' },
  cow: { name: 'مانگا / گۆڵک', minAge: 'تەمەنی لە 2 ساڵ کەمتر نەبێت.', maxPartners: 7, icon: '🐄' },
  camel: { name: 'وشتر', minAge: 'تەمەنی لە 5 ساڵ کەمتر نەبێت.', maxPartners: 7, icon: '🐪' },
};

export const STATUS_MAP: Record<DeliveryStatus, { label: string; colorClass: string; iconClass: string }> = {
  pending: { label: 'چاوەڕوانە', colorClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800', iconClass: 'text-amber-500' },
  delivered: { label: 'گەیەندرا', colorClass: 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800', iconClass: 'text-primary-500' },
};

export const DEFAULT_STATE: QurbaniState = {
  animalType: 'sheep',
  partners: 1,
  totalWeight: 0,
  recipients: [],
  expenses: [],
  darkMode: true,
};
