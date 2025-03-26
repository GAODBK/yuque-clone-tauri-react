import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import hljs from "highlight.js";
import katex from "katex";
import { API_BASE_PATH } from "@/lib/constants.ts";
// import { db } from "./db";
// import { Note } from "./types";
//import {fetch} from "@tauri-apps/plugin-http";
// import { exists, BaseDirectory } from '@tauri-apps/plugin-fs';
// when using `"withGlobalTauri": true`, you may use
// const { exists, BaseDirectory } = window.__TAURI__.fs;


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateImage(editor: Editor, url: string) {
    editor.chain().focus().setImage({
        src: url
    }).run();
}

export function generateImageAPI(prompt: string) {
    return fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    })
}


// 黏贴图片
// @ts-ignore
export async function pasteImage(_event, editor: Editor, slug: string) {

    const clipboardItems = await navigator.clipboard.read()
    // const fileList: File[] = []
    // const urlList: string[] = []
    for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
            // 筛选图片类型的文件
            if (type.indexOf('image') > -1) {
                const blob = await clipboardItem.getType(type)
                // 将Blob转换成File
                const file = new File([blob], `image-${Date.now()}`, { type: type })
                // fileList.push(file)
                // 将Blob转换成url，方便前端展示预览图
                // const url = URL.createObjectURL(blob)
                // urlList.push(file)

                const formData = new FormData();
                formData.append('file', file);
                if (slug) formData.append('slug', slug);

                try {
                    const response = await fetch(`${API_BASE_PATH}/api/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    if (response.ok) {
                        // @ts-ignore
                        editor.chain().focus().setImage({
                            src: API_BASE_PATH + data.url,
                            // src: data.url,
                        }).run();
                    } else {
                        console.error('Upload failed:', data.error);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }
    }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const addFileLinkWrapper = (editor) => useCallback(() => {
    // const url = window.prompt('URL');
    // if (!url) return;
    // editor.chain().focus().setImage({src: url}).run();


    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    // fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
        // @ts-ignore
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/uploadFile', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    editor.chain().focus().extendMarkRange('link').setLink({
                        href: data.url,
                        class: 'tiptap-link'
                    }).run();
                } else {
                    console.error('Upload failed:', data.error);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    fileInput.click();
}, [editor]);

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const addImageWrapper = (editor, slug) => useCallback(() => {
    // console.log(slug)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
        // @ts-ignore
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            if (slug) formData.append('slug', slug);

            try {
                const response = await fetch(`${API_BASE_PATH}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    editor.chain().focus().setImage({
                        src: API_BASE_PATH + data.url,
                        // src: data.url,
                        class: 'tiptap-img'
                    }).run();
                } else {
                    console.error('Upload failed:', data.error);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    fileInput.click();
}, [editor]);

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const setLinkWrapper = (editor) => useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
        return
    }

    // empty
    if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()

        return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({
        href: url,
        // class: 'tiptap-link'
    })
        .run()
}, [editor])


// @ts-ignore
export const uploadVideo = async (formData, onChange) => {
    const response = await fetch(`${API_BASE_PATH}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        onChange(API_BASE_PATH + data.url)
    } else {
        console.error('Upload failed:', data.error);
    }
}

export function renderRichTextWithHighlight(richText: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(richText, 'text/html');

    const codeBlocks = doc.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const language = block.className.split('-')[1] || 'plaintext';
        const code = block.textContent;
        const highlighted = hljs.highlight(code!, { language }).value;
        block.innerHTML = highlighted;
    });

    return doc.body.innerHTML;
}

export function renderMathInText(text: string) {
    // 使用 DOMParser 解析 HTML 字符串
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // 查找所有具有 data-type="math" 的 span 标签
    const mathSpans = doc.querySelectorAll('span[data-type="math"]');

    mathSpans.forEach(span => {
        const latex = span.getAttribute('content');
        try {
            const html = katex.renderToString(latex!, {
                throwOnError: false
            });
            // 替换 span 的内容
            span.innerHTML = html;
        } catch (error) {
            console.error('Error rendering LaTeX:', error);
        }
    });

    // 返回处理后的 HTML 字符串
    return doc.body.innerHTML;
}

export async function generateOutline(richText: string) {
    // const dom = new JSDOM(richText);
    // const document = dom.window.document;
    //     // const parser = new DOMParser();
    //     // const document = parser.parseFromString(richText, 'text/html');
    //
    //     // 创建一个隐藏的div元素
    //     // var div = document.createElement('div');
    //     // var div = window.document.createElement('div');
    let div = document.createElement('div');
    div.style.display = 'none';
    //     // 将富文本内容插入到div中
    div.innerHTML = richText;
    //
    const titleTag = ["H1", "H2", "H3", "H4"];
    // @ts-ignore
    let titles = [];
    // @ts-ignore
    div.childNodes.forEach((e, index) => {
        if (titleTag.includes(e.nodeName)) {
            const id = "header-" + index;
            // @ts-ignore
            e.setAttribute("id", id);
            titles.push({
                id: id,
                // @ts-ignore
                title: e.innerHTML,
                level: Number(e.nodeName.substring(1, 2)),
                nodeName: e.nodeName
            });
        }
    });
    //     // console.log(div.innerHTML)
    // @ts-ignore
    const catalog = titles;
    //     // console.log(catalog);
    //
    //     // 原生JavaScript遍历
    // for (index in catalog) {
    const catalogStr = catalog.map((_, index) => {
        // document.getElementById('cataLog').innerHTML
        return "<li style='padding-left: "
            + (catalog[index].level * 22 - 22)
            + "px;'>"
            + "<a href='#"
            + catalog[index].id
            + "'>"
            + catalog[index].title + "</a>"
            + "</li>"
    }).join('')

    return ({
        full: `${catalogStr}<br/>${div.innerHTML}`,
        outline: catalogStr,
        rich: div.innerHTML,
    })
}