import { Operations, WorkStatus } from '../types/parserTask';
import { PaymentAction } from '../types/payment';

export const getTaskStatusName = (status: WorkStatus) => {
  switch (status) {
    case 'success':
      return 'завершена';
    case 'failed':
      return 'ошибка';
    case 'in_processing':
      return 'в процессе';
    case 'in_waiting':
      return 'в ожидании';
    default:
      return status;
  }
};

export const getTaskOperationName = (operation: Operations) => {
  switch (operation) {
    case 'parsing':
      return 'Парсинг';
    default:
      return operation;
  }
};

export const getPaymentOperationName = (operation: PaymentAction) => {
  switch (operation) {
    case 'credit':
      return 'списание';
    case 'debit':
      return 'зачисление';
  }
};
