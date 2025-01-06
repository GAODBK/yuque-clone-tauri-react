// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-md-item.tsx

import {IoLogoMarkdown} from "react-icons/io5";
import React, {useRef} from 'react';
import {saveAs} from 'file-saver';

import TurndownService from 'turndown';

export function convertHtmlToMarkdown(htmlContent: string) {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(htmlContent);
    return markdown;
}

export function saveMarkdownFile(content: string, fileName: string) {
    const blob = new Blob([content], {type: 'text/markdown;charset=utf-8'});
    saveAs(blob, fileName);
}

const ExportMdItem = ({content, title}: {
    content: string
    title: string
}) => {
    const exportToDoc = () => {
        // 将 HTML 转换为 MD 格式
        const markdownContent = convertHtmlToMarkdown(content)

        // 使用 file-saver 保存文件
        saveMarkdownFile(markdownContent, title + '.md');
    };

    return (
        <div onClick={exportToDoc}
             className={`cursor-pointer flex flex-col items-center`}>
            <IoLogoMarkdown className={`size-20`}/>
            <span>Markdown</span>
            <span className={`text-sm text-gray-400`}>.md</span>
        </div>
    );
};

export default ExportMdItem;