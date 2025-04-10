import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: AlertType;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isOpen,
  onClose,
  message,
  type = 'info',
  autoClose = true,
  autoCloseTime = 3000,
}) => {
  // 알림 타입별 스타일 정의
  const alertStyles = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      icon: <CheckCircle className="mr-2 size-5 text-green-500" />,
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      icon: <AlertCircle className="mr-2 size-5 text-red-500" />,
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      icon: <AlertCircle className="mr-2 size-5 text-yellow-500" />,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      icon: <Info className="mr-2 size-5 text-blue-500" />,
    },
  };

  const currentStyle = alertStyles[type];

  // 자동 닫기 기능
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  // 알림이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`mx-auto w-full max-w-md rounded-lg border-l-4 p-4 shadow-lg ${currentStyle.bgColor} ${currentStyle.borderColor}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {currentStyle.icon}
            <span className={`font-medium ${currentStyle.textColor}`}>
              {message}
            </span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
