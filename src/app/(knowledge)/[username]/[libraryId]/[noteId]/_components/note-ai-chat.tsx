// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-ai-chat.tsx

import ReactMarkdown from 'react-markdown';
import {useEffect, useRef, useState} from 'react';
import {XIcon} from "lucide-react";
import {Link, useSearchParams} from 'react-router-dom';
import {Textarea} from "@/components/ui/textarea";
import {useCompletion} from 'ai/react';
import {API_BASE_PATH, messageContainerStyle, msgStyle} from "@/lib/constants";

const NoteAiChat = ({libraryId, id, richText}: {
    libraryId: string
    id: string
    richText: string
}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const {complete, completion} = useCompletion({
        api: `${API_BASE_PATH}/api/chat`
    });

    const lastCompletion = useRef('');

    useEffect(() => {
        if (!completion) return;
        lastCompletion.current += completion.slice(lastCompletion.current.length);
    }, [completion]);

    const handleSendMessage = async () => {
        if (!input) return;
        insertMessage(input, 'user');
        // 分隔开 split('malredr43yr913hisdufvb93q4h93')
        await complete([input, richText].join('malredr43yr913hisdufvb93q4h93'));
        insertMessage(lastCompletion.current, 'assistant');
        lastCompletion.current = '';
        setInput('');
    };

    // @ts-ignore
    const insertMessage = (content, role) => {
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, {content, role}]);
    };

    let url = ``
    const [searchParams] = useSearchParams()
    if (searchParams.get('type') === 'both') {
        url = `/malred/${libraryId}/${id}?type=edit`
    } else {
        url = `/malred/${libraryId}/${id}`
    }

    return (
        <div
            className={`flex flex-col border-l w-[40%] sticky h-screen top-0 right-0`}>
            <Link to={url}>
                <XIcon
                    className={`absolute top-2 right-2`}/>
            </Link>
            <div className={`w-full py-4 border-b`}>
                <span className={`px-4 `}>
                语雀AI助手 • 阅读助手
                </span>
            </div>

            <div className={`p-2 flex-1 overflow-auto h-full`}
                // @ts-ignore
                 style={{
                     ...messageContainerStyle,
                 }}>
                {messages.map((msg, index) => (
                    <div key={index}
                         style={{
                             // @ts-ignore
                             textAlign: msg.role === 'user' ? 'right' : 'left',
                             marginBottom: '5px',
                         }}>
                        {/*@ts-ignore*/}
                        <strong>{msg.role}:</strong>
                        <div
                            // @ts-ignore
                            style={msgStyle}>
                            {/*@ts-ignore*/}
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>

            <Textarea
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        await handleSendMessage()
                    }
                }}
                placeholder={`向ai问答当前文档内容, 按enter发送`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};

export default NoteAiChat;