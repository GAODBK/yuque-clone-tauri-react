// src/components/tiptap/extensions/VideoNode.tsx
import {Node, mergeAttributes} from '@tiptap/core'


// https://www.codemzy.com/blog/tiptap-video-embed-extension
const Video = Node.create({
    name: 'video', // unique name for the Node
    group: 'block', // belongs to the 'block' group of extensions
    selectable: true, // so we can select the video
    draggable: true, // so we can drag the video
    atom: true, // is a single unit

    addAttributes() {
        return {
            "src": {
                default: null
            },
            "autoplay": false
        }
    },

    parseHTML() {
        return [
            {
                tag: 'video',
// @ts-ignore
                getAttrs: node => ({
                    // Ensure autoplay is not set
                    autoplay: false,
                }),
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['video', mergeAttributes(
            HTMLAttributes, {
                autoplay: false, // Ensure autoplay is not set
            }
        )];
    },

    addNodeView() {
        return ({editor, node}) => {
            const div = document.createElement('div');
            div.className = 'flex items-center justify-center aspect-w-16 aspect-h-9' + (editor.isEditable ? ' cursor-pointer' : '');
            const iframe = document.createElement('iframe');
            // if (editor.isEditable) {
            // iframe.className = 'pointer-events-none';
            // }
            iframe.width = '640';
            iframe.height = '360';
            // @ts-ignore
            iframe.frameborder = "0";
            // @ts-ignore
            iframe.allowfullscreen = "";
            iframe.src = node.attrs.src;
            div.append(iframe);
            // const video = document.createElement('video');
            // if (editor.isEditable) {
            //     video.className = 'pointer-events-none';
            // }
            // video.width = '640';
            // video.height = '360';
            // video.frameborder = "0";
            // video.allowfullscreen = "";
            // video.src = node.attrs.src;
            // div.append(video);
            return {
                dom: div,
            }
        }
    },
});

export default Video