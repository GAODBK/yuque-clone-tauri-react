// src/app/(knowledge)/[username]/[libraryId]/[noteId]/colab/colab-page.tsx
import '../note.css'
import Edit from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/colab/_components/edit.tsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Note} from "@prisma/client";
import {API_BASE_PATH} from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";

const ColabPage = () => {
    let params = useParams()
    let [searchParams, _set] = useSearchParams()

    const [note, setNote] = useState<Note | undefined>()
    useEffect(() => {
        (async () => {
            const res = await fetch(
                `${API_BASE_PATH}/api/db/note/${params.noteId}`,
            )
            const json = await res.json()
            setNote(json.note)

            if (!json.note) return
        })()
    }, [searchParams]);
    if ( !note) return

    return (
        <Edit
            libraryId={params.libraryId!}
            note={note!}/>
    );
};

export default ColabPage;