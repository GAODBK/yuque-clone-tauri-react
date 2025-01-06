// src/app/(dashboard)/_components/star-card-new-document-item.tsx
import {useEffect, useState} from 'react';
import {GrDocumentText} from "react-icons/gr";
import {LuClipboardPenLine, LuTableProperties} from "react-icons/lu";
import {BsClipboardData} from "react-icons/bs";
import {Separator} from "@/components/ui/separator";
import {FcImport} from "react-icons/fc";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {HiOutlineDocumentPlus} from "react-icons/hi2";
import {HiOutlineChevronDown} from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Link, useNavigate} from 'react-router-dom';
import {Library} from "@prisma/client";
import {API_BASE_PATH} from "@/lib/constants.ts";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts";
import toast from "react-hot-toast";

const StarCardNewDocumentItem = () => {
    let [libraries, setLibraries] = useState<Library[] | undefined>()
    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_BASE_PATH}/api/db/library`)
            const json = await res.json();
            setLibraries(json.libraries)
        })()
    }, [])

    const router = useNavigate()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className={`w-[16vw] border rounded-md p-3`}>
                    {/*新建文档*/}
                    <div className={`flex items-center gap-x-2`}>
                        <HiOutlineDocumentPlus className={`m-2 size-5`}/>
                        <div className={`flex flex-col items-start`}>
                            <span className={`text-sm font-semibold cursor-pointer`}>新建文档</span>
                            <span className={`text-xs text-slate-400/80`}>
                                文档、表格、画板、数据表
                            </span>
                        </div>
                        <HiOutlineChevronDown className={`ml-2 size-4`}/>
                    </div>
                </DropdownMenuTrigger>
                {/*hover后弹出*/}
                <DropdownMenuContent className={`pl-8 bg-white p-1 text-black w-[16vw] border`}>
                    <div
                        className={`mt-2 rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <GrDocumentText className={`size-4`}/>
                        <Dialog>
                            <DialogTrigger>
                                <span className={`cursor-pointer`}>新建文档</span>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        新建文档
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>选择一个知识库</DialogDescription>
                                <Command className={`relative z-50 size-screen inset-y-0`}>
                                    {libraries && libraries.length !== 0 && (<CommandInput
                                        placeholder="请输入知识库名称进行搜索"/>)}
                                    <CommandList>
                                        {libraries && libraries.length !== 0 && (
                                            <CommandEmpty>未能找到相关知识库，换个关键词试试</CommandEmpty>
                                        )}
                                        <CommandGroup>
                                            {libraries && libraries.length !== 0 &&
                                                libraries.map((l) => (
                                                    <CommandItem
                                                        key={l.id}
                                                        onSelect={async () => {
                                                            const note = await createNote({
                                                                libraryId: l.id
                                                            })
                                                            router(`/malred/${l.id}/${note.id}`)
                                                            toast.success('创建成功')
                                                        }}
                                                        className={`my-2 cursor-pointer`}
                                                    >
                                                        {l.name}
                                                    </CommandItem>
                                                ))}
                                        </CommandGroup>
                                        {libraries && libraries.length === 0 && (
                                            <Link
                                                className={`underline text-sky-700`}
                                                to={`/dashboard/library`}>
                                                还没有知识库, 创建一个
                                            </Link>
                                        )}
                                    </CommandList>
                                </Command>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <LuTableProperties className={`size-4`}/>
                        {/*<FcViewDetails/>*/}
                        <span>新建表格</span>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <LuClipboardPenLine className={`size-4`}/>
                        <span>新建画板</span>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <BsClipboardData className={`size-4`}/>
                        <span>新建数据表</span>
                    </div>
                    <Separator className={`m-2`}/>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <FcImport className={`size-4`}/>
                        <span>导入</span>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default StarCardNewDocumentItem;