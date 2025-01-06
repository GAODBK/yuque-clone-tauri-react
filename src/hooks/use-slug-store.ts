// src/hooks/use-slug-store.ts
import {create} from 'zustand'

interface SlugState {
    slug: string | null;
    setSlug: (slug: string | null) => void
}

// 状态管理, 可以在任何地方访问
export const useSlugStore = create<SlugState>((set) => ({
    slug: null,
    setSlug: (slug) => set({slug}),
}))

