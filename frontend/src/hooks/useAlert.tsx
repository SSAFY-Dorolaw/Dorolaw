import { useState } from 'react';
import { AlertType } from '@/components/ui/CustomAlert';

interface UseAlertReturn {
  alertProps: {
    isOpen: boolean;
    message: string;
    type: AlertType;
  };
  showAlert: (message: string, type?: AlertType) => void;
  closeAlert: () => void;
}

export default function useAlert(): UseAlertReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('info');

  const showAlert = (newMessage: string, alertType: AlertType = 'info') => {
    setMessage(newMessage);
    setType(alertType);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    alertProps: {
      isOpen,
      message,
      type,
    },
    showAlert,
    closeAlert,
  };
}
