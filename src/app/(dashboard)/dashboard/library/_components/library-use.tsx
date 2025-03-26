// src/app/(dashboard)/dashboard/library/_components/library-use.tsx

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from 'react-router-dom';
import { Ellipsis, GripVertical } from "lucide-react";
import { BsJournalBookmark } from "react-icons/bs";
// import {Library} from "@/lib/types";
import { Library } from "@/lib/types";

const LibraryUse = ({ libraries }: { libraries: Library[] }) => {
    // console.log(libraries)

    return (
        <>
            <Accordion className={`bg-gray-300/20 px-4 rounded-md mr-2`} type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={`no-underline`}>
                        常用
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className={`w-full flex items-center flex-wrap gap-x-2 gap-y-4`}>
                            {libraries && libraries.map(i => (
                                <Link key={i.id}
                                    to={`/malred/${i.id}`}
                                    className={`w-[32%] h-16 cursor-pointer group items-center 
                                      flex flex-row justify-between bg-white hover:bg-slate-300/40
                                       p-2 rounded-md`}>
                                    <GripVertical className={`mr-1 size-4 group-hover:inline hidden`} />
                                    <div className={`mr-1 size-4 block group-hover:hidden`} />
                                    <div className={`flex-1 flex flex-row items-center gap-x-2`}>
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
                                    <Ellipsis className={`group-hover:block hidden`} />
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default LibraryUse;