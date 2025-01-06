// src/components/tiptap/item/VideoBarItem.tsx
import {useState} from 'react';
import {useEditorStore} from "@/hooks/use-editor-store";
import {SearchIcon, UploadIcon, VideoIcon} from "lucide-react";
import {useSlugStore} from "@/hooks/use-slug-store";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn, uploadVideo} from "@/lib/utils";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const VideoBarItem = () => {
    const {slug} = useSlugStore()
    const {editor} = useEditorStore()
    // if (!editor) return null


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("")

    // 总的插入img方法
    // @ts-ignore
    const onChange = (src) => {
        editor?.chain().focus().insertContent(`
    <video src="${src}" controls style="width: 100%;" muted></video>
        `).run();
    }

    // dialog里的button用
    const handleImageUrlSubmit = () => {
        if (videoUrl) {
            onChange(videoUrl)
            setVideoUrl('')
            setIsDialogOpen(false)
        }
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = 'file';
        input.accept = 'video/*'; // 允许选择视频文件

        input.onchange = async (e) => {
            // @ts-ignore
            const file = e.target.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                if (slug) formData.append('slug', slug);

                try {
                    await uploadVideo(formData, onChange)
                } catch (error) {
                    console.error('Error uploading video:', error);
                }
            }
        }

        input.click();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            'h-7 min-w-7',
                            // 'h-9 min-w-9',
                            ' shrink-0 flex flex-col items-center justify-center rounded-sm ',
                            'hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                        )}
                    >
                        <VideoIcon className={'size-4'}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className={'size-4 mr-2'}/>
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className={'size-4 mr-2'}/>
                        Paste video url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isDialogOpen} onOpenChange={setIsDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert video URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder={'Insert video URL'}
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
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
    );
};

export default VideoBarItem;