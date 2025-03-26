// src/app/(dashboard)/_components/sidebar-search-input.tsx
import { Input } from "@/components/ui/input";
import { GoPlus } from "react-icons/go";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FiClock } from "react-icons/fi";
import { TiPen } from "react-icons/ti";
import { BsJournalBookmark } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuTableProperties } from "react-icons/lu";
import { LuClipboardPenLine } from "react-icons/lu";
import { GrDocumentText } from "react-icons/gr";
import { BsClipboardData } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FcPuzzle } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import { RiRobot2Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
// import { Library } from "@/lib/types";
import { Library } from "@/lib/types";
// import { API_BASE_PATH } from "@/lib/constants.ts";
import toast from "react-hot-toast";
import { createNote } from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts";
import { getLibraries } from "@/lib/utils/db";
//import {fetch} from "@tauri-apps/plugin-http";

const SidebarSearchInput = () => {
    const router = useNavigate()

    const [libraries, setLibraries] = useState<Library[] | null>([])
    useEffect(() => {
        (async () => {
            // const res = await fetch(`${API_BASE_PATH}/api/db/library`)
            // const json = await res.json();
            // setLibraries(json.libraries)
            setLibraries(await getLibraries())
        })()
    }, [])

    return (
        <div className={`flex items-center gap-x-2 mx-4`}>
            <Dialog>
                <DialogTrigger asChild>
                    <Input className={`cursor-pointer h-8 bg-gray-200/40`} />
                </DialogTrigger>
                <DialogContent className={`p-0`}>
                    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput placeholder="搜索内容" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="页面">
                                <Link to={`/dashboard`}>
                                    <CommandItem className={`cursor-pointer`}>
                                        <FiClock />
                                        <span>开始</span>
                                    </CommandItem>
                                </Link>
                                <Link to={`/dashboard/notes`}>
                                    <CommandItem className={`cursor-pointer`}>
                                        <TiPen />
                                        <span>小记</span>
                                    </CommandItem>
                                </Link>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="知识库">
                                {libraries && libraries.map((item) => (
                                    <Link to={`/malred/${item.id}`}>
                                        <CommandItem className={`cursor-pointer`} key={item.id}>
                                            <BsJournalBookmark />
                                            <span>{item.name}</span>
                                        </CommandItem>
                                    </Link>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
            <div
                className={`h-8 w-10 cursor-pointer border rounded-md flex items-center justify-center bg-white`}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <GoPlus className={`size-6`} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`py-4 px-2`}>
                        <DropdownMenuItem
                            className={`cursor-pointer`}
                            onClick={async () => {
                                if (!libraries || libraries.length === 0) return
                                const note = await createNote({
                                    libraryId: libraries?.[0].id!
                                })
                                router(`/malred/${libraries?.[0].id!}/${note.id}?random=${Math.random()}`)
                                // router.refresh()
                                toast.success(`新建成功`)
                            }}>
                            <GrDocumentText />
                            文档
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuTableProperties />
                            {/*<FcViewDetails/>*/}
                            表格
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuClipboardPenLine />
                            画板
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BsClipboardData />
                            数据表
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LuBookMarked />
                            知识库
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FcPuzzle />
                            从模板新建
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RiRobot2Line />
                            Ai帮你写
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FcImport />
                            导入
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SidebarSearchInput;