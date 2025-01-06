// src/app/(dashboard)/_components/sidebar-item.tsx
'use client';

import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Link, useLocation} from 'react-router-dom';
import {IconType} from "react-icons";

interface Props {
    icon: LucideIcon | IconType
    label: string
    href: string
}

const SidebarItem = ({icon: Icon, label, href}: Props) => {
    const pathname = useLocation().pathname

    const isActive =
        pathname === href
    // (pathname === '/' && href === '/') ||
    // pathname === href ||
    // pathname?.startsWith(`${href}`)

    return (
        <Link
            to={href}
            className={cn(
                `flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-5 transition-all
            hover:text-slate-600 hover:bg-slate-300/20 h-full`,
                isActive && `text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700`
            )}
        >
            <div className={`flex items-center gap-x-2 py-2`}>
                <Icon
                    size={16}
                    className={cn(
                        `text-slate-500`,
                        isActive && `text-sky-700`
                    )}
                />
                {label}
            </div>
            {/*右侧边缘的小竖条*/}
            <div
                className={cn(
                    `ml-auto opacity-0 border-2 border-sky-700 h-full transition-all`,
                    isActive && 'opacity-100'
                )}
            />
        </Link>
    );
};

export default SidebarItem;