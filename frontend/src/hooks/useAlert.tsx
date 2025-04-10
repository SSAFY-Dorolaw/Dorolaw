import { useState } from 'react';
import { AlertType } from '@/components/ui/CustomAlert';

interface UseAlertReturn {
  alertProps: {
    isOpen: boolean;
    message: string;
    type: AlertType;
    isLarge?: boolean; // 큰 글씨체 옵션 추가
  };
  showAlert: (message: string, type?: AlertType, isLarge?: boolean) => void;
  closeAlert: () => void;
}

export default function useAlert(): UseAlertReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('info');
  const [isLarge, setIsLarge] = useState(false);

  const showAlert = (
    newMessage: string,
    alertType: AlertType = 'info',
    large = false,
  ) => {
    setMessage(newMessage);
    setType(alertType);
    setIsLarge(large);
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
      isLarge,
    },
    showAlert,
    closeAlert,
  };
}
