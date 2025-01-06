// src/app/(knowledge)/[username]/[libraryId]/actions/delete-note.ts


import {API_BASE_PATH} from "@/lib/constants.ts";

export const deleteNote = async (id: string) => {
    const res = await fetch(`${API_BASE_PATH}/api/db/note/${id}`, {
        method: 'DELETE',
    })
    const json = await res.json()
    return json.note
}