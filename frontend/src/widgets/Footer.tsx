import { FaGitlab } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

function Footer() {
  return (
    <footer className="h-[130px] w-full">
      <hr />
      <div className="mx-auto flex h-full w-[1200px] justify-between">
        <div className="my-auto flex flex-col gap-2">
          <div className="text-sm">© 2025 DoroLaw. All Rights Reserved.</div>
          <div>
            <a href="https://lab.ssafy.com/s12-ai-image-sub1/S12P21A501">
              <div className="flex items-center gap-1 text-xs">
                <FaGitlab />
                https://lab.ssafy.com/s12-ai-image-sub1/S12P21A501
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.notion.so/SSAFY-PJT-1a4e0af0747e80d88fadc3163fb7d135?pvs=46&qid=">
              <div className="flex items-center gap-1 text-xs">
                <SiNotion />
                https://www.notion.so/SSAFY-PJT-1a4e0af0747e80d88fadc3163fb7d135?pvs=46&qid=
              </div>
            </a>
          </div>
        </div>
        <div className="m-auto flex flex-col gap-0.5 text-xs">
          <p>본 사이트는 SSAFY 특화 프로젝트의 일환으로 제작되었습니다.</p>
          <p>제작자 및 SSAFY의 허락 없이 무단으로 복제 및 배포를 금합니다.</p>
          <p>제공되는 정보는 참고용으로, 실제 판결 결과와 다를 수 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
