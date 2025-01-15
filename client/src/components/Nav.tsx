'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

    
function Nav() {

    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("");
    const [value, setValue] = useState<any[]>([]);
    const [answer, setAnswer] = useState("")

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
        <div>
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

        </div>
    )
}

export default Nav