// src/app/(dashboard)/dashboard/library/_components/library-list-new-icons.tsx

import {FiPlus} from "react-icons/fi";
import {IoChevronDownOutline} from "react-icons/io5";
import LibraryNewForm from "@/app/(dashboard)/dashboard/library/_components/library-new-form";
import {Separator} from "@/components/ui/separator";
import {useAIState} from "ai/rsc";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {BsJournalBookmark} from "react-icons/bs";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

const LibraryListNewIcons = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild
                               className={`border w-16 mr-4 rounded-md hover:text-emerald-600 
                            hover:border-emerald-600`}>
                    <div
                        className={`cursor-pointer  
                                gap-x-2 text-right flex justify-center items-center`}
                    >
                        <FiPlus className={`size-4`}/>
                        <IoChevronDownOutline className={`size-4`}/>
                    </div>
                </DialogTrigger>
                <DialogContent className={`w-96`}>
                    <LibraryNewForm/>
                    <Separator orientation={'vertical'}/>
                    <span className={`cursor-pointer text-sm`}>
                        新建分组
                    </span>
                </DialogContent>
            </Dialog>
        </>
    )
        ;
};

export default LibraryListNewIcons;