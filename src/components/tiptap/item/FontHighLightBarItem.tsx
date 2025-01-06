// src/components/tiptap/item/FontHighLightBarItem.tsx

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {HighlighterIcon} from "lucide-react";
import {CirclePicker, SketchPicker} from 'react-color'
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/hooks/use-editor-store";

const FontHighLightBarItem = ({size = 'base'}) => {
    const {editor} = useEditorStore()
    if (!editor) return null

    const value = editor?.getAttributes('highlight').color || '#FFFFFF'

    // @ts-ignore
    const onChange = (color) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run()
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            size === 'base' && 'h-9 min-w-9',
                            size === 'md' && 'h-7 min-w-7',
                            size === 'sm' && 'h-6 min-w-6',
                            size === 'xs' && 'h-5 min-w-5',
                            'shrink-0 flex flex-col items-center justify-center rounded-sm ',
                            'hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                        )}
                    >
                        <HighlighterIcon className={'size-4'}/>
                        <div className={
                            size === 'base' ? 'h-1' : 'h-0.5' +
                                ' w-full'
                        } style={{backgroundColor: value}}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'p-0'}>
                    <SketchPicker
                        color={value}
                        onChange={onChange}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default FontHighLightBarItem;