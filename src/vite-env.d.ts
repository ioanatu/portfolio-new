/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: string;
  readonly VITE_CREDLY_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
