// src/app/(knowledge)/[username]/[libraryId]/_components/edit-homepage.tsx

import { useState } from 'react';
import { BsJournalBookmark } from "react-icons/bs";
import HomepageUpdateButtons from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-update-buttons";
import HomepageEditText from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-edit-text";
// import { Library } from "@prisma/client";
import { Library } from "@/lib/types";

const EditHomepage = ({ library }: { library: Library }) => {
    // @ts-ignore
    const [showDir, setShowDir] = useState(library.showDir === 'false' ? false : true)
    const [text, setText] = useState(library.text)

    return (
        <>
            <div className={`flex p-8 justify-between items-center`}>
                <div className={`flex gap-x-2 items-center`}>
                    <BsJournalBookmark className={`text-blue-500 size-8`} />
                    <text className={`font-bold text-2xl`}>{library?.name}</text>
                </div>
                <div className={`flex items-center gap-x-2`}>
                    <HomepageUpdateButtons
                        {...library}
                        // library={library}
                        showDir={showDir}
                        text={text}
                        setShowDir={setShowDir}
                    />
                </div>
            </div>
            <div className={`h-full p-4 w-full`}>
                <HomepageEditText
                    {...library}
                    name={library.name}
                    text={text}
                    setText={setText}
                />
            </div>
        </>
    );
};

export default EditHomepage;