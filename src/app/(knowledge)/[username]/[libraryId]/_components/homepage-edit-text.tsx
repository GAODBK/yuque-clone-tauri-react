// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-edit-text.tsx
'use client';

import {Library} from "@prisma/client";
import {RichTextEditor, Link} from '@mantine/tiptap';
import {BubbleMenu, EditorContent, FloatingMenu, useEditor} from '@tiptap/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import '@mantine/core/styles.css';
import {TiptapExtensions} from "@/lib/constants";
import EmojiPickerBarItem from "@/components/tiptap/item/EmojiPickerBarItem";

const HomepageEditText = ({text, setText}: {
    text: string
    setText: Function
}) => {

    const editor = useEditor({
        // @ts-ignore
        extensions: [
            ...TiptapExtensions
        ],
        content: text,
        onUpdate({editor}) {
            setText(editor.getHTML())
        },
    });

    if (!editor) {
        return null
    }

    return (
        <div className={`mx-4 h-full prose-lg rounded-md p-2 border`}>
            <RichTextEditor className={`h-full`} editor={editor}>
                {editor && (
                    <BubbleMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold/>
                            <RichTextEditor.Italic/>
                            <RichTextEditor.Link/>
                        </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}
                {editor && (
                    <FloatingMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1/>
                            <RichTextEditor.H2/>
                            <RichTextEditor.H3/>
                            <RichTextEditor.H4/>
                            <RichTextEditor.BulletList/>
                            <RichTextEditor.OrderedList/>
                        </RichTextEditor.ControlsGroup>
                    </FloatingMenu>
                )}

                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup className={`flex items-center`}>
                        <Select>
                            <SelectTrigger className="h-8 border-none shadow-none">
                                {editor.isActive('heading', {level: 1}) && 'H1'}
                                {editor.isActive('heading', {level: 2}) && 'H2'}
                                {editor.isActive('heading', {level: 3}) && 'H3'}
                                {editor.isActive('heading', {level: 4}) && 'H4'}
                                {!editor.isActive('heading') && `正文`}
                            </SelectTrigger>
                            <SelectContent>
                                <RichTextEditor.H1/>
                                <RichTextEditor.H2/>
                                <RichTextEditor.H3/>
                                <RichTextEditor.H4/>
                            </SelectContent>
                        </Select>
                        <RichTextEditor.Bold/>
                        <RichTextEditor.Italic/>
                        <RichTextEditor.Underline/>
                        <RichTextEditor.Strikethrough/>
                        <RichTextEditor.ClearFormatting/>
                        <RichTextEditor.Highlight/>
                        <RichTextEditor.Code/>
                        <RichTextEditor.Control
                            aria-label="Insert emoji"
                            title="Insert emoji"
                        >
                            <EmojiPickerBarItem/>
                        </RichTextEditor.Control>
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content/>
            </RichTextEditor>
        </div>
    );
};

export default HomepageEditText;