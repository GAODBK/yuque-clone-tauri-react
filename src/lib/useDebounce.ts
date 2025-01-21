// src/lib/useDebounce.ts
// lib/useDebounce.ts

import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    // 输入时 -> clearTimeout -> useEffect
    useEffect(() => {
        // 输入时 -> 创建定时器
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        // 下一次触发effect时, 清除上一个定时器
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay]);
    // 只有在停止输入后, timeout才真正创建, 而不是一直被clear
    // 停止输入delay秒后, 触发更新value

    return debouncedValue
}