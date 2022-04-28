import {ActiveLink} from "@components/ui/common";

export default function Breadcrumbs({items}) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex leading-none text-indigo-600 divide-x divide-gray-400">
                   {items.map((item, i) => (
                       <li className={`${i === 0 ? "pr-4": "px-4" }  font-medium mr-8 text-gray-500 hover:text-gray-900`}>
                           <ActiveLink
                               key={item.href}
                               href={item.href}
                               activeLinkClass={'text-yellow-500'}
                           >
                               <a>{item.value}</a>
                           </ActiveLink>
                       </li>
                   ))}
            </ol>
        </nav>
    )
}
