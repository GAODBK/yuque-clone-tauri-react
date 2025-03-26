// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar.tsx
import {BsJournalBookmark} from "react-icons/bs";

import {HiEllipsisHorizontal} from "react-icons/hi2";
import {Separator} from "@/components/ui/separator";
import SidebarSearchInput from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input";
import SidebarDirList from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list";
// import { Note, Library } from '@/lib/types';
import {Note, Library} from '@/lib/types';
import SidebarHomeItem from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-home-item";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
// import {getNotes} from '@/lib/utils'
import {getLibraryById, getNotesById} from '@/lib/utils/db.ts'
// import { API_BASE_PATH } from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";

const Sidebar = () => {
    let params = useParams()
    const libraryId = params.libraryId
    let [searchParams] = useSearchParams()

    // let [library, setLibrary] = useState<Library | undefined>()
    let [library, setLibrary] = useState<Library | null>()
    useEffect(() => {
        (async () => {
            // const res = await fetch(`${API_BASE_PATH}/api/db/library/${libraryId}`)
            // const json = await res.json();
            // setLibrary(json.library)
            setLibrary(await getLibraryById(parseInt(libraryId!)))
        })()
    }, [searchParams])

    const [notes, setNotes] = useState<Note[]>([])
    useEffect(() => {
        (async () => {
            let notes: Note[] = []
            if (library?.notes && library?.notes.length > 0) {
                for (let note of library?.notes) {
                    // @ts-ignore
                    notes.push(await getNotesById(note.id))
                }
            }
            setNotes(notes)

            // console.log(notes)
        })()
    }, [library]);

    if (!library || !notes) {
        return
    }


    return (
        <div className={`bg-gray-200/20 h-full border-r flex flex-col overflow-y-auto shadow-sm`}>
            {/*面包屑*/}
            <div className={`px-4 pt-4`}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className={``}>
                            <BreadcrumbLink href="/">
                                <img
                                    className={`rounded-md`}
                                    alt={'logo'}
                                    src={'/logo.png'}
                                    width={18}
                                    height={18}
                                />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/malred/${library?.id}`}>
                                {library?.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/*header: icon - library name*/}
            <div className={`flex p-4 justify-between items-center`}>
                <div className={`flex gap-x-2 items-center`}>
                    <BsJournalBookmark className={`text-blue-500 size-5`}/>
                    <text className={`font-bold`}>{library?.name}</text>
                </div>
                <HiEllipsisHorizontal className={`cursor-pointer size-5`}/>
            </div>
            <Separator/>
            <div className={`pt-4`}>
                <SidebarSearchInput
                    notes={notes}
                    library={library}
                />
            </div>
            <div className={`flex flex-col py-4 items-center gap-y-2`}>
                <SidebarHomeItem libraryId={libraryId!}/>
            </div>
            <SidebarDirList
                library={library}
                libraryId={parseInt(libraryId!)}
                // @ts-ignore
                notes={notes}
                // @ts-ignore
                // groups={library?.Group!}
                groups={library?.groups!}
            />
        </div>
    );
};

export default Sidebar;