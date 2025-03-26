// src/app/(dashboard)/_components/notes-list.tsx
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotesListEditedNotesTable from "@/app/(dashboard)/_components/notes-list-edited-notes-table";
// import { API_BASE_PATH } from "@/lib/constants.ts";
import { useSearchParams } from "react-router-dom";
import { getNotes, getNotesWithLibrary } from '@/lib/utils/db';
import { Note } from '@/lib/types';
//import {fetch} from "@tauri-apps/plugin-http";

const NotesList = () => {
    // let params = useParams()
    let [searchParams, _set] = useSearchParams()

    const [notes, setNotes] = useState<Note[]>()
    useEffect(() => {
        (async () => {
            // const res = await fetch(`${API_BASE_PATH}/api/db/note`)
            // const json = await res.json();
            // setNotes(json.notes)
            setNotes(await getNotesWithLibrary())
        })()
    }, [searchParams])

    return (
        <div className={`p-4 pt-0`}>
            <Tabs defaultValue="edited" className="w-full">
                <TabsList>
                    <TabsTrigger value="edited">编辑过</TabsTrigger>
                    <TabsTrigger value="viewed">浏览过</TabsTrigger>
                    <TabsTrigger value="liked">我点赞的</TabsTrigger>
                    <TabsTrigger value="commented">我评论过</TabsTrigger>
                </TabsList>
                <TabsContent value="edited">
                    <NotesListEditedNotesTable notes={notes!} />
                </TabsContent>
                <TabsContent value="viewed">
                    <div>
                        1
                    </div>
                </TabsContent>
                <TabsContent value="liked">
                    <div>1</div>
                </TabsContent>
                <TabsContent value="commented">
                    <div>1</div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotesList;