// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/outline-button.tsx
'use client';
import React, {useState} from 'react';
import {CiBoxList} from "react-icons/ci";

const OutlineButton = ({outline}: { outline: string }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className={`sticky h-12 top-0 right-0`}>
                <CiBoxList
                    onClick={() => {
                        setShow(!show)
                    }}
                    className={`absolute hover:bg-slate-300/30 size-8 right-4 top-20
                                cursor-pointer p-1 rounded-md`}
                />
            </div>
            {show && <div className={`sticky right-0 top-4 h-full min-w-[14vw] max-w-[20vw] prose`}
                          dangerouslySetInnerHTML={{__html: outline}}
            />}
        </>
    );
};

export default OutlineButton;