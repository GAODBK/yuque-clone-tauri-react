// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input.tsx

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
} from "@/components/ui/command";
import { BsClipboardData } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { GoPlus } from "react-icons/go";
import { LuBookMarked, LuClipboardPenLine, LuTableProperties } from "react-icons/lu";
import { FcImport, FcPuzzle } from "react-icons/fc";
import { RiRobot2Line } from "react-icons/ri";
import { Library, Note } from '@/lib/types';
import SidebarSearchInputCommandItem
    from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input-command-item";
import SidebarSearchInputNewDocItem
    from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input-new-doc-item";

const SidebarSearchInput = ({ library, notes }: {
    library: Library
    notes: Note[]
}) => {

    return (
        <div className={`flex items-center gap-x-2 mx-4`}>
            <Dialog>
                <DialogTrigger asChild>
                    <Input className={`cursor-pointer h-8 bg-gray-200/40`} />
                </DialogTrigger>
                <DialogContent className={`p-0`}>
                    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput placeholder="搜索笔记" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="页面">
                                <SidebarSearchInputCommandItem
                                    notes={notes}
                                    libraryId={(library.id)}
                                />
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
                        <SidebarSearchInputNewDocItem libraryId={(library.id).toString()} />
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