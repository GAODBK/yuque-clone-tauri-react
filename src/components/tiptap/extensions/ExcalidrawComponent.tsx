// src/components/tiptap/extensions/ExcalidrawComponent.tsx
"use client";
import { Excalidraw   } from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/index.css";

import {NodeViewWrapper, NodeViewContent} from "@tiptap/react";

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
            <label>Excalidraw</label>

            <NodeViewContent className="content">
                {/*<div className="content">*/}
                <Excalidraw/>
                {/*</div>*/}
            </NodeViewContent>
        </NodeViewWrapper>
    );
}