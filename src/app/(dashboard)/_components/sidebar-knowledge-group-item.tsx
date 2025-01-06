// src/app/(dashboard)/_components/sidebar-knowledge-group-item.tsx
'use client';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Link} from 'react-router-dom';
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const SidebarKnowledgeGroupItem = () => {
    const router = useNavigate()

    return (
        <div className={`px-2`}>
            <Accordion
                type="single" collapsible>
                <AccordionItem
                    onDoubleClick={() => router(`/`)}
                    value="item-1">
                    <AccordionTrigger
                        title={'双击进入知识小组首页'}
                        className={`py-3 hover:no-underline rounded-md bg-gray-200/40 px-4`}
                    >
                        <span>知识小组</span>
                    </AccordionTrigger>
                    <AccordionContent className={`py-2 px-2`}>
                        <div className={`flex flex-col`}>
                            <Link
                                to={``}
                                className={`cursor-pointer group items-center flex flex-row justify-between
                                                 hover:bg-slate-300/40 p-2 rounded-md`}>
                                <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                <div className={`flex-1 flex flex-row items-center gap-x-1`}>
                                    <BsJournalBookmark className={`size-5`}/>
                                    <span className={``}>
                                            知识小组1
                                        </span>
                                </div>
                                <Ellipsis className={`group-hover:block hidden`}/>
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default SidebarKnowledgeGroupItem;