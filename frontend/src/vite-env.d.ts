/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ACCESS: string
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}