// src/app/(knowledge)/[username]/[libraryId]/[noteId]/edit/page.tsx

import Header from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/_components/header";
import {format} from 'date-fns';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {cn, renderMathInText, renderRichTextWithHighlight} from "@/lib/utils";
import {NoteHistory} from "@prisma/client";
import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import {useEffect, useState} from "react";
import {API_BASE_PATH} from "@/lib/constants";

const NoteHistoryPage = () => {
    let [searchParams] = useSearchParams()
    let params = useParams()

    const [current, setCurrent] = useState<NoteHistory | undefined>()
    const [histories, setHistories] = useState<NoteHistory[]>([])
    useEffect(() => {
        (async () => {
            const res =
                await fetch(`${API_BASE_PATH}/api/db/noteHistory?noteId=${params.noteId}`)
            const json = await res.json()
            const histories = json.histories
            setHistories(histories)
            // 默认第一个
            setCurrent(histories[0])
            // 如果搜索参数指定了
            if (searchParams.get('h')) {
                setCurrent(histories.filter((h: NoteHistory) => h.id === searchParams.get('h'))[0])
            }
        })()
    }, [
        searchParams, params
    ])
    if (!current) return
    const __html = renderMathInText(renderRichTextWithHighlight(
        current ? current.text : ''
    ))


    return (
        <div className={`size-full`}>
            <Header history={current}/>
            <div className={`flex gap-x-2`}>
                {/*sidebar*/}
                <div className={`h-full py-4 min-h-[90vh] max-h-[90vh]
                 w-56 border-r overflow-y-auto fixed bg-white top-16`}>
                    {histories && histories.length > 0 && histories.map((h) => (
                        <div key={h.id}
                             className={cn(
                                 `text-center py-2 hover:bg-slate-300/30`,
                                 searchParams.get('h') === h.id && `bg-slate-300/30`
                             )}>
                            <Link to={`/malred/history/${params.libraryId}/${params.noteId}?h=${h.id}`}>
                                {format(h.createdAt, 'yyyy-MM-dd HH:mm')}
                            </Link>
                        </div>
                    ))}
                </div>
                {/*content*/}
                <div className={`py-16 ml-56 min-h-screen w-full flex justify-center bg-gray-300/30`}>
                    <div
                        className={`p-2 h-full rounded-md w-[58vw] bg-white prose-lg`}
                        dangerouslySetInnerHTML={{__html}}/>
                </div>
            </div>
        </div>
    );
};

export default NoteHistoryPage;