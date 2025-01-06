// src/app/(knowledge)/[username]/[libraryId]/actions/update-library.ts
import {API_BASE_PATH} from "@/lib/constants.ts";

interface Props {
    name?: string
    text?: string
    description?: string
    showDir?: boolean
    id: string
}

export const updateLibrary = async (values: Props) => {
    const res = await fetch(`${API_BASE_PATH}/api/db/library`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    })
    const json = await res.json()
    return json.library
}