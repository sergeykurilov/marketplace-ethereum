export default function Breadcrumbs() {

    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
                <li className="pr-4"><a href="@components/ui/common/breadcrumbs/index#">Buy</a></li>
                <li className="px-4"><a href="@components/ui/common/breadcrumbs/index#">My Orders</a></li>
                <li className="px-4"><a href="@components/ui/common/breadcrumbs/index#">All Orders</a></li>
            </ol>
        </nav>
    )
}
