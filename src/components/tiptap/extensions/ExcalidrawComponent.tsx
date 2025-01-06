// src/components/tiptap/extensions/ExcalidrawComponent.tsx
"use client";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/index.css";

import {NodeViewWrapper, NodeViewContent} from "@tiptap/react";
import dynamic from "next/dynamic";
// import "@excalidraw/excalidraw/index.css"
// const Excalidraw = dynamic(
//     async () => (await import("@excalidraw/excalidraw")).Excalidraw,
//     {
//         ssr: false,
//     },
// );

// @ts-ignore
export default props => {
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