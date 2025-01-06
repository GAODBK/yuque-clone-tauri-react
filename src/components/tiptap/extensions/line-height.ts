// src/components/tiptap/extensions/line-height.tsx
import {Extension} from "@tiptap/react";
import '@tiptap/extension-text-style'

// https://github.com/TheNaschkatze/tiptap-extension-font-size/blob/main/
// https://github.com/KID-1912/tiptap-extension-line-height/tree/master/
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        lingHeight: {
            setLineHeight: (lineHeight: string) => ReturnType
            unsetLineHeight: () => ReturnType
        }
    }
}

export const LineHeightExtension = Extension.create({
    name: 'lingHeight',
    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            defaultLineHeight: "normal"
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        renderHTML: attributes => {
                            if (!attributes.lineHeight) {
                                return {}
                            }

                            return {
                                style: `line-height: ${attributes.lineHeight}`
                            }
                        },
                        parseHTML: element =>
                            element.style.lineHeight || this.options.defaultLineHeight
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setLineHeight: (lineHeight: string) => ({tr, state, dispatch}) => {
                const {selection} = state
                tr = tr.setSelection(selection)

                const {from, to} = selection
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight
                        })
                    }
                })

                if (dispatch) dispatch(tr)
                return true
            },
            unsetLineHeight: () => ({tr, state, dispatch}) => {
                const {selection} = state
                tr = tr.setSelection(selection)

                const {from, to} = selection
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight: this.options.defaultLineHeight
                        })
                    }
                })

                if (dispatch) dispatch(tr)
                return true
            },
        }
    }
})