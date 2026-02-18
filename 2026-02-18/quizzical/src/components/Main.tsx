import type { JSX, MouseEventHandler } from "react"

export function Main({ next }: { next: MouseEventHandler<HTMLButtonElement> }): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-3xl text-[#293264]">Quizzical</h1>
            <p className="text-base text-[#293264]">Test your knowledge with fun trivia questions!</p>
            <button onClick={next} className="bg-[#4D5B9E] text-white py-4 px-12 rounded-2xl mt-4">
                Start quiz
            </button>
        </div>
    )
}
