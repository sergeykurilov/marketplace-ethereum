import {EthRates, WalletBar} from "@components/ui/web3";
import {Breadcrumbs} from "@components/ui/common";


export default function Header() {

    return (
        <>
            <WalletBar />
            <EthRates />
            <div className={'flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8'}>
                <Breadcrumbs />
            </div>
        </>
    )
}
