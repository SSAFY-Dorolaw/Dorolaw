import UploadArea from '@/features/videoupload/UploadArea';
import UploadTitle, {
  UploadTitleRef,
} from '@/features/videoupload/UploadTitle';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import AdditionalInfo from '@/features/videoupload/AdditionalInfo';
import BulletList from '@/components/ui/BulletList';
import CustomAlert from '@/components/ui/CustomAlert';
import useAlert from '@/hooks/useAlert';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '@/features/videoupload/api';
import { submitBoardInfo } from '@/features/board/model/queries';

interface AdditionalData {
  faultRatio?: string;
  description?: string;
  question?: string;
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
  }
  return null;
};

const ConsultUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const navigate = useNavigate();

  // 커스텀 알림 훅 사용
  const { alertProps, showAlert, closeAlert } = useAlert();

  // 추가 정보 객체로 분리
  const [additionalData, setAdditionalData] = useState<AdditionalData>({
    faultRatio: '',
    description: '',
    question: '',
  });

  // UploadTitle 참조를 위한 ref
  const uploadTitleRef = useRef<UploadTitleRef | null>(null);

  // 팝업 처리
  useEffect(() => {
    // 쿠키에서 팝업 표시 여부 확인
    const popupDismissed = getCookie('consultPopupDismissed');
    if (!popupDismissed) {
      setShowPopup(true);
    }
  }, []);

  const handleDismissPopup = () => {
    if (dontShowAgain) {
      setCookie('consultPopupDismissed', 'true', 30); // 30일 동안 유지
    }
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // BulletList 항목
  const bulletAnalysisItems = [
    'AI 분석 결과 또는 영상 자료 기반 상담 가능',
    '분야: 과실 다툼, 보험 처리, 손해배상, 민혀앗 소송 등',
    '상담 신청 시 일정 선택 및 상담 방식(전화/화상/대면 등) 지정 가능',
  ];

  // 추가 정보 변경 핸들러
  const additionalDataChange = (data: AdditionalData) => {
    setAdditionalData(data);
  };

  // 분석 요청 처리
  const requestAnalysis = async () => {
    // 로딩 상태 설정
    setLoading(true);
    setError(null);
    setSuccess(false);

    // UploadTitle에서 선택한 파일 불러오기
    const selectedFile = uploadTitleRef.current?.getSelectedFile();
    const title = uploadTitleRef.current?.getTitle();

    if (!title) {
      showAlert('제목을 입력해주세요', 'warning');
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      showAlert('업로드할 파일을 선택해주세요', 'warning');
      setLoading(false);
      return;
    }

    if (!isAgree) {
      showAlert('개인정보 제공 동의가 필요합니다.', 'warning');
      setLoading(false);
      return;
    }

    try {
      // 1) 파일 업로드 API 호출
      const uploadResponse = await uploadVideo(
        {
          file: selectedFile,
        },
        '/videos/upload',
      );

      // 파일 업로드 실패 시 중단
      if (!('fileName' in uploadResponse)) {
        const errorMessage =
          'errorCode' in uploadResponse
            ? uploadResponse.message
            : '파일 업로드 실패';
        setError(errorMessage);
        showAlert(errorMessage, 'error');
        setLoading(false);
        return;
      }

      // 디버깅: 전송할 데이터 확인
      console.log('전송할 추가 정보:', {
        title,
        fileName: uploadResponse.fileName,
        insuranceFaultRatio: additionalData.faultRatio,
        description: additionalData.description,
        question: additionalData.question,
        isPublic,
      });

      // 2) 파일 업로드 성공 후 추가 정보 전송
      const infoResponse = await submitBoardInfo(
        {
          title: title,
          fileName: uploadResponse.fileName,
          insuranceFaultRatio: additionalData.faultRatio,
          description: additionalData.description,
          question: additionalData.question,
          isPublic: isPublic,
        },
        '/requests',
      );

      // 응답 처리
      if ('requestId' in infoResponse) {
        // 성공하면
        setSuccess(true);
        showAlert('의뢰글이 성공적으로 업로드되었습니다.', 'success');
        setTimeout(() => {
          void navigate(`/board`);
        }, 1500);
        console.log('의뢰글 업로드 성공: ', infoResponse.requestId);
      } else if ('message' in infoResponse) {
        // 실패하면
        setError(infoResponse.message);
        showAlert(infoResponse.message, 'error');
      }
    } catch (error) {
      const errorMsg = '의뢰글 업로드 중 오류 발생';
      setError(errorMsg);
      showAlert(errorMsg, 'error');
      console.error('요청 오류: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 커스텀 알림 컴포넌트 */}
      <CustomAlert
        isOpen={alertProps.isOpen}
        onClose={closeAlert}
        message={alertProps.message}
        type={alertProps.type}
      />

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[600px] rounded-lg bg-white px-10 pb-10 pt-6 shadow-lg">
            <article>
              <h3 className="mb-8 text-h1 font-bold text-gray-800">
                교통사고 과실비율 자동 분석 서비스
              </h3>
            </article>
            <article>
              <p className="text-bodysmall text-gray-600">
                본 서비스는 교통사고 발생 시 제출된 블랙박스 영상 또는 CCTV
                영상을 기반으로, AI 기술을 활용하여 사고 상황을 분석하고 예상
                과실비율을 산정해 드리는 기능입니다.
              </p>
              <br />
            </article>
            <article>
              <BulletList items={bulletAnalysisItems} />
              <br />
            </article>
            <p className="text-bodysmall text-gray-600">
              ※ 본 서비스는 법률 상담 예약을 지원하며, 실제 상담은 변호사 개별
              사무소 또는 온라인을 통해 이루어집니다.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="mr-2"
                />
                다시 보지 않음
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleDismissPopup}
                  className="rounded bg-p5 px-4 py-2 text-white"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 설명 */}
      <header className="mt-6 w-[800px] bg-p1 py-8">
        <h1 className="text-start text-3xl font-bold text-gray-800">
          변호사 상담하기
        </h1>
      </header>

      <main className="mx-auto max-w-4xl space-y-6">
        {/* 카드 형태로 구성 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <UploadTitle ref={uploadTitleRef} />
          <UploadArea />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <AdditionalInfo onChange={additionalDataChange} />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">옵션</h2>
          <OptionCheckbox
            isPublic={isPublic}
            onChangePublic={(value: boolean) => setIsPublic(value)}
            isAgree={isAgree}
            onChangeAgree={(value: boolean) => setIsAgree(value)}
          />
        </div>

        {/* 성공 메시지 표시 */}
        {success && (
          <div className="rounded-lg bg-green-100 p-4 text-center text-green-700">
            게시글이 업로드되었습니다.
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              void requestAnalysis();
            }}
            disabled={loading}
            className="my-10 mb-20 rounded-[10px] bg-p5 px-6 py-3 text-p1 transition hover:text-y5 disabled:opacity-50"
          >
            {loading ? '처리 중...' : '의뢰 신청하기'}
          </button>
        </div>
      </main>
    </>
  );
};

export default ConsultUpload;
