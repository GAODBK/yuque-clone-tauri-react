// src/app/(knowledge)/[username]/history/[libraryId]/[noteId]/_components/header.tsx
'use client';
import {NoteHistory} from '@prisma/client';

import {FaChevronLeft} from "react-icons/fa";
import {backToHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/back-to-history";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast';


const Header = ({history}: { history: NoteHistory | undefined }) => {
    const router = useNavigate()
    const [_s, setSearchParam] = useSearchParams()

    return (
        <div className={`sticky z-50 top-0 h-16 bg-white p-2 border-b shadow-md px-4 w-full
         flex items-center justify-between`}>
            <div className={`flex gap-x-2 items-center`}>
                <FaChevronLeft
                    className={`size-5 cursor-pointer`}
                    onClick={() => {
                        // router.back()
                        // @ts-ignore
                        router(`/malred/${history.note.libraryId}/${history.noteId}`)
                        // router.refresh()
                    }}
                />
                <span>历史记录</span>
            </div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <span
                        className={`p-2 m-2 text-sm text-white bg-green-500 rounded-md`}>
                        恢复此记录
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                if (!history) return
                                await backToHistory({id: history.noteId, text: history.text})
                                // @ts-ignore
                                router(`/malred/${history.note.libraryId}/${history.noteId}`)
                                // router.refresh()
                                
                                toast.success(`恢复成功`)
                            }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Header;