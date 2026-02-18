export type Question = {
    questions: string
    correct: string
    choices: Array<string>
}

export type OpenTriviaResponse = {
    response_code: number
    results: Result[]
}

export type Result = {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}
