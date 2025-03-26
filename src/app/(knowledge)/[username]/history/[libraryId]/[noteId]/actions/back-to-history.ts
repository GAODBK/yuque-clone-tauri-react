// src/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/back-to-history.ts
// import { API_BASE_PATH } from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";
import {db} from "@/lib/db"

export const backToHistory = async ({id, text}: {
    id: number
    text: string
}) => {
    // const res = await fetch(`${API_BASE_PATH}/api/db/note/${id}/back`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({text})
    // })
    // return res.json()


    let sql = `UPDATE note
               set text= $2
               where id = $1`
    let params = [id, text]


    await db.execute(sql, params)
    return
}