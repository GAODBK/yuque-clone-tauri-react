// src/app/(ai)/chat.tsx
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import { PhotographIcon } from "@heroicons/react/solid";
import EmojiPicker from "emoji-picker-react";
import { Toggle } from "@/components/ui/toggle";
import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import { cn } from "@/lib/utils";

const AiChatPage = () => {

    const [messages, setMessages] = useState([
        // { type: 'sent', text: 'dfasfd' },
        // { type: 'response', text: 'event.data' },
    ]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    // 是否发送消息中
    const [senting, setSenting] = useState(false);

    /// img txt chat

    const [selectedFileBase64, setSelectedFileBase64] = useState(null)
    const [file, setFile] = useState(null);
    // 触发input传图片
    const filePickerRef = useRef(null)
    // image转base64
    // @ts-ignore
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader()
        reader.onload = (readerEvent) => {
            // console.log(readerEvent.target.result)
            // @ts-ignore
            setSelectedFileBase64(readerEvent.target.result)
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        } else {
            console.error('No file selected');
        }
    };

    /// img txt chat end

    /// ws
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/ask/knowledge`);
        // @ts-ignore
        setSocket(ws);

        ws.onmessage = (event) => {
            // @ts-ignore
            setMessages((prev) => [...prev, { type: 'response', text: event.data }]);
            setLoading(false); // 结束加载
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };
        return () => {
            ws.close();
        };
    }, []);


    const handleSend = async () => {
        // 发送信息
        if (socket && input) {
            let msg = input
            // 添加图片
            // if (file || selectedFileBase64)
            //     msg = `图片: ${selectedFileBase64}\nprompt: ${msg}`
            // else
            //     msg = `;\nprompt: ${msg}` 
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('prompt', input);
                setSenting(true)

                try {
                    const response = await fetch('http://localhost:8000/generate-caption/', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    setSenting(false)
                    if (response.ok) {
                        msg = (`${input}\n用户图片输入: ${JSON.stringify(data)}`);
                        setSenting(true)
                        // @ts-ignore
                        await socket.send(msg);
                        setSenting(false)
                    } else {
                        console.error('Upload failed:', data.error);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
            else {
                setSenting(true)
                // @ts-ignore
                await socket.send(msg);
                setSenting(false)
            }
            // @ts-ignore
            setMessages((prev) => [...prev, {
            // @ts-ignore
                type: 'sent', text: input,
                img: file && selectedFileBase64
            }]);
            setInput('');
            setLoading(true); // 开始加载
        }
    };

    // @ts-ignore
    /*const handleAreaChange = (newArea) => {
        setArea(newArea);
        setShowConfig(false);
    };*/
    /// ws end

    /// emoji

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // @ts-ignore
    const onEmojiClick = (emojiObject, event) => {
        if (event) event.stopPropagation(); // 阻止事件冒泡
        setInput(input + emojiObject.emoji)
        setShowEmojiPicker(false);
    };

    // @ts-ignore
    const toggleEmojiPicker = (event) => {
        if (event) event.stopPropagation(); // 阻止事件冒泡
        setShowEmojiPicker(!showEmojiPicker);
    };

    /// emoji

    return (
        <div className={`size-full justify-center flex flex-col gap-y-2 p-2`}>
            <div
                style={{
                    position: 'relative',
                    flex: 1,
                    padding: '20px',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #ddd',
                    marginTop: '50px',
                    width: '100%'
                }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
            // @ts-ignore
                        style={msg.type === 'sent' ?
                            {
                                justifyItems: 'end',
                                alignSelf: 'flex-end', 
                                maxWidth: '100%', 
                            } : {
                                justifyItems: 'start',
                                alignSelf: 'flex-start', 
                                padding: '10px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                maxWidth: '100%',
                            }}
                    >
                        <div
                        // @ts-ignore
                        style={msg.type === 'sent' ?
                            {
                                justifyItems: 'end',
                                alignSelf: 'flex-end',
                                // textAlign: 'right',
                                backgroundColor: '#0070f3',
                                color: '#fff',
                                padding: '10px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                maxWidth: '70%',
                                marginLeft: '30%',
                            } : {
                                justifyItems: 'start',
                                alignSelf: 'flex-start',
                                backgroundColor: '#e0e0e0',
                                padding: '10px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                maxWidth: '70%',
                            }}>
                            {/*@ts-ignore*/}
                            {msg.img && (
                                <img
                                    className={`max-w-[60vw]`}
                                    // @ts-ignore
                                    src={msg.img} alt="" />
                            )}
                            {/*@ts-ignore*/}
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && <div>Loading...</div>}
            </div>
            {file && selectedFileBase64 && (
                <div className={`relative`}>
                    <XIcon
                        onClick={() => {
                            setFile(null)
                            setSelectedFileBase64(null)
                        }}
                        className={`size-6 text-red-600 absolute cursor-pointer shadow-md 
                                shadow-white rounded-full`} />
                    {/*pulse闪烁动画*/}
                    <img className={`size-20 rounded-md ${loading && 'animate-pulse'}`}
                        src={selectedFileBase64}
                        alt="" />
                </div>
            )}
            {/*上传pdf文件*/}

            <div className={`flex w-full`}>
                {/*@ts-ignore*/}
                <div onClick={() => filePickerRef.current.click()}>
                    <PhotographIcon
                        className={`size-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100`} />
                    <input
                        accept={'image/*'}
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={handleFileChange}
                    />
                </div>
                <div className={'relative w-full'}>
                    {showEmojiPicker && (
                        <div style={{ left: '50', position: 'absolute', zIndex: 9999 }}
                        >
                            <EmojiPicker
                                className={'text-black'}
                                onEmojiClick={onEmojiClick} />
                        </div>
                    )}

                    <Toggle
                        className={cn('font-bold',
                            showEmojiPicker && 'bg-black rounded-lg p-2 text-white')}
                        onClick={toggleEmojiPicker}>
                        {showEmojiPicker ?
                            'Close' :
                            '😀'}
                    </Toggle>
                </div>
            </div>
            <Textarea
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSend()
                    }
                }}
                disabled={loading || senting}
                className={`w-full`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
        </div>
    );
};

export default AiChatPage;