import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
    BrowserRouter as Router,
    Routes,
    Route, Outlet
} from 'react-router-dom';
import DashboardLibraryPage from "@/app/(dashboard)/dashboard/library/dashboardLibraryPage.tsx";

import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';
import DashboardPage from "@/app/(dashboard)/dashboard/dashboardPage.tsx";
import KnowledgeLibraryPage from "@/app/(knowledge)/[username]/[libraryId]/knowledgeLibraryPage.tsx";
import KnowledgeNotePage from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/knowledgeNotePage.tsx";
import NoteHistoryPage from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/noteHistoryPage.tsx";
import {Toaster} from "react-hot-toast";
import AiChatPage from "@/app/(ai)/chat.tsx";
import ColabPage from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/colab/colab-page.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path={'ai/chat'} element={<AiChatPage/>}/>
                        <Route path=':username'>
                            <Route path={'history'}>
                                <Route path={':libraryId'}>
                                    <Route path={':noteId'}>
                                        <Route path={''} element={<NoteHistoryPage/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path={':libraryId'}>
                                <Route path={''} element={<KnowledgeLibraryPage/>}/>
                                <Route path={':noteId'}>
                                    <Route path={''} element={<KnowledgeNotePage/>}/>
                                    <Route path={'colab'} element={<ColabPage/>}/>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="dashboard">
                            <Route path="" element={<DashboardPage/>}/>
                            <Route path={'library'} element={
                                <DashboardLibraryPage/>}>
                            </Route>
                        </Route>
                        {/*<Route path="document"> /!* 子路由 *!/*/}
                        {/*<Route path={'write'}>
                            <Route path=":slug" element={<Write/>}/>  动态子路由
                            <Route path={'collaboration'}>
                                <Route path={'mantine'}>
                                    <Route path=":slug" element={<CollaborationV2/>}/>  动态子路由
                                </Route>
                                <Route path=":slug" element={<Collaboration/>}/>  动态子路由
                            </Route>
                        </Route>
                        <Route path={'read'}>
                            <Route path=":slug" element={<Read/>}/>  动态子路由
                        </Route>*/}
                        {/*</Route>*/}
                    </Routes>
                </Router>
                <Outlet/>
                <Toaster/>
            </div>
        </MantineProvider>
    </React.StrictMode>,
);
