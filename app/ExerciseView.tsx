'use client'

import { useState, useRef, useEffect } from "react";

type TestResult = {
    args: number[];
    expected: number;
    actual: number;
    passed: boolean;
};

type ExerciseViewProps = {
    title: string;
    statement: string;
    starterCode: string;
    hints: string[];
    tests: { args: number[]; expected: number }[];
};

export default function ExerciseView({ title, statement, starterCode, hints, tests }: ExerciseViewProps) {
    const [code, setCode] = useState(starterCode);
    const [hintsShown, setHintsShown] = useState(0);
    const [results, setResults] = useState<TestResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.data.success) {
                setResults(event.data.results);
                setError(null);
            } else {
                setError(event.data.error);
                setResults(null);
            }
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    function handleClick() {
        iframeRef.current?.contentWindow?.postMessage({ userCode: code, tests }, "*");
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

                <div className="flex flex-col gap-2 w-full">
                    <button
                        className="rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 w-fit"
                        onClick={handleClick}
                    >
                        Vérifier
                    </button>

                    {results && (
                        <ul className="text-sm">
                            {results.map((r, index) => (
                                <li key={index} className={r.passed ? "text-green-600" : "text-red-600"}>
                                    sum({r.args.join(", ")}) = {r.actual} {r.passed ? "✓" : `(attendu ${r.expected})`}
                                </li>
                            ))}
                        </ul>
                    )}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    {hints.slice(0, hintsShown).map((hint, index) => (
                        <p key={index} className="text-sm text-zinc-500">{hint}</p>
                    ))}
                    {hintsShown < hints.length && (
                        <button className="text-sm underline" onClick={() => setHintsShown(hintsShown + 1)}>
                            Afficher un indice
                        </button>
                    )}
                </div>

                <iframe ref={iframeRef} src="/sandbox.html" sandbox="allow-scripts" style={{ display: "none" }} />
            </main>
        </div>
    );
}
