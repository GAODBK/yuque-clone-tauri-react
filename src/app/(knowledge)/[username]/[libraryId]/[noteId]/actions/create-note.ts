// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note.ts

import {API_BASE_PATH} from "@/lib/constants.ts";

interface Props {
    parentNoteId?: string
    groupId?: string
    libraryId: string
}

export const createNote = async (value: Props) => {
    const res = await fetch(
        `${API_BASE_PATH}/api/db/note`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...value,
                name: '无标题文档',
                text: '',
            })
        }
    )
    const json = await res.json()
    return json.note
}