// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-lite-item.tsx
import {useState} from 'react';
import {Note} from "@prisma/client";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {cn} from "@/lib/utils";
import {Link, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {
    createNote as createNoteWithParent
} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {deleteNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/delete-note";
import toast from "react-hot-toast";

const SidebarDirLiteItem = ({notes, libraryId, level = 0}: {
    notes: Note[]
    level?: number
    libraryId: string
}) => {
    // console.log(level, notes[0].parentNoteId, notes)
    const pathname = useLocation().pathname
    const router = useNavigate()
    let [_s, setS] = useSearchParams()

    const [editingId, setEditingId] = useState<string | null>(null)
    const [name, setName] = useState<string | null>()
    // @ts-ignore
    const onKeyDown = async (e) => {
        if (!editingId) return
        if (e.key === 'Enter') {
            await updateNote({
                id: editingId,
                name: name!
            })
            setName(null)
            setEditingId(null)
            setS({random: Math.random().toString()})
            toast.success(`重命名成功`)
        }
    }

    return (
        <>
            {/*@ts-ignore*/}
            {notes && notes.length > 0 && notes.map((item) => (
                <>
                    {/*@ts-ignore*/}
                    {(item.childrenNote && item.childrenNote.length > 0) && (
                        <>
                            {(!editingId) && (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1" className={`p-0 border-none`}>
                                        <AccordionTrigger key={item.id} className={`p-0 border-none`}>
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    <div
                                                        className={cn(
                                                            `w-full text-sm p-2 pt-2 px-${level + 4}
                                                     hover:bg-gray-300/30 rounded-md`,
                                                            pathname === `/malred/${libraryId}/${item.id}`
                                                            && `bg-gray-300/30`
                                                        )}
                                                        key={item.id}>
                                                        <Link
                                                            to={`/malred/${libraryId}/${item.id}?random=${Math.random()}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem
                                                        onClick={() => setEditingId(item.id)}
                                                    >
                                                        重命名
                                                    </ContextMenuItem>
                                                    <ContextMenuItem
                                                        onClick={async () => {
                                                            const note = await createNoteWithParent({
                                                                libraryId,
                                                                parentNoteId: item.id
                                                            })
                                                            router(`/malred/${libraryId}/${note.id}`)
                                                            // router.refresh()

                                                            toast.success(`新建成功`)
                                                        }}
                                                    >
                                                        新建文档
                                                    </ContextMenuItem>
                                                    <ContextMenuSeparator/>
                                                    <ContextMenuItem
                                                        onClick={async () => {
                                                            await deleteNote(item.id)
                                                            // router.refresh()
                                                            toast.success('删除成功')
                                                        }}
                                                    >
                                                        删除
                                                    </ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </AccordionTrigger>
                                        <AccordionContent className={`space-y-1 py-1 border-none`}>
                                            <SidebarDirLiteItem
                                                key={item.id}
                                                libraryId={libraryId}
                                                // @ts-ignore
                                                notes={item.childrenNote}
                                                level={level + 1}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>)}
                            {editingId && editingId === item.id && (
                                <Input key={item.id}
                                       onKeyDown={onKeyDown}
                                       onBlur={() => setEditingId(null)}
                                       value={name || item.name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                            )}
                        </>
                    )}
                    {/*@ts-ignore*/}
                    {(!item.childrenNote || item.childrenNote.length === 0) && (
                        <>
                            {!editingId && (
                                <ContextMenu>
                                    <ContextMenuTrigger key={item.id}>
                                        <div
                                            className={cn(
                                                `w-full text-sm p-2 pt-2 px-${level + 4}
                                                hover:bg-gray-300/30 rounded-md`,
                                                pathname === `/malred/${libraryId}/${item.id}` && `bg-gray-300/30`
                                            )}
                                            key={item.id}>
                                            <Link to={`/malred/${libraryId}/${item.id}?random=${Math.random()}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            onClick={() => setEditingId(item.id)}
                                        >
                                            重命名
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            onClick={async () => {
                                                const note = await createNoteWithParent({
                                                    libraryId,
                                                    parentNoteId: item.id
                                                })
                                                router(`/malred/${libraryId}/${note.id}`)
                                            }}
                                        >
                                            新建文档
                                        </ContextMenuItem>
                                        <ContextMenuSeparator/>
                                        <ContextMenuItem
                                            onClick={async () => {
                                                await deleteNote(item.id)
                                                // router.refresh()
                                                toast.success(`删除成功`)
                                                router(`/malred/${libraryId}/`)
                                            }}
                                        >
                                            删除
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            )}
                            {editingId && editingId === item.id && (
                                <Input key={item.id}
                                       onKeyDown={onKeyDown}
                                       onBlur={() => setEditingId(null)}
                                       value={name || item.name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                            )}
                        </>
                    )}
                </>
            ))}
        </>
    )
};

export default SidebarDirLiteItem;