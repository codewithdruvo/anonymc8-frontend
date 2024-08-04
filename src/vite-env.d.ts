/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BACKEND_API_URL: string;
  readonly VITE_APP_BACKEND_SOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
