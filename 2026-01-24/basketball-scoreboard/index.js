const homeElement = document.getElementById("home-score")
const guestElement = document.getElementById("guest-score")

let homeScore = 0
let guestScore = 0

/**
 * @param {number} score
 * @returns {void}
 */
function home(score) {
    homeScore += score
    homeElement.textContent = homeScore
}

/**
 * @param {number} score
 * @returns {void}
 */
function guest(score) {
    guestScore += score
    guestElement.textContent = guestScore
}
