// src/components/tiptap/item/EmojiPickerBarItem.tsx


import EmojiPicker from "emoji-picker-react";
import {Toggle} from "@/components/ui/toggle";
import {useState} from "react";
import {useEditorStore} from "@/hooks/use-editor-store";
import {cn} from "@/lib/utils";

const EmojiPickerBarItem = () => {
    const {editor} = useEditorStore()
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // @ts-ignore
    const onEmojiClick = (emojiObject, event) => {
        if (event) event.stopPropagation(); // 阻止事件冒泡
        if (editor) {
            editor.chain().focus().insertContent(emojiObject.emoji).run();
        }
        setShowEmojiPicker(false);
    };

    // @ts-ignore
    const toggleEmojiPicker = (event) => {
        if (event) event.stopPropagation(); // 阻止事件冒泡
        setShowEmojiPicker(!showEmojiPicker);
    };

    return (
        <div className={'relative'}>
            {showEmojiPicker && (
                <div style={{right: '0', position: 'absolute', zIndex: 9999}}
                >
                    <EmojiPicker
                        className={'text-black'}
                        onEmojiClick={onEmojiClick}/>
                </div>
            )}

            <Toggle
                className={cn('font-bold',
                    showEmojiPicker && 'bg-black rounded-lg p-2 text-white')}
                onClick={toggleEmojiPicker}>
                {showEmojiPicker ? 'Close' : '😀'}
            </Toggle>
        </div>
    );
};

export default EmojiPickerBarItem;