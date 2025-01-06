// src/components/tiptap/extensions/DrawioComponent.tsx

import {NodeViewWrapper, NodeViewContent} from '@tiptap/react'
import {DrawIoEmbed} from 'react-drawio';

// @ts-ignore
export default props => {
    // @ts-ignore
    const increase = () => {
        props.updateAttributes({
            // count: props.node.attrs.count + 1,
        })
    }

    return (
        <NodeViewWrapper className="react-component">
            <label>Drawio</label>

            <NodeViewContent className="content">
                {/*<div className="content">*/}
                    <DrawIoEmbed/>
                {/*</div>*/}
            </NodeViewContent>
        </NodeViewWrapper>
    )
}