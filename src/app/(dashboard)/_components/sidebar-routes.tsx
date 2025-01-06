// src/app/(dashboard)/_components/sidebar-routes.tsx
'use client';

import {FiClock} from "react-icons/fi";
import {TiPen} from "react-icons/ti";
import {Flower, Sparkles} from 'lucide-react'
import SidebarItem from "@/app/(dashboard)/_components/sidebar-item";

const routes = [
    {
        icon: FiClock,
        label: "开始",
        href: '/dashboard',
    },
    {
        icon: TiPen,
        label: "小记",
        href: '/dashboard/notes'
    },
    {
        icon: Sparkles,
        label: "收藏",
        href: '/dashboard/collections'
    },
    {
        icon: Flower,
        label: "逛逛",
        href: '/dashboard/explore'
    }
]

const SidebarRoutes = () => {
    return (
        <div className={`flex flex-col w-full`}>
            {routes.map(r => (
                <SidebarItem
                    key={r.href}
                    icon={r.icon}
                    href={r.href}
                    label={r.label}
                />
            ))}
        </div>
    )
        ;
};

export default SidebarRoutes;