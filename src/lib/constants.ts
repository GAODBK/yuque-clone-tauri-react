// src/lib/constants.ts
import {all, createLowlight} from "lowlight";

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

// import {StarterKit} from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {ReactNodeViewRenderer} from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Dropcursor from "@tiptap/extension-dropcursor";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {CharacterCount} from "@tiptap/extension-character-count";
import Focus from "@tiptap/extension-focus";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import {FontFamily} from "@tiptap/extension-font-family";
import ListKeymap from "@tiptap/extension-list-keymap";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from 'tiptap-extension-resize-image'
import Underline from "@tiptap/extension-underline";
import HardBreak from '@tiptap/extension-hard-break'
import CodeBlockComponent from "@/components/tiptap/extensions/CodeBlockComponent";
import Video from "@/components/tiptap/extensions/VideoNode";
import {MathNode} from "@/components/tiptap/extensions/MathNode";
import {LineHeightExtension} from "@/components/tiptap/extensions/line-height";
import {FontSizeExtension} from "@/components/tiptap/extensions/font-size";
// import GlobalDragHandle from 'tiptap-extension-global-drag-handle'

import DrawioExtension from '@/components/tiptap/extensions/DrawioExtension'
import ExcalidrawExtension from '@/components/tiptap/extensions/ExcalidrawExtension'

export const API_BASE_PATH = 'http://localhost:3000'

export const TiptapExtensions = [
    // 浏览器中可以拖动内容到其他位置, tauri中不行
    // StarterKit.configure({
    // Disable an included extension
    // history: true, // undo, redo
    // codeBlock: false,
    // code: false
    // gapcursor: true,
    // dropcursor: true,
    // heading: {
    //     levels: [1, 2, 3, 4]
    // }
    // }),
    // StarterKit,
    LineHeightExtension,
    FontSizeExtension,
    CodeBlockLowlight
        .extend({
            addNodeView() {
                // @ts-ignore
                return ReactNodeViewRenderer(CodeBlockComponent)
            },
        })
        .configure({lowlight}),
    // Heading.configure({
    //     levels: [1, 2, 3, 4]
    // }),
    Heading,
    HardBreak,
    Document,
    Underline,
    Paragraph,
    Dropcursor,
    Text,
    TextStyle,
    Color,
    CharacterCount.configure({
        mode: 'nodeSize',
    }),
    Focus.configure({
        className: 'has-focus',
        mode: 'all',
    }),
    Code,
    BulletList,
    ListItem,
    FontFamily,
    ListKeymap,
    // CodeBlock,
    Blockquote,
    HorizontalRule,
    Highlight.configure({
        // 适配色盘
        multicolor: true,
    }),
    // Highlight,
    Image.configure({
        allowBase64: true,
        // inline: true, // inline 不能resize, 不能拖动, 不能选中
    }),
    ImageResize,
    Table.configure({
        resizable: true,
        allowTableNodeSelection: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Text,
    TaskList,
    TaskItem.configure({
        nested: true,
        HTMLAttributes: {
            class: 'list-none',
        },
    }),
    Link.configure({
        HTMLAttributes: {
            class: 'underline cursor-pointer text-blue-400 tiptap-link',
        },
        // openOnClick: true,
        // 编辑器内点击不打开, 但是read页渲染后点击可以打开
        openOnClick: false,
        // linkOnPaste: true,
        autolink: true,
        defaultProtocol: 'https',
    }),
    Highlight.configure({multicolor: true}),
    Subscript,
    Superscript,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    // AudioNode,
    Video,
    MathNode,
    DrawioExtension,
    ExcalidrawExtension,
    // GlobalDragHandle
]


const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '5px',
};

const chatBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
};

const messageContainerStyle = {
    overflowY: 'auto',
    // marginBottom: '10px',
    marginBottom: '30px',
};

const msgStyle = {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
    maxWidth: '80%',
    wordWrap: 'break-word',
};

const inputStyle = {
    width: 'calc(100% - 80px)',
    padding: '8px',
    marginRight: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const sendButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};
export {buttonStyle, chatBoxStyle, msgStyle, sendButtonStyle, inputStyle, messageContainerStyle, TextStyle}

// @ts-ignore
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const getRandomColor = () => getRandomElement(colors)
const getRandomName = () => getRandomElement(names)

const getInitialUser = () => {
    return {
        name: getRandomName(),
        color: getRandomColor(),
    }
}
const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
    '#C3E2C2',
    '#EAECCC',
    '#AFC8AD',
    '#EEC759',
    '#9BB8CD',
    '#FF90BC',
    '#FFC0D9',
    '#DC8686',
    '#7ED7C1',
    '#F3EEEA',
    '#89B9AD',
    '#D0BFFF',
    '#FFF8C9',
    '#CBFFA9',
    '#9BABB8',
    '#E3F4F4',
]
const names = [
    'Lea Thompson',
    'Cyndi Lauper',
    'Tom Cruise',
    'Madonna',
    'Jerry Hall',
    'Joan Collins',
    'Winona Ryder',
    'Christina Applegate',
    'Alyssa Milano',
    'Molly Ringwald',
    'Ally Sheedy',
    'Debbie Harry',
    'Olivia Newton-John',
    'Elton John',
    'Michael J. Fox',
    'Axl Rose',
    'Emilio Estevez',
    'Ralph Macchio',
    'Rob Lowe',
    'Jennifer Grey',
    'Mickey Rourke',
    'John Cusack',
    'Matthew Broderick',
    'Justine Bateman',
    'Lisa Bonet',
]
export {colors, names, getRandomName, getRandomColor, getInitialUser, getRandomElement}
