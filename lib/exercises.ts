import fs from "fs";
import path from "path";

export function loadExercise(exerciseName: string): { starterCode: string; hints: string[]; meta: any; statement: string; explanation: string; tests: any } {
    const starterCodePath = path.join(process.cwd(), "exercises", exerciseName, "starter.ts");
    const hintsPath = path.join(process.cwd(), "exercises", exerciseName, "hints.json");
    const metaPath = path.join(process.cwd(), "exercises", exerciseName, "meta.json");
    const statementPath = path.join(process.cwd(), "exercises", exerciseName, "statement.md");
    const explanationPath = path.join(process.cwd(), "exercises", exerciseName, "explanation.md");

    const starterCode = fs.readFileSync(starterCodePath, "utf-8");
    const hints = JSON.parse(fs.readFileSync(hintsPath, "utf-8"));
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    const testsPath = path.join(process.cwd(), "exercises", exerciseName, "tests.json");
    const tests = JSON.parse(fs.readFileSync(testsPath, "utf-8"));



    const statement = fs.readFileSync(statementPath, "utf-8");
    const explanation = fs.readFileSync(explanationPath, "utf-8");

    return { starterCode, hints, meta, statement, explanation, tests };
}