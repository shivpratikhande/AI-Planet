'use client'

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, File, Send } from 'lucide-react';
import Image from "next/image";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TextAnimation } from "./textAnimation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("");
    const [value, setValue] = useState<any[]>([]);
    const [chatMessages, setChatMessages] = useState<{ question: string; answer: string }[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    /* auto scroll down prob dont work ig */
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    /* handling the file change */
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            const selectedFile = e.target.files[0];

            if (!selectedFile) {
                setResponseMessage("Please select a file.");
                return;
            }

            setUploading(true);

            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                const response = await axios.post("http://localhost:8000/upload-pdf", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setResponseMessage(`File uploaded successfully: ${response.data.filename}`);
            } catch (error) {
                setResponseMessage("Error uploading file.");
                console.error("Error uploading file:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    /* for submitting */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedOption) {
            setResponseMessage("Please select a file.");
            return;
        }

        setChatMessages((prev) => [
            ...prev,
            { question: message, answer: "" },
        ]);

        setUploading(true);
        setMessage("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/interact-pdf/", {
                filename: selectedOption,
                question: message,
            });

            setChatMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = {
                    question: message,
                    answer: response.data.answer,
                };
                return updatedMessages;
            });
        } catch (error) {
            console.error("Error asking question:", error);
        } finally {
            setUploading(false);
        }
    };
    /* handling the pdf list */
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/list-pdfs/");
            setValue(response.data.files);
        };
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="flex items-center justify-between border-b py-2 px-4 sm:px-16">
                <div className="flex items-center gap-2">
                    <Image
                        src="/image.png"
                        alt="logo"
                        width={105}
                        height={41}
                        className="h-auto w-auto"
                        quality={100}
                        priority={true}
                    />
                </div>
                <div className=" flex gap-2">
                    {/* file select dropdown */}
                    <Select onValueChange={setSelectedOption}  >
                        <SelectTrigger className="w-[150px]  flex items-center gap-2">

                            <div className=" border border-emerald-300 border-spacing-6 p-1 rounded-md">
                                <File className="text-emerald-500 w-5 h-5 " />

                            </div>


                            <SelectValue placeholder="planet.pdf" className=" texteme5" />
                        </SelectTrigger>
                        <SelectContent>
                            {value.map((item: any) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button className=" hidden sm:flex gap-2 font-semibold bg-white text-black shadow-none border-black p-2 px-7 border  justify-center items-center relative">
                        <CirclePlus className="w-5 h-5" />
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            onChange={handleFileChange}
                        />
                        Upload PDF
                    </Button>

                    {/* responsive */}
                    <Button className=" sm:hidden gap-2 font-semibold bg-white text-black shadow-none border-black p-3  border flex justify-center items-center relative">
                        <CirclePlus className="w-5 h-5" />
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {/* auth */}
                    {/*        <div className=" hidden sm:block  pl-2">
                        <SignedOut>
                            <div className=" bg-black text-white p-1 px-3 rounded-md hover:scale-105 transform duration-300">
                                <SignInButton />

                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div> */}

                </div>
            </header>

            <div className="flex-1 overflow-auto p-4">
                <div className="mx-auto max-w-[1208px] font-inter space-y-4 h-96 my-3 mb-16 flex flex-col gap-6 " ref={chatContainerRef}>

                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500 p-5">
                            S
                        </div>
                        <div className="rounded-lg px-4 py-2">
                            <p>Explain like I'm 5</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full" style={{ width: "42px", height: "42px" }}>
                            <Image
                                src="/image2.png"
                                alt="logo"
                                width={42}
                                height={42}
                                quality={100}
                                priority={true}
                                className="object-cover"
                            />
                        </div>

                        <div className="rounded-lg px-4 py-2 flex-1 min-h-[48px]">
                            <p>
                                Our own Large Language Model (LLM) is a type of AI that can learn from data. We have trained it on 7 billion
                                parameters, making it better than other LLMs.
                            </p>
                        </div>
                    </div>

                    {/* dynamic msg */}
                    {chatMessages.map((item, index) => (
                        <div key={index} className="flex flex-col gap-6">

                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500 p-5">
                                    S
                                </div>
                                <div className="rounded-lg px-4 py-2">
                                    <p>{item.question}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center rounded-full" style={{ width: "42px", height: "42px" }}>
                                    <Image
                                        src="/image2.png"
                                        alt="logo"
                                        width={42}
                                        height={42}
                                        quality={100}
                                        priority={true}
                                        className="object-cover"
                                    />
                                </div>

                                {/* animated input */}
                                <div className="rounded-lg px-4 py-2 flex-1 min-h-[48px]">
                                    <h1>
                                        {item.answer ? (
                                            <TextAnimation words={item.answer} />
                                        ) : (
                                            <p className="animate-pulse">Loading...</p>
                                        )}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* handling msg input */}
            <div className=" p-4">
                <div className="mx-auto max-w-[1200px]">
                    <form onSubmit={handleSubmit} className="relative">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Send a message..."
                            className="pr-10 p-6 shadow-lg"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute  right-7 top-1/2 -translate-y-1/2 "
                            variant="ghost"
                            disabled={uploading}
                        >
                            <Send className="h-4 w-4 rotate-45 " />
                        </Button>
                    </form>
                    <div className="mt-4">
                        {uploading}
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
