const input = document.getElementById("input") as HTMLInputElement
const btn = document.getElementById("btn") as HTMLButtonElement

const length = document.getElementById("length") as HTMLParagraphElement
const volume = document.getElementById("volume") as HTMLParagraphElement
const mass = document.getElementById("mass") as HTMLParagraphElement

const format = {
    length: (input: string | number, feet: string | number, meters: string | number) =>
        `${input} meters = ${feet} feet | ${input} feet = ${meters} meters`,
    volume: (input: string | number, gallons: string | number, liters: string | number) =>
        `${input} liters = ${gallons} gallons | ${input} gallons = ${liters} liters`,
    mass: (input: string | number, pounds: string | number, kilos: string | number) =>
        `${input} kilos = ${pounds} pounds | ${input} pounds = ${kilos} kilos`
}

if (!btn) throw new Error("Button not found")

btn.addEventListener("click", () => {
    const inputValue = Number((input as HTMLInputElement).value)

    const feet = (inputValue * 3.281).toFixed(3)
    const meters = (inputValue / 3.281).toFixed(3)
    length.textContent = format.length(inputValue, feet, meters)

    const gallons = (inputValue * 0.264).toFixed(3)
    const liters = (inputValue / 0.264).toFixed(3)
    volume.textContent = format.volume(inputValue, gallons, liters)

    const pounds = (inputValue * 2.204).toFixed(3)
    const kilos = (inputValue / 2.204).toFixed(3)
    mass.textContent = format.mass(inputValue, pounds, kilos)
})

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
