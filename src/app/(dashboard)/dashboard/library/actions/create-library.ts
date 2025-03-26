// src/app/(dashboard)/dashboard/library/actions/new-library.ts

import { db } from "@/lib/db"
import { getLibraryById } from "@/lib/utils/db";

// import {API_BASE_PATH} from "@/lib/constants.ts";
//import {fetch} from "@tauri-apps/plugin-http";

export const createLibrary = async (values: {
    name: string
    description: string
}) => {
    // const res = await fetch(
    //     `${API_BASE_PATH}/api/db/library`,
    //     {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             ...values,
    //             text: `<p>👋  欢迎来到知识库</p><br/><p>知识库就像书一样，让多篇文档结构化，方便知识的创作与沉淀</p>`,
    //             showDir: true
    //         })
    //     }
    // )
    // const json = await res.json()
    // return json.library

    const res = await db.execute(
        `INSERT INTO library
                (name, description, text)
                VALUES ($1, $2, $3)`,
        [
            values.name,
            values.description,
            ''
        ]
    );
    // return await getLibraries()
    return await getLibraryById(res.lastInsertId!)
}