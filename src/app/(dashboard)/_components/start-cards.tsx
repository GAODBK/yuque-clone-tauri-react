// src/app/(dashboard)/_components/start-hover-cards.tsx

import {LuBookPlus} from "react-icons/lu";
import StartCardNewKnowledgeLibrary from "@/app/(dashboard)/_components/start-card-new-knowledge-library";
import StartCardTemplateDialogContent from "@/app/(dashboard)/_components/start-card-template-dialog-content";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import StarCardNewDocumentItem from "@/app/(dashboard)/_components/star-card-new-document-item";


const StartCards = () => {

    return (
        <div className={`p-4 pt-2 flex items-center gap-x-4`}>
            <StarCardNewDocumentItem/>

            {/*新建知识库*/}
            <StartCardNewKnowledgeLibrary/>
            {/*模板中心*/}
            <Dialog>
                <DialogTrigger>
                    <div className={`w-[16vw] border rounded-md p-3`}>
                        <div className={`flex items-center gap-x-2`}>
                            <LuBookPlus className={`m-2 size-5`}/>
                            <div className={`flex flex-col items-start`}>
                                <span className={`text-sm font-semibold`}>模板中心</span>
                                <span className={`text-xs text-slate-400/80`}>
                                    从模板中获取灵感
                                </span>
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className={`w-screen`}>
                    <StartCardTemplateDialogContent/>
                </DialogContent>
            </Dialog>

            {/*AI帮你写*/}
            <div className={`w-[16vw] border rounded-md p-3`}>
                <div className={`flex items-center gap-x-2`}>
                    <LuBookPlus className={`m-2 size-5`}/>
                    <div className={`flex flex-col items-start`}>
                        <span className={`text-sm font-semibold`}>AI帮你写</span>
                        <span className={`text-xs text-slate-400/80`}>
                        AI 助手帮你一键生成文档
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartCards;