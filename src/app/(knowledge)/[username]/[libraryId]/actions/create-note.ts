// src/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts
import {API_BASE_PATH} from "@/lib/constants.ts";

export const createNote = async ({libraryId}: { libraryId: string }) => {
    const res = await fetch(
        `${API_BASE_PATH}/api/db/note/library/${libraryId}`,
        {
            method: "POST",
        }
    )
    const json = await res.json()
    return json.note
}