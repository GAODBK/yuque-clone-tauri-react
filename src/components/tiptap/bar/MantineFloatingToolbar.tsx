// src/components/tiptap/bar/MantineFloatingToolbar.tsx

import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import {FloatingMenu,} from "@tiptap/react";
import {RichTextEditor} from "@mantine/tiptap";
import EmojiPickerBarItem from "../item/EmojiPickerBarItem";
import MathButton from "../item/MathButton";
import VideoBarItem from "../item/VideoBarItem";
import ImageBarItem from "../item/ImageBarItem";
import TableBarItem from "../item/TableBarItem";

// @ts-ignore
export default function MantineFloatingToolbar({editor}) {
    if (!editor)
        return null

    return (
        <>
            {editor && (
                <FloatingMenu editor={editor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1/>
                        <RichTextEditor.H2/>
                        <RichTextEditor.H3/>
                        <RichTextEditor.H4/>

                        <RichTextEditor.Bold/>
                        <RichTextEditor.Italic/>
                        <RichTextEditor.Underline/>
                        <RichTextEditor.Strikethrough/>
                        <RichTextEditor.CodeBlock/>

                        <RichTextEditor.Blockquote/>
                        <RichTextEditor.Hr/>
                        <RichTextEditor.BulletList/>
                        <RichTextEditor.OrderedList/>

                        <RichTextEditor.Control>
                            <EmojiPickerBarItem/>
                        </RichTextEditor.Control>

                        <RichTextEditor.Control>
                            <ImageBarItem/>
                        </RichTextEditor.Control>
                        <RichTextEditor.Control>
                            <VideoBarItem/>
                        </RichTextEditor.Control>
                        <RichTextEditor.Control>
                            <TableBarItem/>
                        </RichTextEditor.Control>
                        <RichTextEditor.Control>
                            <MathButton editor={editor}/>
                        </RichTextEditor.Control>

                    </RichTextEditor.ControlsGroup>
                </FloatingMenu>
            )}
        </>
    )
}