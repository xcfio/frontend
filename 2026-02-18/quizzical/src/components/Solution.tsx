import type { Dispatch, JSX, MouseEvent, MouseEventHandler, SetStateAction } from "react"
import type { Question } from "../lib/type"

export function Solution({
    next,
    questions: [questions, setQuestions],
    chosen: [chosen, setChosen]
}: {
    next: MouseEventHandler<HTMLButtonElement>
    questions: [Question[] | undefined, Dispatch<SetStateAction<Question[] | undefined>>]
    chosen: [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>>]
}): JSX.Element {
    const questionList = questions ?? []
    const chosenList = chosen ?? []

    const correctCount = questionList.reduce((count, question, index) => {
        return chosenList[index] === question.correct ? count + 1 : count
    }, 0)

    function getOptionClass(option: string, questionIndex: number): string {
        const isCorrect = questionList[questionIndex].correct === option
        const isChosen = chosenList[questionIndex] === option

        if (isCorrect) {
            // Correct answer - green
            return "bg-[#94D7A2] border-[#94D7A2] text-[#293264]"
        }
        if (isChosen && !isCorrect) {
            // Wrong selected answer - red
            return "bg-[#F8BCBC] border-[#F8BCBC] text-[#293264]"
        }
        // Unselected wrong answer - faded
        return "bg-white border-[#293264] text-[#293264] opacity-50"
    }

    function preNext(event: MouseEvent<HTMLButtonElement>) {
        setQuestions([])
        setChosen([])
        next(event)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 p-6 flex flex-col items-center">
            {questionList.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-3 self-start">
                    <p className="text-[#293264] font-bold text-lg leading-relaxed">{question.questions}</p>
                    <div className="flex gap-2 flex-wrap">
                        {question.choices.map((option) => (
                            <span
                                key={option}
                                className={`inline-block px-4 py-2 rounded-full border font-bold text-sm whitespace-nowrap ${getOptionClass(option, questionIndex)}`}
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-6 mt-4">
                <p className="text-[#293264] font-bold">
                    You scored {correctCount}/{questionList.length} correct answers
                </p>
                <button onClick={preNext} className="bg-[#4D5B9E] text-white py-3 px-8 rounded-xl">
                    Play again
                </button>
            </div>
        </div>
    )
}
