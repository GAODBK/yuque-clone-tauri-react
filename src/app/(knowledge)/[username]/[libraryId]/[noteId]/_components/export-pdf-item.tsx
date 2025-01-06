// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/export-pdf-item.tsx
'use client';

import {PDFDocument, rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Button} from "@/components/ui/button";
import {GrDocumentPdf} from "react-icons/gr";

const ExportPdfItem = ({title}: { title: string }) => {

    async function generatePDF() {
        // 获取 HTML 元素
        const element = window.document.getElementById('tiptap-content');

        // 使用 html2canvas 将 HTML 元素转换为图像
        const canvas = await html2canvas(element!);
        const imageData = canvas.toDataURL('image/png');

        // 创建一个新的 PDF 文档
        const pdfDoc = await PDFDocument.create();

        // 嵌入图像
        const image = await pdfDoc.embedPng(imageData);

        // 获取图像的尺寸
        const {width, height} = image.scale(1);

        // 添加一页
        const page = pdfDoc.addPage([width, height]);

        // 绘制图像到页面
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: width,
            height: height,
        });

        // 保存 PDF
        const pdfBytes = await pdfDoc.save();
        saveAs(new Blob([pdfBytes], {type: 'application/pdf'}), title + '.pdf');
    }


    return (
        <div onClick={generatePDF} className={`cursor-pointer flex flex-col items-center`}>
            <GrDocumentPdf className={`size-20`}/>
            <span>PDF</span>
            <span className={`text-sm text-gray-400`}>.pdf</span>
        </div>
    );
};

export default ExportPdfItem;