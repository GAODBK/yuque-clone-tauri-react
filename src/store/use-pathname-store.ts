// src/store/use-pathname-store.ts
import {create} from 'zustand'

interface PathnameStore {
    pathname: string | null;
    setPathname: (pathname: string | null) => void
}

// 状态管理, 可以在任何地方访问
export const usePathnameStore = create<PathnameStore>((set) => ({
    pathname: null,
    setPathname: (pathname) => set({pathname}),
}))