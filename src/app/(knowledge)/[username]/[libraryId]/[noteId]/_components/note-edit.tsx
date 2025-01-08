// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-edit.tsx

import { useEffect, useState } from 'react';

import { Note } from "@prisma/client";
import { useSlugStore } from "@/hooks/use-slug-store";
import { updateNote } from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import { useNavigate } from "react-router-dom";

import TipTap from '@/components/tiptap/TipTap'
import toast from "react-hot-toast";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const NoteEdit = ({ note, libraryId }: { note: Note; libraryId: string }) => {
    const router = useNavigate()

    const { setSlug } = useSlugStore()
    useEffect(() => {
        setSlug(note.name)
    }, [])


    const [richText, setRichText] = useState(note.text!)

    return (
        <div className={`h-full w-full prose-lg p-2`}>
            <ScrollArea className={`w-full h-[90vh]`}>
                <TipTap
                    provider={ undefined}
                    onSubmit={async () => {
                        await updateNote({ id: note.id, text: richText })
                        router(`/malred/${libraryId}/${note.id}?random=${Math.random()}`)
                        toast.success(`保存成功`)
                    }}
                    description={richText} onChange={(richText) => {
                    setRichText(richText)
                }} slug={note.name!} />
            </ScrollArea>
        </div>
    );
};

export default NoteEdit;