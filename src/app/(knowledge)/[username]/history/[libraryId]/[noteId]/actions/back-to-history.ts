// src/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/back-to-history.ts
import {API_BASE_PATH} from "@/lib/constants.ts";

export const backToHistory = async ({id, text}: {
    id: string
    text: string
}) => {
    const res = await fetch(`${API_BASE_PATH}/api/db/note/${id}/back`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text})
    })
    return res.json()
}