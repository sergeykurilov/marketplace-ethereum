import {EthRates, WalletBar} from "@components/ui/web3";
import {Breadcrumbs} from "@components/ui/common";

const LINKS = [
    {
        href: "/marketplace",
        value: "Buy",
    },
    {
        href: "/marketplace/courses/owned",
        value: "My Courses",
    },
    {
        href: "/marketplace/courses/manage",
        value: "Manage Courses",
    },
]

export default function Header() {
    return (
        <>
            <WalletBar />
            <EthRates />
            <div className={'flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8'}>
                <Breadcrumbs items={LINKS} />
            </div>
        </>
    )
}
