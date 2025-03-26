// src/app/(dashboard)/dashboard/library/_components/library-list.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ellipsis } from "lucide-react";
import { BsJournalBookmark } from "react-icons/bs";
import { Link } from 'react-router-dom';
import LibraryListNewIcons from "@/app/(dashboard)/dashboard/library/_components/library-list-new-icons";
import LibraryListToggleView from "@/app/(dashboard)/dashboard/library/_components/library-list-toggle-view";
// import {Library, Note} from "@/lib/types";
import { Library, Note } from "@/lib/types";
import { format } from "date-fns";
import LibraryListNewCardButton from "@/app/(dashboard)/dashboard/library/_components/library-list-new-card-button";
import { columns, Payment } from "@/app/(dashboard)/dashboard/library/_components/table/columns";
import { DataTable } from "@/app/(dashboard)/dashboard/library/_components/table/data-table";

// todo: 根据view渲染列表或分组card
const LibraryList = ({ view, libraries }: {
    view: 'group' | 'list'
    libraries: Library[]
}) => {

    function getData(): Payment[] {
        // @ts-ignore
        return libraries.map((l) => ({
            id: l.id,
            name: l.name,
            description: l.description,
            createdAt: format(l.createdAt, 'yyyy-MM-dd')
        }))
    }

    const data = getData()

    return (
        <div className={`px-4 py-3`}>
            <Tabs defaultValue="my" className="w-full">
                <div className={`flex justify-between pr-2`}>
                    <TabsList>
                        <TabsTrigger value="my">我个人的</TabsTrigger>
                        <TabsTrigger value="group">来自知识小组的</TabsTrigger>
                        <TabsTrigger value="invite">邀请协作的</TabsTrigger>
                    </TabsList>
                    <div className={`flex-1`} />
                    {view !== 'list' && <LibraryListNewIcons />}
                    {view === 'list' && <LibraryListNewCardButton />}
                    <TabsList>
                        <LibraryListToggleView view={view} />
                    </TabsList>
                </div>
                <TabsContent value="my" className={`my-6 w-full flex-wrap flex flex-row items-center gap-4`}>
                    {view !== 'list' && libraries && libraries.map(i => (
                        <div key={i.id}
                            className={`w-[32%] rounded-md h-44 border flex flex-col`}>
                            <Link
                                to={`/malred/${i.id}`}
                                className={`h-20 w-96 cursor-pointer group items-center 
                                            flex flex-row justify-between
                                            bg-white p-2 rounded-md`}>
                                <div className={`px-2 flex-1 flex flex-row items-center gap-x-2`}>
                                    <BsJournalBookmark className={`size-6`} />
                                    <div className={`flex flex-col justify-center`}>
                                        <span className={``}>
                                            {i.name}
                                        </span>
                                        <span className={`text-sm text-slate-600/60`}>
                                            {i.description}
                                        </span>
                                    </div>
                                </div>
                                <div className={`rounded-md p-1 hover:border`}>
                                    <Ellipsis
                                        className={`size-6 group-hover:block hidden`} />
                                </div>
                            </Link>
                            <ul className={`max-w-full mb-4 pl-5 pr-4 space-y-2`}>
                                {/*@ts-ignore*/}
                                {i.Note && i.Note.slice(0, 3).map((n: Note) => (
                                    <li key={n.id}
                                        className={`cursor-pointer list-disc mx-4`}>
                                        <Link to={`/malred/${i.id}/${n.id}`}>
                                            <div
                                                className={`
                                            flex justify-between hover:text-slate-600 text-sm text-slate-600/60
                                            `}>
                                                <span className={`
                                                max-w-[65%] truncate
                                                `}>{n.name}</span>
                                                <span>{format(n.createdAt, 'yyyy-MM-dd HH:mm')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {view === 'list' && <div className={`w-full`}>
                        <DataTable columns={columns} data={data} />
                    </div>}
                </TabsContent>
                {/*<TabsContent value="group">来自知识小组的</TabsContent>*/}
                {/*<TabsContent value="invite">邀请协作的</TabsContent>*/}
            </Tabs>
        </div>
    );
};

export default LibraryList;