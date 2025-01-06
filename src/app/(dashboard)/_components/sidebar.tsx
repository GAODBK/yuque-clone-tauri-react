// src/app/(dashboard)/_components/sidebar.tsx


import {GoChevronDown} from "react-icons/go";
import {HiOutlineBellAlert} from "react-icons/hi2";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {BsFillBoxFill } from "react-icons/bs";
import {Link} from 'react-router-dom';
import SidebarSearchInput from "@/app/(dashboard)/_components/sidebar-search-input";
import SidebarRoutes from "@/app/(dashboard)/_components/sidebar-routes";
import SidebarKnowledgeLibraryItem from "@/app/(dashboard)/_components/sidebar-knowledge-library-item";
import SidebarKnowledgeGroupItem from "@/app/(dashboard)/_components/sidebar-knowledge-group-item";

const Sidebar = () => {

    return (
        <div className={`bg-gray-200/20 h-full border-r flex flex-col overflow-y-auto shadow-sm`}>
            {/*header*/}
            <div className={`p-4 items-center flex justify-between`}>
                <div className={`flex items-center gap-x-2`}>
                    {/*logo*/}
                    <img
                        className={`rounded-md cursor-pointer`}
                        src={`/logo.png`}
                        alt={`logo`}
                        width={32}
                        height={32}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`flex items-center`}>
                                    <span className={`cursor-pointer text-font`}>Malog</span>
                                    <GoChevronDown className={`cursor-pointer size-5`}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className={`bg-white text-black`}>
                                <Command className="p-2 rounded-lg border shadow-md md:min-w-72">
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup heading="个人">
                                            <CommandItem>
                                                <Link
                                                    to={``}
                                                    className={`gap-x-2 flex items-center`}>
                                                    <Avatar className={`cursor-pointer rounded-full size-8`}>
                                                        <AvatarImage src={'/logo.png'}/>
                                                        <AvatarFallback>
                                                            {'malred'.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className={`flex flex-col justify-center`}>
                                                        <span>malred</span>
                                                        <span className={`text-xs`}>我自己</span>
                                                    </div>
                                                </Link>
                                            </CommandItem>
                                        </CommandGroup>
                                        <CommandSeparator/>
                                        <CommandGroup heading="空间">
                                            <CommandItem>
                                                <Link
                                                    to={`/`}
                                                    className={`gap-x-2 flex items-center`}>
                                                    <div className={`flex items-center justify-center 
                                                size-7 bg-sky-400 rounded-md`}>
                                                        <BsFillBoxFill className={`text-white cursor-pointer size-5`}/>
                                                    </div>
                                                    <div className={`flex flex-col justify-center`}>
                                                        <span>malred</span>
                                                        <span className={`text-xs`}>1 成员</span>
                                                    </div>
                                                </Link>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className={`flex gap-x-2 items-center`}>
                    <HiOutlineBellAlert className={`cursor-pointer size-5`}/>
                    <Avatar className={`cursor-pointer rounded-full size-7`}>
                        <AvatarImage src={'/logo.png'}/>
                        <AvatarFallback>
                            {'malred'.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div>
                {/*search-input*/}
                <SidebarSearchInput/>
            </div>
            <div className={`flex flex-col w-full py-4`}>
                <SidebarRoutes/>
            </div>
            <SidebarKnowledgeLibraryItem/>
            <div className={'w-full h-6'}/>
            <SidebarKnowledgeGroupItem/>
        </div>
    )
};

export default Sidebar;