// src/app/(knowledge)/[username]/[libraryId]/actions/delete-note.ts

//import {fetch} from "@tauri-apps/plugin-http";
import { db } from "@/lib/db"
// import {API_BASE_PATH} from "@/lib/constants.ts";

export const deleteNote = async (id: number) => {
    // const res = await fetch(`${API_BASE_PATH}/api/db/note/${id}`, {
    //     method: 'DELETE',
    // })
    // const json = await res.json()
    // return json.note
    const sql = `delete from note where id=$1`
    await db.execute(sql, [id])
    return
}