// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input-new-doc-item.tsx
import {GrDocumentText} from "react-icons/gr";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useNavigate} from "react-router-dom";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note";
import toast from "react-hot-toast";

const SidebarSearchInputNewDocItem = ({libraryId}: { libraryId: string }) => {
    const router = useNavigate()

    return (
        <>
            <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={async () => {
                    const note = await createNote({
                        libraryId
                    })
                    router(`/malred/${libraryId}/${note.id}?random=${Math.random()}`)
                    // router.refresh()
                    toast.success(`新建成功`)
                }}
            >
                <GrDocumentText/>
                文档
            </DropdownMenuItem>
        </>
    );
};

export default SidebarSearchInputNewDocItem;