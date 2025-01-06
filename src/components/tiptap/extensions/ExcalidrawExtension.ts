// src/components/tiptap/extensions/ExcalidrawExtension.ts

import {mergeAttributes, Node} from "@tiptap/core";
import {ReactNodeViewRenderer} from "@tiptap/react";
import Component from "@/components/tiptap/extensions/ExcalidrawComponent";

export default Node.create({
    name: 'excalidrawComponent',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            count: {
                default: 0,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'excalidraw-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['excalidraw-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component, { contentDOMElementTag: "div" })
    },
})