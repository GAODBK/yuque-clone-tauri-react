// src/components/tiptap/item/FontColorBarItem.tsx
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {CirclePicker, SketchPicker} from 'react-color'
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/hooks/use-editor-store";

const FontColorBarItem = ({size = 'base'}) => {
    const {editor} = useEditorStore()
    if (!editor) return null

    const value = editor?.getAttributes('textStyle').color || '#000000';

    // @ts-ignore
    const onChange = (color) => {
        editor?.chain().focus().setColor(color.hex).run()
    }

    return (
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
                    <span className={'text-xs'}>A</span>
                    <div className={'h-0.5 w-full'} style={{backgroundColor: value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'p-0'}>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FontColorBarItem