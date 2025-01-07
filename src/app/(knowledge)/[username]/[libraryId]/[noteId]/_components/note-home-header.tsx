// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header.tsx

import NoteHomeHeaderNameInput
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-name-input";

import {Link} from 'react-router-dom';
import {FaUserPlus} from "react-icons/fa6";
import {BsChatText} from "react-icons/bs";
import {AiOutlineInsertRowRight} from "react-icons/ai";
import NoteHomeHeaderEditButton
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-edit-button";
import NoteHomeHeaderAIButton
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-ai-button";
import {Tabs, TabsContent, TabsList} from "@/components/ui/tabs"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import {Separator} from "@/components/ui/separator";
import {BsSliders2} from "react-icons/bs";
import {FaClockRotateLeft} from "react-icons/fa6";
import {VscNotebookTemplate} from "react-icons/vsc";
import {LiaFileExportSolid} from "react-icons/lia";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import ExportWordItem from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-word-item";
import ExportPdfItem from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-pdf-item";
import ExportMdItem from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-md-item";

const NoteHomeHeader = ({id, text, libraryId, name}: {
    id: string
    text: string
    libraryId: string
    name: string
}) => {

    return (
        <div className={`h-14 border-b p-2 flex justify-between items-center sticky top-0 z-50 bg-white`}>
            <NoteHomeHeaderNameInput id={id} name={name}/>
            <div className={`flex items-center gap-x-3`}>
                <NoteHomeHeaderAIButton id={id} libraryId={libraryId}/>
                <FaUserPlus className={`size-6`}/>
                <span/>
                <span className={`py-1.5 h-8 px-4 font-semibold rounded-md text-sm border`}>
                    分享
                </span>

                <NoteHomeHeaderEditButton id={id} libraryId={libraryId}/>
                <Tabs defaultValue="" className={``}>
                    <TabsList>
                        <Sheet>
                            <SheetTrigger>
                                <BsChatText className={`size-5`}/>
                            </SheetTrigger>
                            <SheetContent>
                                <div>

                                </div>
                            </SheetContent>
                        </Sheet>
                        <Separator orientation={'vertical'} className={`mx-1`}/>
                        <Sheet>
                            <SheetTrigger>
                                <AiOutlineInsertRowRight className={`size-5`}/>
                            </SheetTrigger>
                            <SheetContent>
                                <div className={`p-2 rounded-md bg-gray-300/30`}>
                                    <div className={`p-2 rounded-md cursor-pointer
                                    flex items-center hover:bg-slate-300/30 gap-x-2
                                    `}>
                                        <BsSliders2 className={`size-5`}/>
                                        <span>文档设置</span>
                                    </div>
                                    <Separator className={`my-2`}/>
                                    <div className={`p-2 rounded-md cursor-pointer
                                    flex items-center hover:bg-slate-300/30 gap-x-2
                                    `}>
                                        <VscNotebookTemplate className={`size-5`}/>
                                        <span>另存为模板</span>
                                    </div>
                                    <Link
                                        className={`w-full`}
                                        to={`/malred/history/${libraryId}/${id}`}>
                                        <div className={`p-2 rounded-md cursor-pointer
                                            flex items-center hover:bg-slate-300/30 gap-x-2
                                            `}>
                                            <FaClockRotateLeft className={`size-5`}/>
                                            <span>历史版本</span>
                                        </div>
                                    </Link>
                                    <div className={`p-2 rounded-md cursor-pointer
                                    flex items-center hover:bg-slate-300/30 gap-x-2
                                    `}>
                                        <LiaFileExportSolid className={`size-5`}/>
                                        <Dialog>
                                            <DialogTrigger>
                                                <span>导出</span>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>导出文档</DialogTitle>
                                                </DialogHeader>
                                                <div className={`flex flex-wrap justify-between space-x-4`}>
                                                    {/*<ExportWordItem*/}
                                                    {/*    content={text} title={name}*/}
                                                    {/*/>*/}
                                                    <ExportPdfItem title={name}/>
                                                    <ExportMdItem
                                                        content={text} title={name}
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </TabsList>
                    <TabsContent value="comment">

                    </TabsContent>
                    <TabsContent value="settings">

                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default NoteHomeHeader;