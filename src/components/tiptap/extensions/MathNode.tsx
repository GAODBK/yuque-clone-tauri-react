// src/components/tiptap/extensions/MathNode.ts
import {Node, mergeAttributes} from '@tiptap/core';

import {ReactNodeViewRenderer, NodeViewWrapper} from '@tiptap/react';
import LatexRenderer from './LatexRenderer';

// @ts-ignore
const MathComponent = ({node}) => {
    return (
        <NodeViewWrapper as="span">
            <LatexRenderer formula={node.attrs.content}/>
        </NodeViewWrapper>
    );
};

export const MathNode = Node.create({
    name: 'math',

    group: 'inline',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            content: {
                default: '',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-type="math"]',
            },
        ];
    },

    renderHTML({HTMLAttributes}) {
        return ['span', mergeAttributes(HTMLAttributes, {'data-type': 'math', 'class': 'katex'})];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MathComponent);
    },

// @ts-ignore
    addCommands() {
        return {
// @ts-ignore
            setMath: (content) => ({commands}) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: {content},
                    class: 'center'
                });
            },
        };
    },
});