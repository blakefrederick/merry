import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThirdwebProvider } from "@thirdweb-dev/react/solana"
import { Network } from "@thirdweb-dev/sdk/solana"
import { WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"

import "../styles/globals.css";

const network: Network = 'devnet'
const domain = 'educationalpurposes.edu'
const wallet = new PhantomWalletAdapter()ß

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
