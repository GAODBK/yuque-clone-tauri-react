// src/app/(dashboard)/layout.tsx

import Sidebar from '@/app/(dashboard)/_components/sidebar';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Layout({
                                   children
                               }: Readonly<{
    children: React.ReactNode;
}>) {
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
                    className={`hidden md:flex h-screen flex-col `}>
                    <Sidebar/>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel className={`p-4`}>
                    {/*<main >*/}
                    {children}
                    {/*</main>*/}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
};