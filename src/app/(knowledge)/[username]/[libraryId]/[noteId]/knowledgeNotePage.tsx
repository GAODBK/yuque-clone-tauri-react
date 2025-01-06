// src/app/(knowledge)/[username]/[libraryId]/[noteId]/page.tsx

import NoteHomeHeader from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header";
import NoteAiChat from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-ai-chat";
import NoteEdit from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-edit";
import OutlineButton from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/outline-button";
import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import '@mantine/tiptap/styles.css';
import {useParams, useSearchParams} from "react-router-dom";
import {renderMathInText, renderRichTextWithHighlight} from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import {Note} from "@prisma/client";
import Layout from "@/app/(knowledge)/[username]/[libraryId]/layout.tsx";
import {API_BASE_PATH} from "@/lib/constants.ts";

const KnowledgeNotePage = () => {
    let params = useParams()
    let [searchParams,_set] = useSearchParams()

    const [note, setNote] = useState<Note | undefined>()
    const [data, setData] = useState()
    useEffect(() => {
        (async () => {
            const res = await fetch(
                `${API_BASE_PATH}/api/db/note/${params.noteId}`,
            )
            const json = await res.json()
            setNote(json.note)

            if (!json.note) return
            const richText = renderRichTextWithHighlight(renderMathInText(json.note.text || ''))
            const data = await fetch(`${API_BASE_PATH}/api/outline/generate`, {
                method: 'POST',
                body: JSON.stringify({
                    richText
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setData(await data.json())
        })()
    }, [searchParams]);
    if (!data || !note) return
    let {rich, outline} = data


    return (
        <Layout>
            <div className={`size-full flex`}>
                <div className={`size-full bg-white flex flex-col`}>
                    <NoteHomeHeader
                        libraryId={params.libraryId!}
                        id={note?.id!}
                        text={note?.text! || ''}
                        name={note?.name!}/>
                    <div className={`flex size-full`}>
                        {(searchParams.get('type') !== 'both' &&
                            searchParams.get('type') !== 'edit'
                        ) && <div className={`size-full flex-1 p-4`}>
                            {(!note?.name || note?.name === '无标题文档') ?
                                <h1 className={`mx-6 my-1 mb-2 text-4xl font-semibold`}>
                                    无标题文档
                                </h1> :
                                !note?.text && <h1 className={`mx-6 my-1 mb-2 text-4xl font-semibold`}>
                                    {note?.name}
                                </h1>
                            }
                            <div className={`px-6 py-2 w-full flex justify-between`}>
                                {note?.text &&
                                    <>
                                        <div
                                            id={`tiptap-content`}
                                            className={`p-12 prose-lg`}
                                            dangerouslySetInnerHTML={{
                                                __html: rich
                                            }}/>
                                        <div className={`flex-1`}/>
                                        <OutlineButton outline={outline}/>
                                    </>
                                }
                                {!note?.text && (
                                    <div className={`size-full`}>暂无内容</div>
                                )}
                            </div>
                        </div>}
                        {(searchParams.get('type') === 'both' ||
                                searchParams.get('type') === 'edit')
                            && <NoteEdit
                                libraryId={params.libraryId!}
                                note={note!}/>}
                    </div>
                </div>
                {(searchParams.get('type') === 'both' ||
                    searchParams.get('type') === 'ai-read') && <NoteAiChat
                    richText={note?.text || ''}
                    libraryId={params.libraryId!}
                    id={note?.id!}
                />}
            </div>
        </Layout>
    );
};

export default KnowledgeNotePage;