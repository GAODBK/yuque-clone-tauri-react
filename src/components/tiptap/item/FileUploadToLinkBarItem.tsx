// src/components/tiptap/item/FileUploadToLinkBarItem.tsx

import {Toggle} from "@/components/ui/toggle";
import {MdOutlineUploadFile} from "react-icons/md";
import {Editor} from "@tiptap/react";

const FileUploadToLinkBarItem = ({addFileLink, editor}: {
    editor: Editor
    addFileLink: Function
}) => {
    return (
        <Toggle>
            <button
                // @ts-ignore
                onClick={addFileLink}
                disabled={!editor}
                title={'上传文件'}
            >
                <MdOutlineUploadFile className={`size-4`}/>
            </button>
        </Toggle>
    );
};

export default FileUploadToLinkBarItem;