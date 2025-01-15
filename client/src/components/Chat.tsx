'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import Image from "next/image"

export default function Chat() {
    const [message, setMessage] = useState("")

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header */}
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
                    {/* <div className="h-8 w-8 rounded-full bg-emerald-500" />
                    <span className="font-medium">planet</span> */}
                </div>
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
                    Upload PDF
                </Button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-auto p-4">
                <div className="mx-auto max-w-3xl space-y-4">
                    {/* User Message */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500">
                            S
                        </div>
                        <div className="rounded-lg bg-gray-100 px-4 py-2">
                            <p>explain like im 5</p>
                        </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div className="rounded-lg bg-gray-100 px-4 py-2">
                            <p>
                                Our own Large Language Model (LLM) is a type of AI that can learn from data. We have trained it on 7 billion
                                parameters which makes it better than other LLMs. We are featured on aiplanet.com and work with leading
                                enterprises to help them use AI securely and privately. We have a Generative AI Stack which helps reduce the
                                hallucinations in LLMs and allows enterprises to use AI in their applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
                <div className="mx-auto max-w-3xl">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setMessage("")
                        }}
                        className="relative"
                    >
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
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

