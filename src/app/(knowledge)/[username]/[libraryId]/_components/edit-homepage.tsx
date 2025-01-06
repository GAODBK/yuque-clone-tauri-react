// src/app/(knowledge)/[username]/[libraryId]/_components/edit-homepage.tsx

import  {useState} from 'react';
import {BsJournalBookmark} from "react-icons/bs";
import HomepageUpdateButtons from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-update-buttons";
import HomepageEditText from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-edit-text";
import {Library} from "@prisma/client";

const EditHomepage = ({library}: { library: Library }) => {
    const [showDir, setShowDir] = useState(library.showDir)
    const [text, setText] = useState(library.text)

    return (
        <>
            <div className={`flex p-8 justify-between items-center`}>
                <div className={`flex gap-x-2 items-center`}>
                    <BsJournalBookmark className={`text-blue-500 size-8`}/>
                    <text className={`font-bold text-2xl`}>{library?.name}</text>
                </div>
                <div className={`flex items-center gap-x-2`}>
                    <HomepageUpdateButtons
                        id={library.id}
                        text={text}
                        showDir={showDir}
                        setShowDir={setShowDir}
                    />
                </div>
            </div>
            <div className={`h-full p-4 w-full`}>
                <HomepageEditText
                    text={text}
                    setText={setText}
                />
            </div>
        </>
    );
};

export default EditHomepage;