// src/components/tiptap/item/TableBarItem.tsx
import React, {useState} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Sheet} from "lucide-react";
import {useEditorStore} from "@/hooks/use-editor-store";

const TableBarItem = ({}) => {
    const {editor} = useEditorStore()
    // if (!editor) return null

    const [isOpen, setIsOpen] = useState(false);

    // @ts-ignore
    const handleButtonClick = (action) => {
        if (!editor) return;
        action();
        setIsOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    title={'表格'}
                    asChild>
                    <button
                        // className="p-2 bg-blue-500 text-white rounded-md"
                        className="px-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {/*表格操作*/}
                        <Sheet className={'size-4'}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2">
                    <DropdownMenuItem onClick={() =>
                        // @ts-ignore
                        handleButtonClick(() => editor.chain().focus().insertTable({
                            rows: 3,
                            cols: 3,
                            withHeaderRow: true
                        }).run())}>
                        插入表格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().addColumnBefore().run())}>
                        在前添加列
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().addColumnAfter().run())}>
                        在后添加列
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().deleteColumn().run())}>
                        删除列
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().addRowBefore().run())}>
                        在前添加行
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().addRowAfter().run())}>
                        在后添加行
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().deleteRow().run())}>
                        删除行
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().deleteTable().run())}>
                        删除表格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().mergeCells().run())}>
                        合并单元格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().splitCell().run())}>
                        拆分单元格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().toggleHeaderColumn().run())}>
                        切换标题列
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().toggleHeaderRow().run())}>
                        切换标题行
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().toggleHeaderCell().run())}>
                        切换标题单元格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().mergeOrSplit().run())}>
                        合并或拆分
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().setCellAttribute('colspan', 2).run())}>
                        设置单元格属性
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().fixTables().run())}>
                        修复表格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().goToNextCell().run())}>
                        前往下一个单元格
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleButtonClick(() =>
                            // @ts-ignore
                            editor.chain().focus().goToPreviousCell().run())}>
                        前往上一个单元格
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default TableBarItem;