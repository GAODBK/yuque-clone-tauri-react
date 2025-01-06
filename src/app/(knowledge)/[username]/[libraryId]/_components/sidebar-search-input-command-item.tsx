// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input-command-item.tsx

import {CommandItem} from "@/components/ui/command";
import {Note} from "@prisma/client";
import {Link} from 'react-router-dom';

const SidebarSearchInputCommandItem = ({notes, libraryId, level = 0}: {
    notes: Note[]
    level?: number
    libraryId: string
}) => {

    return (
        <>
            {notes && notes.length > 0 && notes.map((item) => (
                <>
                    {/*@ts-ignore*/}
                    {(item.childrenNote && item.childrenNote.length > 0) && (
                        <>
                            <CommandItem>
                                <Link to={`/malred/${libraryId}/${item.id}`}>
                                    {item.name}
                                </Link>
                            </CommandItem>
                            <SidebarSearchInputCommandItem
                                key={item.id}
                                libraryId={libraryId}
                                // @ts-ignore
                                notes={item.childrenNote}
                                level={level + 1}
                            />
                        </>
                    )}
                    {/*@ts-ignore*/}
                    {(!item.childrenNote || item.childrenNote.length === 0) && (
                        <CommandItem>
                            <Link to={`/malred/${libraryId}/${item.id}`}>
                                {item.name}
                            </Link>
                        </CommandItem>
                    )}
                </>
            ))}
        </>
    );
};

export default SidebarSearchInputCommandItem;