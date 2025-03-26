// src/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts
// import {API_BASE_PATH} from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";
import { db } from "@/lib/db"
import { getNoteById } from "@/lib/utils/db";

export const createNote = async ({ libraryId }: { libraryId: number }) => {
    // const res = await fetch(
    //     `${API_BASE_PATH}/api/db/note/library/${libraryId}`,
    //     {
    //         method: "POST",
    //     }
    // )
    // const json = await res.json()
    // return json.note

    const res = await db.execute(
        `INSERT INTO note
                (libraryId, name, text)
                VALUES ($1, $2, $3)`,
        [
            libraryId, '无标题文档', ''
        ]
    );

    await db.execute(
        `insert into notehistory (text, noteId) values($1, $2)`,
        ['', res.lastInsertId]
    )

    return await getNoteById(res.lastInsertId!)
}