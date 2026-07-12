'use client'

import { useState } from "react";

type ExerciseViewProps = {
    title: string;
    statement: string;
    starterCode: string;
};

export default function ExerciseView({ title, statement, starterCode }: ExerciseViewProps) {
    const [code, setCode] = useState(starterCode);
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        {title}
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        {statement}
                    </p>
                    <textarea
                        className="flex h-32 w-full resize-none rounded-lg border border-solid border-black/[.08] p-4 text-base transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                        placeholder="Écris ton code ici..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">

                    <button className="rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                        onClick={handleClick}>valider</button>
                    {isClicked && <p>Code vérifié !</p>}
                </div>
            </main>
        </div>
    );
}