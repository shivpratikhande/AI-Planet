"use client";
import { TextGenerateEffect } from "../components/ui/textGen";



export function TextAnimation({words}: {words: string}) {
  return <TextGenerateEffect words={words} />;
}
