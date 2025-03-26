import {db} from "../db";
import {Note, Library, Group, NoteHistory} from "../types";

export async function getNotes() {
    return await db.select<Note[]>("SELECT * FROM note");
}

export async function getNotesWithLibrary() {
    let notes = await db.select<Note[]>("SELECT * FROM note");
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let library = await db.select<Library[]>("SELECT * FROM library where id=$1", [note.libraryId])
        note.library = library[0]
    }
    return notes
}

export async function getNotesById(id: number): Promise<null | Note> {
    // const res = await fetch(`${API_BASE_PATH}/api/db/note/${id}`)
    // const json = await res.json()
    // let node = json.note

    let node = await db.select<Note[]>("SELECT * FROM note where id=$1", [id]);
    let note = node[0]
    const node_children = await db.select<Note[]>('select * from note where parentNoteId=$1', [id])

    if (!note) {
        // @ts-ignore
        return {};
    }

    // if (node.childrenNote.length > 0) {
    if (node_children.length > 0) {
        let children = []
        // 遍历childrenNote
        for (let child of node_children) {
            // 获取childrenNote的child
            const childNodes = await getNotesById(child.id);
            // @ts-ignore
            children.push(childNodes)
        }
        // @ts-ignore
        note.childrenNote = children
    }

    return note;
}

export async function getNoteById(id: number) {
    let node = await db.select<Note[]>("SELECT * FROM note where id=$1", [id]);
    return node[0]
}

export async function getLibraries(): Promise<null | Library[]> {
    let libraries = await db.select<Library[]>("SELECT * FROM library");
    // console.log(libraries)
    return libraries
}

export async function getLibraryById(id: number): Promise<null | Library> {
    let library = await db.select<Library[]>("SELECT * FROM library where id=$1", [id]);
    let notes = await db.select<Note[]>(`
        select *
        from note n
        where n.libraryId = $1
    `, [id])
    let groups = await db.select<Group[]>(`
        select *
        from tb_group n
        where n.libraryId = $1
    `, [id])
    // 只查询根节点
    library[0].notes = notes.filter(n => !n.parentNoteId)
    library[0].groups = groups // todo
    // console.log(libraries)
    return library[0]
}

export async function getNoteHistories(note_id: number) {
    return await db.select<NoteHistory[]>(
        `select *
         from notehistory
         where noteId = $1`, [note_id]
    )
}