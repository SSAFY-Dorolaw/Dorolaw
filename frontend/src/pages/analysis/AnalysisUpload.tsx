import UploadArea from '@/features/videoupload/UploadArea';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import UploadTitle, {
  UploadTitleRef,
} from '@/features/videoupload/UploadTitle';
import BulletList from '@/components/ui/BulletList';
import CustomAlert from '@/components/ui/CustomAlert';
import useAlert from '@/hooks/useAlert';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '@/features/videoupload/api';
import { uploadInfo } from '@/features/analysis/api';

// 쿠키 설정 및 읽기 함수
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

const AnalysisUpload = () => {
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

  // UploadTitle 참조를 위한 ref
  const uploadTitleRef = useRef<UploadTitleRef | null>(null);

  // BulletList 항목
  const bulletAnalysisItems = [
    '업로드 될 교통사고 영상 데이터 기반의 AI 자동 분석',
    '사고 발생지, 차량 움직임, 충돌 상황 등을 토대로 과실비율 예측',
    '"참고용" AI 분석 결과 보고서는 PDF 파일 형태로 제공',
  ];

  useEffect(() => {
    // 쿠키에서 팝업 표시 여부 확인
    const popupDismissed = getCookie('analysisPopupDismissed');
    if (!popupDismissed) {
      setShowPopup(true);
    }
  }, []);

  const handleDismissPopup = () => {
    if (dontShowAgain) {
      setCookie('analysisPopupDismissed', 'true', 30); // 30일 동안 유지
    }
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
      showAlert('제목을 입력해주세요.', 'warning');
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      showAlert('업로드할 파일을 선택해주세요.', 'warning');
      setLoading(false);
      return;
    }

    if (!isAgree) {
      showAlert('개인정보 제공 동의가 필요합니다.', 'warning');
      setLoading(false);
      return;
    }

    try {
      // 1) 파일 업로드 API 호출 (제목, 공개 여부)
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
        isPublic,
      });

      // 2) 파일 업로드 후 제목, 공개여부 전송
      const boardResponse = await uploadInfo(
        {
          title: title,
          fileName: uploadResponse.fileName,
          isPublic: isPublic,
        },
        '/fault-analysis',
      );

      // 응답 처리
      if ('fileName' in boardResponse) {
        // 성공하면
        setSuccess(true);
        showAlert(
          '분석 요청이 성공적으로 완료되었습니다. AI 분석을 시작합니다.',
          'success',
        );
        setTimeout(() => {
          void navigate(`/board`);
        }, 1500);
        console.log('업로드 성공: ', boardResponse);
      } else if ('message' in boardResponse) {
        // 실패하면
        setError(boardResponse.message);
        showAlert(boardResponse.message, 'error');
      }
    } catch (error) {
      const errorMsg = '파일 업로드 중 오류 발생';
      setError(errorMsg);
      showAlert(errorMsg, 'error');
      console.error('업로드 오류: ', error);
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
                과실비율을 산정하는 기능입니다.
              </p>
              <br />
            </article>
            <article>
              <BulletList items={bulletAnalysisItems} />
              <br />
            </article>
            <p className="text-bodysmall text-gray-600">
              ※ 본 서비스의 결과물은 법적 판단이 아닌 참고 자료이므로 실제 분쟁
              대응 시에는 전문가 상담을 권장드립니다.
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
          AI 과실비율 분석
        </h1>
      </header>

      <main className="mx-auto max-w-4xl space-y-6">
        {/* 카드 형태로 구성 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <UploadTitle ref={uploadTitleRef} />
          <UploadArea />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-xl font-semibold text-p5">옵션 설정</h1>
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
            게시글이 업로드되었습니다. AI 분석을 시작합니다.
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
            {loading ? '처리 중...' : '분석 요청하기'}
          </button>
        </div>
      </main>
    </>
  );
};

export default AnalysisUpload;
