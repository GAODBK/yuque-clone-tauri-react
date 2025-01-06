// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-rename-input.tsx
import {useState} from 'react';
import {Library} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {updateLibrary} from "@/app/(knowledge)/[username]/[libraryId]/actions/update-library";
import {useNavigate, useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";

const HomepageRenameInput = ({library}: { library: Library }) => {
    const router = useNavigate()
    const [v, setV] = useState(library.name)
    const [_s, setSearchParam] = useSearchParams()

    return (
        <Input
            onBlur={async () => {
                await updateLibrary({id: library.id, name: v})
                router(`/malred/${library.id}`)
                // router.refresh()
                
                toast.success('重命名文档成功')
            }}
            value={v}
            className={`font-bold text-2xl`}
            onChange={(e) => setV(e.target.value)}
        />
    );
};

export default HomepageRenameInput;