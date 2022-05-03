import React from 'react';
import {ActiveLink} from "@components/ui/common";

const BreadCrumbItem = ({item, index}) => {
    return (
        <li className={`${index === 0 ? "pr-4": "px-4"}  font-medium mr-8 text-gray-500 hover:text-gray-900`}>
            <ActiveLink
                href={item.href}
                activeLinkClass={'text-yellow-500'}
            >
                <a>{item.value}</a>
            </ActiveLink>
        </li>
    );
}


export default function Breadcrumbs({items, isAdmin}) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex leading-none text-indigo-600 divide-x divide-gray-400">
                   {items.map((item, i) => (
                       <React.Fragment key={item.href}>
                           {!item.requireAdmin && <BreadCrumbItem item={item} index={i}/>}
                           {item.requireAdmin && isAdmin && <BreadCrumbItem item={item} index={i}/>}
                       </React.Fragment>
                   ))}
            </ol>
        </nav>
    )
}
