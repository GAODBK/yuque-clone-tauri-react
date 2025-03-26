// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note.ts
// import {API_BASE_PATH} from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";
import { db } from "@/lib/db"
import { getNoteById } from "@/lib/utils/db"

export const updateNote = async (value: {
    id: string
    name?: string
    text?: string
}) => {
    // const res = await fetch(
    //     `${API_BASE_PATH}/api/db/note`,
    //     {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             ...value,
    //         })
    //     }
    // )
    // const json = await res.json()
    // return json.note

    let sql = ``
    let params = [value.id]

    if (value.text && !value.name) {
        sql = `UPDATE note
            set text=$2
            where id=$1`
        params.push(value.text)
    }

    if (value.name && !value.text) {
        sql = `UPDATE note
                set name=$2
                where id=$1`
        params.push(value.name)
    }

    if (value.name && value.text) {
        sql = `UPDATE note
                set name=$2, text=$3
                where id=$1`
        params.push(value.name)
        params.push(value.text)
    }

    await db.execute(sql, params)
    return
}