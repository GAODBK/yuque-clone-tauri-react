// src/hooks/use-editor-store.ts
import {create} from 'zustand'
import {type Editor} from '@tiptap/react'

interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void
}

// 状态管理, 可以在任何地方访问
export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({editor}),
}))