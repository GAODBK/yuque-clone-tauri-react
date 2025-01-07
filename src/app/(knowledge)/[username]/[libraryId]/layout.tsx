// src/app/(knowledge)/[username]/[libraryId]/layout.tsx

import Sidebar from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar";
import './style.scss'

const Layout = ({children}: {
    children: React.ReactNode;
}) => {

    return (
        <div>
            <div className={`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50`}>
                <Sidebar/>
            </div>
            <div className={`h-full ml-64`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;