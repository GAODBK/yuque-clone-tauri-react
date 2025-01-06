// src/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir.tsx

import {Library, Note} from "@prisma/client";
import HomepageDirItem from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir-item";
import {useEffect, useState} from "react";
import {getNotes} from "@/lib/utils.ts";

const HomepageDir = ({library}: { library: Library & { Note: Note[] } }) => {
    const [notes, setNotes] = useState<Note[]>([])
    useEffect(() => {
        (async () => {
            let notes: Note[] = []
            // @ts-ignore
            if (library?.Note && library?.Note.length > 0) {
                // @ts-ignore
                for (let note of library?.Note) {
                    // @ts-ignore
                    notes.push(await getNotes(note.id))
                }
            }
            setNotes(notes)
            // console.log(notes)
        })()
    }, [library]);

    return (
        <div className={`w-full p-4 flex flex-col`}>
            <h2 className={`py-2 text-2xl font-semibold text-center`}>目录</h2>
            <HomepageDirItem notes={notes}/>
        </div>
    );
};

export default HomepageDir;