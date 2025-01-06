// src/app/(dashboard)/dashboard/library/_components/libraray-list-toggle-view.tsx

import {AiOutlineAppstore} from "react-icons/ai";
import {Separator} from "@/components/ui/separator";
import {MdFormatListBulleted} from "react-icons/md";
import {Link} from 'react-router-dom';

const LibraryListToggleView = ({view}: { view: string }) => {
    return (
        <>
            <Link to={`/dashboard/library?view=group`}
                  className={` inline-flex items-center justify-center 
                                  whitespace-nowrap rounded-md px-3 py-1 text-sm 
                                  font-medium ring-offset-background transition-all
                                   focus-visible:outline-none focus-visible:ring-2 
                                   focus-visible:ring-ring focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50
                                     data-[state=active]:bg-background 
                                     data-[state=active]:text-foreground
                                      data-[state=active]:shadow ${view !== 'list' && `bg-gray-300/30`}`
                  }>
                <AiOutlineAppstore className={`size-5`}/>
            </Link>
            <Separator orientation={'vertical'} className={`mx-2`}/>
            <Link to={`/dashboard/library?view=list`}
                  className={` inline-flex items-center justify-center 
                                  whitespace-nowrap rounded-md px-3 py-1 text-sm 
                                  font-medium ring-offset-background transition-all
                                   focus-visible:outline-none focus-visible:ring-2 
                                   focus-visible:ring-ring focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50
                                     data-[state=active]:bg-background 
                                     data-[state=active]:text-foreground
                                      data-[state=active]:shadow ${view === 'list' && `bg-gray-300/30`}`
                  }>
                <MdFormatListBulleted className={`size-5`}/>
            </Link>
        </>
    );
};

export default LibraryListToggleView;