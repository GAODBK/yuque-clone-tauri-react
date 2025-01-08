// src/app/(knowledge)/[username]/[libraryId]/[noteId]/page.tsx

import 'katex/dist/katex.min.css';
import hljs from "highlight.js";

// import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml'; // HTML/XML
import css from 'highlight.js/lib/languages/css';
import markdown from 'highlight.js/lib/languages/markdown';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import shell from 'highlight.js/lib/languages/shell';
import r from 'highlight.js/lib/languages/r';
import perl from 'highlight.js/lib/languages/perl';

// 注册语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('php', php);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('r', r);
hljs.registerLanguage('perl', perl);

import {createLowlight, all} from 'lowlight'

// const lowlight = createLowlight(common)
const lowlight = createLowlight(all)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')
// you can also register individual languages
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

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
// import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import '@mantine/core/styles.css';
import './note.css'

const KnowledgeNotePage = () => {
    let params = useParams()
    let [searchParams, _set] = useSearchParams()

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
                                                __html: (rich)
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