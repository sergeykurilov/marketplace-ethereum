export default function Breadcrumbs() {

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex leading-none text-indigo-600 divide-x divide-gray-400">
                <li className="pr-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
                    <a href="@components/ui/common/breadcrumbs/index#">Buy</a></li>
                <li className="px-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
                    <a href="@components/ui/common/breadcrumbs/index#">My Courses</a></li>
                <li className="px-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
                    <a href="@components/ui/common/breadcrumbs/index#">Manage Courses</a></li>
            </ol>
        </nav>
    )
}
