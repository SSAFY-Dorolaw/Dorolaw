import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isLarge?: boolean; // 큰 텍스트 옵션 추가
  autoClose?: boolean;
  autoCloseTime?: number;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isOpen,
  onClose,
  message,
  type = 'info',
  isLarge = false,
  autoClose = true,
  autoCloseTime = 3000,
}) => {
  // AOS 초기화
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
    });
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      ></div>
      <div
        className={`${currentStyle.bgColor} ${currentStyle.borderColor} z-10 mx-4 max-w-md rounded-lg border-l-4 p-6 shadow-2xl`}
        data-aos="zoom-in"
        data-aos-duration="500"
      >
        <div className="flex items-center justify-between">
          <p
            className={`${isLarge ? 'text-lg font-bold' : 'text-base'} whitespace-pre-line ${currentStyle.textColor}`}
          >
            {message}
          </p>
          <button
            onClick={onClose}
            className={`${currentStyle.textColor} ml-4 transition-opacity hover:opacity-70`}
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
