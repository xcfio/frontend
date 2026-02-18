import { useState, type JSX, type MouseEventHandler } from "react"
import { Base, Main, Questions, Solution } from "./components/export"
import type { Question } from "./lib/type"

export default function App(): JSX.Element {
    const [current, setNext] = useState<"main" | "questions" | "solution">("main")
    const questions = useState<Array<Question>>()
    const chosen = useState<Array<string>>()

    const next: MouseEventHandler<HTMLButtonElement> = () => {
        let next: "main" | "questions" | "solution"
        switch (current) {
            case "main": {
                next = "questions"
                break
            }
            case "questions": {
                next = "solution"
                break
            }
            case "solution": {
                next = "questions"
                break
            }
        }
        console.log(`Page Switch: ${current} -> ${next}`)
        setNext(next)
    }

    return (
        <Base>
            <main className="min-h-screen flex flex-col items-center justify-center">
                {current === "solution" ? (
                    <Solution {...{ next, questions, chosen }} />
                ) : current === "questions" ? (
                    <Questions {...{ next, questions, chosen }} />
                ) : (
                    <Main {...{ next }} />
                )}
            </main>
        </Base>
    )
}
