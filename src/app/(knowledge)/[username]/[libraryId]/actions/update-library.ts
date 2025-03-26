// src/app/(knowledge)/[username]/[libraryId]/actions/update-library.ts
// import { API_BASE_PATH } from "@/lib/constants.ts";
import { db } from "@/lib/db";
//import {fetch} from "@tauri-apps/plugin-http";

interface Props {
    name?: string
    text?: string
    description?: string
    showDir?: boolean
    id: number
}

export const updateLibrary = async (values: Props) => {
    // const res = await fetch(`${API_BASE_PATH}/api/db/library`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values)
    // })
    // const json = await res.json()
    // return json.library
    console.log('updated library, values: ', values)

    await db.execute(
        `UPDATE library
            set name=$1, description=$2, text=$3, showDir=$4
            where id=$5`,
        [
            values.name,
            values.description,
            values.text,
            values.showDir,
            values.id
        ]
    );

    return
}