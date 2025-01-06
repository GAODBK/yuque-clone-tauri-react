// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-name-input.tsx

import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";


const NoteHomeHeaderNameInput = ({id, name}: {
    id: string
    name: string
}) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(name)

    let [_searchParams, setSearchParam] = useSearchParams()

    const onBlur = async () => {
        await updateNote({id, name: value})
        setEditing(false)
        // router.refresh()
        // 通过更新search来让页面更新
        setSearchParam({random: Math.random().toString()})
        toast.success('重命名文档成功')
    }

    return (
        <div className={`flex gap-x-2 items-center`}>
            {editing ?
                <Input
                    className={``}
                    onBlur={onBlur}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                /> :
                <span
                    className={`px-2 text-slate-500 text-sm`}
                    onClick={() => setEditing(true)}
                >{name}</span>}
        </div>
    );
};

export default NoteHomeHeaderNameInput;