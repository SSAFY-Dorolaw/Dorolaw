import UploadArea from '@/features/videoupload/UploadArea';
import UploadTitle, {
  UploadTitleRef,
} from '@/features/videoupload/UploadTitle';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import AdditionalInfo from '@/features/videoupload/AdditionalInfo';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '@/features/videoupload/api';
import { submitInfo } from '@/features/videoupload/api';

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

  // 추가 정보 객체로 분리
  const [additionalData, setAdditionalData] = useState<AdditionalData>({
    faultRatio: '',
    description: '',
    question: '',
  });

  // UploadTitle 참조를 위한 ref
  const uploadTitleRef = useRef<UploadTitleRef | null>(null);

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
      alert('제목을 입력해주세요');
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      alert('업로드할 파일을 선택해주세요');
      setLoading(false);
      return;
    }

    if (!isAgree) {
      alert('개인정보 제공 동의가 필요합니다.');
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
      const infoResponse = await submitInfo(
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
        void navigate(`/consultation/${infoResponse.requestId}`);
        console.log('의뢰글 업로드 성공: ', infoResponse.requestId);
      } else if ('message' in infoResponse) {
        // 실패하면
        setError(infoResponse.message);
      }
    } catch (error) {
      setError('의뢰글 업로드 중 오류 발생');
      console.error('요청 오류: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-[50px]">
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

      {/* 성공 메시지 표시 */}
      {success && (
        <p className="mx-auto mt-2 w-[800px] text-center text-green-500">
          게시글이 업로드되었습니다.
        </p>
      )}

      {/* 에러 메시지 표시 */}
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
  );
};

export default ConsultUpload;
