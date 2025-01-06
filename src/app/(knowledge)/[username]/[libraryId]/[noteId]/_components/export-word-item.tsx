// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-word-item.tsx

import {saveAs} from 'file-saver';
// @ts-ignore
import htmlDocx from 'html-docx-js/dist/html-docx';
import {PiMicrosoftWordLogoFill} from "react-icons/pi";

const ExportWordItem = ({content, title}: {
    content: string
    title: string
}) => {
    const exportToDoc = () => {
        // 将 HTML 转换为 DOC 格式
        const docx = htmlDocx.asBlob(content);

        // 使用 file-saver 保存文件
        saveAs(docx, title + '.docx');
    };

    return (
        <div onClick={exportToDoc}
             className={`cursor-pointer flex flex-col items-center`}>
            <PiMicrosoftWordLogoFill className={`size-20`}/>
            <span>Word</span>
            <span className={`text-sm text-gray-400`}>.docx</span>
        </div>
    );
};

export default ExportWordItem;