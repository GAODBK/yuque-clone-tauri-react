// src/components/tiptap/extensions/CodeBlockComponent.ts

import './CodeBlockComponent.scss'

import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import React from 'react'

// @ts-ignore
export default function CodeBlockComponent({node: {attrs: {language: defaultLanguage}}, updateAttributes, extension}) {
    return (<NodeViewWrapper className="code-block">
            <select contentEditable={false} defaultValue={defaultLanguage}
                    onChange={event =>
                        updateAttributes({language: event.target.value})}>
                <option value="null">
                    auto
                </option>
                <option disabled>
                    —
                </option>
                {/*@ts-ignore*/}
                {extension.options.lowlight.listLanguages().map((lang, index) => (
                    <option key={index} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
            <pre  >
                <NodeViewContent as="code"/>
            </pre>
        </NodeViewWrapper>
    )
}