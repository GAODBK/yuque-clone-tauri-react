// src/components/tiptap/item/DrawioBarItem.tsx
'use client';
import React, {useState} from 'react';
import {useEditorStore} from "@/hooks/use-editor-store";
import {Toggle} from "@/components/ui/toggle";
import {cn} from "@/lib/utils";
import {Editor} from '@tiptap/react';

const DrawioBarItem = ({editor}: { editor: Editor }) => {

    return (
        <Toggle
            className={cn(
                'size-6 shrink-0 flex flex-col items-center justify-center rounded-sm ',
                'hover:bg-neutral-200/80 overflow-hidden text-sm'
            )}
            onClick={() => {
                editor?.chain().focus().insertContent(`
                       <drawio-component></drawio-component>
                `).run() // !!!要run才真的运行
            }}
        >
            <img
                alt={`drawio`}
                src={`/drawio-svgrepo-com.svg`}
                width={16}
                height={16}
            />
        </Toggle>
    );
};

export default DrawioBarItem;