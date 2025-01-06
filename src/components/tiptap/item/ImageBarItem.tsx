// src/components/tiptap/item/ImageBarItem.tsx
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem} from "@/components/ui/dropdown-menu";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

import {useState} from "react";
import {ImageIcon, SearchIcon, UploadIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/hooks/use-editor-store";
import {useSlugStore} from "@/hooks/use-slug-store";
import {API_BASE_PATH} from "@/lib/constants.ts";

const ImageButton = ({}) => {
    const {editor} = useEditorStore()
    const {slug} = useSlugStore()
    // if (!editor) return null

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("")

    // 总的插入img方法
    // @ts-ignore
    const onChange = (src) => {
        editor?.chain().focus().setImage({src}).run()
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = 'file'
        input.accept = 'image/*'

        input.onchange = async (e) => {
            // @ts-ignore
            const file = (e.target).files?.[0]
            if (file) {
                // 本地url
                // const imageUrl = URL.createObjectURL(file);
                // onChange(imageUrl)

                const formData = new FormData();
                formData.append('file', file);
                if (slug) formData.append('slug', slug)

                try {
                    const response = await fetch(`${API_BASE_PATH}/api/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    if (response.ok) {
                        // editor.chain().focus().setImage({
                        //     src: data.url,
                        //     class: 'tiptap-img'
                        // }).run();
                        // 是否加上前缀?
                        onChange(API_BASE_PATH + data.url)
                    } else {
                        console.error('Upload failed:', data.error);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }

        input.click()
    }

    // dialog里的button用
    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl)
            setImageUrl('')
            setIsDialogOpen(false)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm ',
                            'hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                        )}
                    >
                        <ImageIcon className={'size-4'}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className={'size-4 mr-2'}/>
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className={'size-4 mr-2'}/>
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isDialogOpen} onOpenChange={setIsDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder={'Insert image URL'}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleImageUrlSubmit()
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ImageButton