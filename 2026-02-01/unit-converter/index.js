const input = document.getElementById("input")
const btn = document.getElementById("btn")

const length = document.getElementById("length")
const volume = document.getElementById("volume")
const mass = document.getElementById("mass")

const format = {
    length: (input, feet, meters) => `${input} meters = ${feet} feet | ${input} feet = ${meters} meters`,
    volume: (input, gallons, liters) => `${input} liters = ${gallons} gallons | ${input} gallons = ${liters} liters`,
    mass: (input, pounds, kilos) => `${input} kilos = ${pounds} pounds | ${input} pounds = ${kilos} kilos`
}

btn.addEventListener("click", () => {
    const inputValue = Number(input.value)

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
