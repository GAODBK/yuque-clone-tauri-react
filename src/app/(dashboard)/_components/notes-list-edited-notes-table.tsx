// src/app/(dashboard)/_components/IEditedNotesTable.tsx
import { Link, useSearchParams } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { GoPencil } from "react-icons/go";
import { FcFile } from "react-icons/fc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FcRating } from "react-icons/fc";
import { PiBroom } from "react-icons/pi";
import { CiShare1 } from "react-icons/ci";
// import {Note} from "@/lib/types";
import { Note } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "@/app/(knowledge)/[username]/[libraryId]/actions/delete-note";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

const NotesListEditedNotesTable = ({ notes }: { notes: Note[] }) => {
    const router = useNavigate()
    const [page, setPage] = useState(0);
    const [_s, setSearchParam] = useSearchParams()
    if (!notes || notes.length === 0) return <div className={`animate-bounce`}>loading...</div>
    const per_page = 6
    let start = page * per_page
    let end = page * per_page + per_page
    if (page < 0)
        setPage(0)
    if (start > notes.length)
        setPage(Math.floor(notes.length / per_page))

    return (
        <>
            <Table className={`w-full`}>
                <TableCaption>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className={`cursor-pointer`}
                                    onClick={() => setPage(page - 1)} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    className={`cursor-pointer`}
                                    onClick={() => setPage(0)}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    className={`cursor-pointer`}
                                    onClick={() => setPage(page + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </TableCaption>
                <TableBody className={``}>
                    {notes && notes.slice(
                        start,
                        end
                    ).map((item: Note) => (
                        <TableRow className={`group`}>
                            {/*标题*/}
                            <TableCell className={`w-[34vw] p-6`}>
                                <div className={`h-6 gap-x-2 flex items-center`}>
                                    <FcFile className={`size-6`} />
                                    <span className={`cursor-pointer`}>{item.name}</span>
                                    <Link to={`/malred/${item.libraryId}/${item.id}`}
                                        className={`group-hover:block hidden`}>
                                        <GoPencil className={`size-4`} />
                                    </Link>
                                </div>
                            </TableCell>
                            {/*对应知识库*/}
                            <TableCell className="w-[25vw] text-gray-600/50">
                                {/*@ts-ignore*/}
                                {item.library.name}
                            </TableCell>
                            {/*上次编辑时间*/}
                            <TableCell>
                                {formatDistanceToNow(item.updatedAt, {
                                    locale: zhCN
                                })}前
                            </TableCell>
                            {/*other*/}
                            <TableCell className="">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className={`hover:bg-slate-200 rounded-md group-hover:block hidden`}
                                    >
                                        <HiEllipsisHorizontal
                                            className={`size-8 p-2`} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuTrigger
                                        className={`hover:bg-slate-200 rounded-md group-hover:hidden block`}
                                    >
                                        <div
                                            className={`size-8 p-2`} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <FcRating />
                                            收藏
                                        </DropdownMenuItem>
                                        {/*不是item就不会点击后马上被关闭*/}
                                        <AlertDialog>
                                            <AlertDialogTrigger className={`cursor-pointer`} asChild>
                                                <div
                                                    className={cn(
                                                        'cursor-pointer',
                                                        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
                                                    )}
                                                >
                                                    <PiBroom />
                                                    移除
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>确定删除笔记吗?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        这个操作无法撤回!
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={async () => {
                                                            await deleteNote(item.id)
                                                            // router.refresh()
                                                            setSearchParam({ random: Math.random().toString() })
                                                            toast.success(`删除成功`)
                                                        }}
                                                    >确定</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={async () => {
                                                router(`/malred/${item.libraryId}/${item.id}`)
                                            }}>
                                            <CiShare1 />
                                            浏览器打开
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default NotesListEditedNotesTable;