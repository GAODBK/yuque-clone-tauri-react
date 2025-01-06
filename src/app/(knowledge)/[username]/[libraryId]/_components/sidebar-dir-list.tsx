// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list.tsx

import {useState} from 'react';
import {CiFolderOn} from "react-icons/ci";
import {IoIosArrowDown} from "react-icons/io";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Note, Group, Library} from '@prisma/client';
import {cn} from "@/lib/utils";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note";
import SidebarDirLiteItem from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-lite-item";
import {useNavigate} from "react-router-dom";


const SidebarDirList = ({libraryId, notes, groups}: {
    libraryId: string
    library: Library
    notes: Note[]
    groups: Group[] // todo
}) => {
    const router = useNavigate()

    const [open, setOpen] = useState(true)

    const onClick = async () => {
        const note = await createNote({libraryId})
        router(`/malred/${libraryId}/${note.id}`)
    }

    return (
        <div className={`px-5 w-full`}>
            <div className={`flex justify-between`}>
                <div className={`flex gap-x-2`}>
                    <CiFolderOn className={`size-5`}/>
                    <span className={`text-sm`}>目录</span>
                </div>
                <IoIosArrowDown
                    onClick={() => setOpen(!open)}
                    className={cn(
                        `transition-all duration-200 size-5`,
                        !open && `rotate-90`
                    )}/>
            </div>
            <ScrollArea className="my-2 h-[72vh] w-full">
                {open && notes.length === 0 && groups.length === 0 && (
                    <div className={`transition-all duration-200 w-full h-[71vh] flex justify-center items-center`}>
                        <div>知识库为空，你可以<span
                            className={`text-blue-500 underline`}
                            onClick={onClick}
                        >新建文档</span>
                        </div>
                    </div>
                )}
                {open && (notes.length === 0 || groups.length === 0) && (
                    <div className={`w-full p-1`}>
                        {/*@ts-ignore*/}
                        <SidebarDirLiteItem
                            libraryId={libraryId}
                            notes={notes}
                        />
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default SidebarDirList;