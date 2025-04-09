import UploadArea from '@/features/videoupload/UploadArea';
import UploadTitle, {
  UploadTitleRef,
} from '@/features/videoupload/UploadTitle';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import AdditionalInfo from '@/features/videoupload/AdditionalInfo';
import BulletList from '@/components/ui/BulletList';
import CustomAlert from '@/components/ui/CustomAlert';
import useAlert from '@/hooks/useAlert';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '@/features/videoupload/api';
import { submitBoardInfo } from '@/features/board/model/queries';

interface AdditionalData {
  faultRatio?: string;
  description?: string;
  question?: string;
}

const ConsultUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
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

      {/* 설명 */}
      <header className="mb-10 w-[800px]">
        <article className="flex justify-center">
          <h2 className="text-h1 font-bold">
            교통사고 과실비율 자동 분석 서비스
          </h2>
        </article>
        <article className="flex justify-center">
          <p className="mb-10 text-body">
            본 서비스는 교통사고 발생 시 제출된 블랙박스 영상 또는 CCTV 영상을
            기반으로, <br />
            AI 기술을 활용하여 사고 상황을 분석하고 예상 과실비율을 산정해
            드리는 기능입니다.
          </p>
          <br />
        </article>
        <article className="flex justify-center">
          <BulletList items={bulletAnalysisItems} />
          <br />
        </article>
        <article className="mt-10 flex justify-center">
          <p>
            ※ 본 서비스는 법률 상담 예약을 지원하며, 실제 상담은 변호사 개별
            사무소 또는 온라인을 통해 이루어집니다.
          </p>
        </article>
      </header>
      <main>
        <UploadTitle ref={uploadTitleRef} />

        {/* 영상 업로드 드래그 */}
        <UploadArea />

        {/* 추가 정보 작성 */}
        <AdditionalInfo onChange={additionalDataChange} />

        {/* 옵션 */}
        <OptionCheckbox
          isPublic={isPublic}
          onChangePublic={(value: boolean) => setIsPublic(value)}
          isAgree={isAgree}
          onChangeAgree={(value: boolean) => setIsAgree(value)}
        />

        {/* 에러 메시지 표시 (필요하면 유지) */}
        {error && (
          <p className="mx-auto mt-2 w-[800px] text-center text-red-500">
            {error}
          </p>
        )}

        {/* 버튼 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            void requestAnalysis();
          }}
          disabled={loading}
          className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1 disabled:opacity-50"
        >
          {loading ? '처리 중...' : '의뢰 신청하기'}
        </button>
      </main>
    </>
  );
};

export default ConsultUpload;
