// src/components/tiptap/extensions/DrawioExtension.ts

import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import Component from './DrawioComponent'

export default Node.create({
    name: 'drawioComponent',

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
                tag: 'drawio-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['drawio-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component, { contentDOMElementTag: "div" })
    },
})