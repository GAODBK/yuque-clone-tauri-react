// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-edit-text.tsx

import '@mantine/core/styles.css';
import TipTap from "@/components/tiptap/TipTap.tsx";
// import * as Y from "yjs";
// import {IndexeddbPersistence} from "y-indexeddb";
// import {HocuspocusProvider} from "@hocuspocus/provider";
// import {useEditorStore} from "@/hooks/use-editor-store.ts";
import { updateLibrary } from '../actions/update-library';
import toast from 'react-hot-toast';

// const HomepageEditText = ({text, name, setText}: {
//     text: string
//     name: string
//     setText: Function
// }) => {

const HomepageEditText = ({ id, name, text, showDir, description, setText }: {
    id: number
    name: string
    text: string
    showDir: boolean
    description: string
    setText: Function
}) => {
    // const { id, name, text, showDir, description } = library

    /*const editor = useEditor({
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
    }*/

    // const {editor} = useEditorStore();

    // // 协作
    // const ydoc = new Y.Doc()
    // // Store the Y document in the browser 本地缓存, 再次连接到ws服务器时保存到服务器
    // // 实现第一次打开文档协作时同步旧数据
    // new IndexeddbPersistence(name!, ydoc)

    // // Set up the Hocuspocus WebSocket provider
    // // 协作websocket服务器 (local)
    // const provider = new HocuspocusProvider({
    //     url: 'ws://127.0.0.1:1234',
    //     document: ydoc,
    //     name,

    //     // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
    //     onSynced() {
    //         if (!editor) return

    //         if (!ydoc.getMap('config').get('initialContentLoaded') && editor) {
    //             ydoc.getMap('config').set('initialContentLoaded', true)

    //             // editor.commands.setContent('')
    //             editor.commands.setContent(text!)
    //         }
    //     },
    // })

    return (
        <div className={`mx-4 h-full prose-lg rounded-md p-2 border`}>
            {/*<RichTextEditor className={`h-full`} editor={editor}>
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
            </RichTextEditor>*/}
            <TipTap
                // provider={provider}
                onSubmit={async () => {
                    await updateLibrary({
                        id, name, text, showDir, description
                        // name, text
                    })
                    toast.success(`保存成功`)
                }}
                onSave={async () => {
                    await updateLibrary({
                        id, name, text, showDir, description
                        // name, text
                    })
                    toast.success(`自动保存成功`)
                }}
                slug={name}
                description={text}
                onChange={(richText) => {
                    console.log(richText);

                    setText(richText)
                }} />
        </div>
    );
};

export default HomepageEditText;