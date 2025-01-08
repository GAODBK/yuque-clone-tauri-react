// src/app/(knowledge)/[username]/[libraryId]/layout.tsx

import Sidebar from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar";
import './style.scss'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";

const Layout = ({children}: {
    children: React.ReactNode;
}) => {

    return (
        <div className={`min-h-screen min-w-screen`}>
            <ResizablePanelGroup
                // 添加一个用于自动保存当前面板缩放位置的id
                autoSaveId={'ca-dashboard-layout'}
                direction="horizontal"
                className={`min-h-screen min-w-screen`}
            >
                <ResizablePanel
                    defaultSize={20}
                    minSize={14}
                    className={`hidden md:flex h-full flex-col`}>
                    {/*<div >*/}
                    <Sidebar/>
                    {/*</div>*/}
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel className={`h-full`}>
                    {/*<main >*/}
                    {children}
                    {/*</main>*/}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    /*<div>
        <div className={`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50`}>
            <Sidebar/>
        </div>
        <div className={`h-full ml-64`}>
            {children}
        </div>
    </div>*/
)
    ;
};

export default Layout;