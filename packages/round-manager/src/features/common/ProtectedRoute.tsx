import { Outlet, useOutletContext } from "react-router-dom"
import { useAccount, useEnsName, useNetwork } from "wagmi"

import { Web3Instance } from "../api/types"
import { Spinner } from "../common/Spinner";
import { ReactComponent as LandingBanner } from "../../assets/landing/banner.svg"
import { ReactComponent as LandingLogo } from "../../assets/landing/logo.svg"
import Footer from "./Footer";
import WalletConnectionButton from "./WalletConnectionButton";


/**
 * Component for protecting child routes that require web3 wallet instance.
 * It prompts a user to connect wallet if no web3 instance is found.
 */
export default function ProtectedRoute() {
  const { address, isConnected, isConnecting } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { chain } = useNetwork()

  const data = { address: ensName ?? address, chain: { id: chain?.id, name: chain?.name } }

  return !isConnected ? (
    <div>
      <main>
        {isConnecting
          ? <Spinner text="Connecting Wallet" />
          :
          <div className="container mx-auto flex flex-row bg-white">
            <div className="basis-1/2 m-auto">
              <LandingLogo className="block w-auto mb-6"></LandingLogo>
              <h1 className="mb-6">Round Manager</h1>
              <p className="text-2xl my-2 text-grey-400">
                As a round operator you can manage high-impact<br />
                grant programs and distribute funds across different<br />
                rounds and voting mechanisms.
              </p>
              <WalletConnectionButton />
            </div>
            <div className="basis-1/2 right-0">
              <LandingBanner className="right-0 align-middle"></LandingBanner>
            </div>
          </div>
        }
      </main>
      <Footer />
    </div>
  ) : <Outlet context={data} />
}


/**
 * Wrapper hook to expose wallet auth information to other components
 */
export function useWallet() {
  return useOutletContext<Web3Instance>()
}