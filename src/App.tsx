import { useState } from 'react'
import './App.css'
import type z from 'zod';
import { SearchResult, type Word } from '@/controls/search-results';
import { SearchForm } from '@/controls/search-form';
import { Separator } from '@/components/ui/separator';
import type { formSchema } from './utils';

const SERVER_URL = "https://rimer.fly.dev";
// const DEV_URL = "http://localhost:8000";

const sortByNsyl = (data: Word[]) => {
  const result: Record<number, Word[]> = {};
  for (const i of data) {
    const k = i.nsyl;
    if (!Object.keys(result).includes(k.toString())) {
      result[k] = [];
    }
    result[k].push(i);
  }
  return result;
};

const cRhyme = async (
  word: string,
  freq: number,
  nsyl: number,
  yeismo: boolean,
  seseo: boolean,
  eqbv: boolean
) => {
  const res = await fetch(
    `${SERVER_URL}/api/c/${word}?freq=${freq}&nsyl=${nsyl}&yeismo=${yeismo}&seseo=${seseo}&bv=${eqbv}`
  );
  const data = await res.json();
  return sortByNsyl(data.contents);
};

const aRhyme = async (word: string, freq: number, nsyl: number) => {
  const res = await fetch(
    `${SERVER_URL}/api/a/${word}?freq=${freq}&nsyl=${nsyl}`
  );
  const data = await res.json();
  return sortByNsyl(data.contents);
};

function App() {
  const [words, setWords] = useState<Record<number, Word[]>>({});

  const fetchWords = async (v: z.infer<typeof formSchema>) => {
    const data = await (v.rhymingType === "consonant"
      ? cRhyme(v.wordToSearch, v.wordFrequency, v.syllableCount, v.isYeismo, v.isSeseo, v.isEqBV)
      : aRhyme(v.wordToSearch, v.wordFrequency, v.syllableCount));
    setWords(data);
  };

  return (
    <div className="flex justify-center">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", maxWidth: "800px" }} className="p-4">
        <h1 className="text-2xl text-center m-4">Search for rhyming words in Spanish</h1>
        <SearchForm onClickSearch={fetchWords} />
        <SearchResult words={words}/>
        <Separator className="mt-5 mb-5"/>
      </div>

    </div>
  );
}

export default App
