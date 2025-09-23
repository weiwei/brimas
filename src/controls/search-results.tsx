import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

const calcOpacity = (freq: number) => {
  if (freq >= 100) {
    return "opacity-100";
  } else if (freq >= 1) {
    return "opacity-80";
  } else if (freq >= 0.01) {
    return "opacity-60";
  } else if (freq > 0) {
    return "opacity-40";
  } else {
    return "opacity-25";
  }
};

export interface Word {
  word: string;
  freq: number;
  nsyl: number;
}

interface Props {
  words: Record<number, Word[]>
}

export const SearchResult = (props: Props) => {
  const {words} = props;
  const freq_keys = Object.keys(words);

  return (
  <>
    {freq_keys.length > 0 && <Separator className="mt-5 mb-5" />}
    {freq_keys.map((k) => {
          return (
            <div key={k}>
              <h4 className="h4">
                <div className="flex">
                  <Button variant="ghost" size="icon" className="w-6 h-6 mr-2"><ChevronUpIcon /></Button>
                  {k} Syllable{Number(k) > 1 && "s"}:
                </div>
              </h4>
              <ul className="flex flex-wrap">
                {words[k].map((w: Word) => (
                  <li
                    key={w.word}
                    className={`m-1 p-1 bg-gray-600 ${calcOpacity(
                      w.freq
                    )} text-white`}
                  >
                    <a href={`https://dle.rae.es/${w.word}`}>{w.word}</a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
  </>)
}