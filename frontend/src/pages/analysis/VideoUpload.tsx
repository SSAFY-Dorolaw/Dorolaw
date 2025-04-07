import UploadArea from '@/features/videoupload/UploadArea';
import OptionCheckbox from '@/features/videoupload/OptionCheckbox';
import UploadTitle, {
  UploadTitleRef,
} from '@/features/videoupload/UploadTitle';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '@/features/videoupload/api';

const VideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const navigate = useNavigate();

  // UploadTitle 참조를 위한 ref
  const uploadTitleRef = useRef<UploadTitleRef | null>(null);

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
      alert('제목을 입력해주세요.');
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      alert('업로드할 파일을 선택해주세요.');
      setLoading(false);
      return;
    }

    if (!isAgree) {
      alert('개인정보 제공 동의가 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      // API 호출 (제목, 공개 여부)
      const response = await uploadVideo(
        {
          file: selectedFile,
        },
        '/videos/upload',
      );

      // 응답 처리
      if ('fileName' in response) {
        // 성공하면
        setSuccess(true);
        void navigate(`/report/${boardResponse.faultAnalysisId}`);
        console.log('업로드 성공: ', boardResponse);
      } else if ('message' in boardResponse) {
        // 실패하면
        setError(response.message);
      }
    } catch (error) {
      setError('파일 업로드 중 오류 발생');
      console.error('업로드 오류: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-[50px]">
      {/* 제목 & 업로드 타이틀 */}
      <UploadTitle ref={uploadTitleRef} />

      {/* 영상 업로드 드래그 */}
      <UploadArea />

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
          영상이 성공적으로 업로드되었습니다. AI 분석을 시작합니다.
        </p>
      )}

      {/* 에러 메시지 표시 */}
      {error && (
        <p className="mx-auto mt-2 w-[800px] text-center text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          void requestAnalysis();
        }}
        disabled={loading}
        className="mx-auto my-9 block rounded-[10px] bg-p5 px-6 py-2 text-g1 disabled:opacity-50"
      >
        {loading ? '처리 중...' : '분석 요청하기'}
      </button>
    </main>
  );
};

export default VideoUpload;
