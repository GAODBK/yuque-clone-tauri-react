// src/components/tiptap/item/FontSizeBarItem.tsx
import  {useState} from 'react';
import {MinusIcon, PlusIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/hooks/use-editor-store";

const FontSizeBarItem = ({size = 'base'}) => {
    const {editor} = useEditorStore()

    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor?.getAttributes('textStyle').fontSize.replace("px", '')
        : '16'

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    // @ts-ignore
    const updateFontSize = (newSize) => {
        const size = parseInt(newSize)
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    // @ts-ignore
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }

    // @ts-ignore
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString())
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0)
            updateFontSize(newSize.toString())
    }

    return (
        <div className={'px-0.5 flex items-center gap-x-0.5'}>
            <button
                onClick={decrement}
                className={cn(
                    size === "base" && 'h-7 w-10',
                    size === "sm" && 'h-5 w-5',
                    ' shrink-0 flex flex-col items-center',
                    ' justify-center rounded-sm hover:bg-neutral-200/80 '
                )}
            >
                <MinusIcon className={'size-4'}/>
            </button>
            {isEditing ? (
                <input
                    type={'text'}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        size === "base" && 'h-7 w-10',
                        size === "sm" && 'h-6 w-6',
                        'text-sm shrink-0 text-center ',
                        'border border-neutral-400 rounded-sm bg-transparent',
                        'focus:outline-none focus:ring-0'
                    )}
                />) : (
                <button
                    onClick={() => {
                        setIsEditing(true)
                        setFontSize(currentFontSize)
                    }}
                    className={cn(
                        size === "base" && 'h-7 w-10',
                        size === "sm" && 'h-6 w-6',
                        ' leading-3 text-sm shrink-0 text-center ',
                        'border border-neutral-400 rounded-sm hover:bg-neutral-200/80'
                    )}
                >{currentFontSize}</button>
            )}
            <button
                onClick={increment}
                className={cn(
                    size === "base" && 'h-7 w-10',
                    size === "sm" && 'h-5 w-5',
                    ' shrink-0 flex flex-col items-center',
                    ' justify-center rounded-sm hover:bg-neutral-200/80 '
                )}
            >
                <PlusIcon className={'size-4'}/>
            </button>
        </div>
    )
};

export default FontSizeBarItem;