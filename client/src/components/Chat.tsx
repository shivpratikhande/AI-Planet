'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import Image from "next/image";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Chat() {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("");
    const [value, setValue] = useState<any[]>([]);

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

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedOption) {
            setResponseMessage("Please select a file.");
            return;
        }
        try {
            await axios.post("http://127.0.0.1:8000/interact-pdf/", {
                fileName: selectedOption,
                question: message,
            });
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/list-pdfs/");
            setValue(response.data.files);
            console.log(response.data.files);
            console.log(value);
        };
        fetchData();
    }, []);

    console.log(selectedOption)

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                    <Image
                        src="/image.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="h-auto w-auto"
                        quality={100}
                        priority={true}
                    />
                </div>
                <div className=" flex gap-2">
                    <Select onValueChange={setSelectedOption}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {value.map((item: any) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            )
                            )}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>

                        <input
                            type="file"
                            className="bg-transparent opacity-0 w-3 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        Upload PDF

                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-auto p-4">
                <div className="mx-auto max-w-3xl space-y-4">
                    {/* Messages */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500">
                            S
                        </div>
                        <div className="rounded-lg bg-gray-100 px-4 py-2">
                            <p>Explain like I'm 5</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full p-5 bg-emerald-500">
                            {/* Bot icon */}
                        </div>
                        <div className="rounded-lg bg-gray-100 px-4 py-2">
                            <p>
                                Our own Large Language Model (LLM) is a type of AI that can learn from data. We have trained it on 7 billion
                                parameters, making it better than other LLMs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t p-4">
                <div className="mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit} className="relative">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Send a message..."
                            className="pr-10"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            variant="ghost"
                            disabled={uploading}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="mt-4">
                        {uploading && <p>Uploading file...</p>}
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
