// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note.ts
import {API_BASE_PATH} from "@/lib/constants.ts";

export const updateNote = async (value: {
    id: string
    name?: string
    text?: string
}) => {
    const res = await fetch(
        `${API_BASE_PATH}/api/db/note`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...value,
            })
        }
    )
    const json = await res.json()
    return json.note
}