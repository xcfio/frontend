import { letter } from "./letters.js"

const btn = document.getElementById("btn")
const p1 = document.getElementById("p1")
const p2 = document.getElementById("p2")

function characters(length) {
    return Array(length)
        .fill(0)
        .map(() => Math.round(Math.random() * letter.length))
        .map((x) => letter[x])
        .join("")
}

btn.addEventListener("click", () => {
    p1.style.backgroundColor = "#273549"
    p2.style.backgroundColor = "#273549"
    p1.textContent = characters(15)
    p2.textContent = characters(15)
})

p1.addEventListener("click", () => {
    navigator.clipboard.writeText(p1.textContent)
    p1.style.backgroundColor = "#374151"
})

p2.addEventListener("click", () => {
    navigator.clipboard.writeText(p2.textContent)
    p2.style.backgroundColor = "#374151"
})

