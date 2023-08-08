declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WALLET_CONNECT_PROJECT_ID: string;
      ALCHEMY_ID: string;
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}
export {};
