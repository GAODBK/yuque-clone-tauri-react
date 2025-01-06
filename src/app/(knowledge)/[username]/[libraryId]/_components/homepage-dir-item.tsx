// src/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir-item.tsx

import {Note} from "@prisma/client";
import {Link} from 'react-router-dom';

const HomepageDirItem = ({notes, level = 0}: {
    notes: Note[]
    level?: number
}) => {
    return (
        <div className="tree w-full">
            {notes && notes.length > 0 && notes.map((item) => (
                <div key={item.id} className={"tree-item" + ` pt-2 px-${level + 4}`}>
                    <Link to={`/malred/${item.libraryId}/${item.id}`} className={`underline w-full`}>
                        <span className="tree-item-name">
                            {item.name}
                        </span>
                    </Link>
                    {/*@ts-ignore*/}
                    {item.childrenNote && (
                        <HomepageDirItem
                            // @ts-ignore
                            notes={item.childrenNote}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomepageDirItem;