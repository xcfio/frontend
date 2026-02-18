import { useEffect, useRef, type Dispatch, type JSX, type MouseEventHandler, type SetStateAction } from "react"
import type { OpenTriviaResponse, Question } from "../lib/type"
import { decode } from "../lib/decode"

export function Questions({
    next,
    questions: [questions, setQuestions],
    chosen: [chosen, setChosen]
}: {
    next: MouseEventHandler<HTMLButtonElement>
    questions: [Question[] | undefined, Dispatch<SetStateAction<Question[] | undefined>>]
    chosen: [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>>]
}): JSX.Element {
    const hasFetched = useRef(false)
    questions = questions ?? []
    chosen = chosen ?? []

    // prettier-ignore
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true
            fetchQuestions()
        }
    }, [])

    function handleAnswerChange(questionIndex: number, selectedOption: string) {
        setChosen((prev) => {
            const updated = [...(prev ?? [])]
            updated[questionIndex] = selectedOption
            return updated
        })
    }

    async function fetchQuestions() {
        console.log("Fetching data")
        const ftc = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&encode=base64`)
        const data = (await ftc.json()) as OpenTriviaResponse

        const questions = data.results.map(({ question, correct_answer, incorrect_answers }) => ({
            question,
            correct_answer,
            incorrect_answers
        }))

        const purified: Array<Question> = questions.map((x) => {
            const allChoices = [...x.incorrect_answers.map(decode), decode(x.correct_answer)]
            const shuffled = allChoices.sort(() => Math.random() - 0.5)

            return {
                questions: decode(x.question),
                correct: decode(x.correct_answer),
                choices: shuffled
            }
        })

        setQuestions(purified)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 p-6 flex flex-col items-center">
            {questions.map((x, questionIndex) => {
                return (
                    <div key={questionIndex} className="space-y-3 self-start">
                        <p className="text-[#293264] font-bold text-lg leading-relaxed">{x.questions}</p>
                        <div className="flex gap-2 flex-wrap">
                            {x.choices.map((option) => (
                                <label key={option} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        value={option}
                                        checked={chosen[questionIndex] === option}
                                        onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <span
                                        className="inline-block px-4 py-2 rounded-full border border-[#293264] 
                                            text-[#293264] font-bold bg-white peer-checked:bg-[#D6DBF5]
                                            peer-checked:border-[#D6DBF5] transition-colors text-sm whitespace-nowrap"
                                    >
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            })}
            <button onClick={next} className="bg-[#4D5B9E] text-white py-4 px-12 rounded-2xl mt-4">
                Check answers
            </button>
        </div>
    )
}
