//src/features/reservation/AdditionalQuestion.tsx

import { useAuthStore } from '@/entities/auth/model/store';
import apiClient from '@/shared/api/api-client';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AdditionalQuestionState {
  lawyerId: string;
  requestId: string;
  scheduledDate: Date;
  scheduledTime: string | null;
  consultationType: string;
  price: number;
}

const AdditionalQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientId } = useAuthStore.getState(); // Get current logged-in user info
  const {
    lawyerId,
    requestId,
    scheduledDate,
    scheduledTime,
    consultationType,
    price,
  } = location.state as AdditionalQuestionState;

  const getConsultationType = () => {
    switch (consultationType) {
      case '15분 전화상담':
        return 'PHONE';
      case '20분 화상상담':
        return 'WEBMEET';
      case '30분 방문상담':
        return 'VISIT';
      default:
        return 0;
    }
  };

  const [additionalQuestion, setAdditionalQuestion] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Format date for display
  const formattedDate = scheduledDate.toISOString().split('T')[0];

  console.log(
    lawyerId,
    formattedDate,
    scheduledTime,
    getConsultationType(),
    price,
    additionalQuestion,
    requestId,
  );

  const handlePayment = () => {
    // 결제에 필요한 데이터
    const paymentData = {
      cid: 'TC0ONETIME', // Kakao Pay merchant ID
      partner_order_id: `order_${Date.now()}`, // Generate unique order ID
      partner_user_id: localStorage.getItem('token') ?? '',
      item_name: `${consultationType} - ${formattedDate}`,
      quantity: 1,
      total_amount: price,
      vat_amount: Math.round(price * 0.1), // 10% VAT
      tax_free_amount: 0,
      approval_url: `${window.location.origin}/payment/success`,
      fail_url: `${window.location.origin}/payment/fail`,
      cancel_url: `${window.location.origin}/payment/cancel`,
    };

    // 세션스토리지에 api 호출을 위한 데이터 저장
    sessionStorage.setItem(
      'pendingBooking',
      JSON.stringify({
        lawyerId,
        clientId,
        requestId,
        scheduledDate: scheduledDate.toISOString(),
        scheduledTime: scheduledTime,
        consultation_type: consultationType,
        price,
        additionalQuestion,
      }),
    );

    // 결제 페이지 이동
    void navigate('/initiate-kakao-payment', { state: paymentData });
  };

  const handleSubmit = async () => {
    // handlePayment();
    postConsultation();
  };

  const postConsultation = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/counseling/book`;

      const params = {
        lawyerId,
        scheduledDate: formattedDate,
        scheduledTime,
        consultationType: getConsultationType(),
        price,
        additionalQuestion,
        requestId,
      };
      const response = await apiClient.post(url, params);
      void navigate(`/client/consultations`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">추가 정보 입력</h1>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">예약 상세</h2>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-p4">상담 유형</p>
            <p className="font-medium">{consultationType}</p>
          </div>
          <div>
            <p className="text-p4">상담 일시</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-p4">결제 금액</p>
            <p className="font-medium">{price.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">추가 질문</h2>
        <textarea
          value={additionalQuestion}
          onChange={(e) => setAdditionalQuestion(e.target.value)}
          placeholder="변호사에게 상담 전 알리고 싶은 내용이 있다면 작성해주세요."
          className="h-32 w-full rounded-lg border border-p2 p-3"
        />
      </div>

      <div className="mb-6 flex justify-between rounded-lg bg-white p-6 shadow">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
            className="mr-2"
          />
          <label htmlFor="terms">
            이용약관 및 개인정보 처리방침에 동의합니다
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!agreedToTerms}
        className={`w-full rounded-lg py-3 transition-all duration-200 hover:text-y5 hover:shadow-lg hover:brightness-110 active:brightness-95 ${agreedToTerms ? 'bg-p5 text-p1' : 'bg-gray-300 font-bold'}`}
      >
        {price.toLocaleString()}원 결제하기
      </button>
    </div>
  );
};

export default AdditionalQuestion;
