/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMetaEnv {
  readonly VITE_API_LOCAL_URL: string;
}

interface ImportMetaEnv {
  readonly VITE_KAKAO_REDIRECT_URI: string;
}

interface ImportMetaEnv {
  readonly VITE_KAKAO_LOCAL_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
