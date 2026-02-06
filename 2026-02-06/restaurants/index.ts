import { menu } from "./menu.js"
const itemsSection = document.getElementById("items-section") as HTMLTableSectionElement
const orderSection = document.getElementById("order-section") as HTMLTableSectionElement
const modalSection = document.getElementById("modal-section") as HTMLTableSectionElement
const successSection = document.getElementById("success-section") as HTMLTableSectionElement

const orderList = document.getElementById("order-list") as HTMLDivElement
const orderPrice = document.getElementById("order-price") as HTMLParagraphElement
const payment = document.getElementById("pay") as HTMLFormElement
const successText = document.getElementById("success-text") as HTMLHeadingElement

const createItem = ({ emoji, id, ingredients, name, price }: (typeof menu)[number]) => `
    <div class="w-[550px] flex justify-between px-2 py-16 items-center border-b-gray-200 border-b-2">
        <div class="flex gap-4">
            <p class="text-8xl">${emoji}</p>
            <div class="flex flex-col gap-2">
                <div>
                    <h2 class="text-2xl font-bold">${name}</h2>
                    <p>${ingredients.join(", ")}</p>
                </div>
                <p class="font-bold">$${price}</p>
            </div>
        </div>
        <button
            class="text-4xl text-center font-thin border-1 border-gray-400 rounded-full py-[10px] px-[20px] cursor-pointer hover:shadow-[0px_0px_10px] hover:shadow-blue-400 transition-shadow duration-300"
            data-type="add"
            data-item="${id}"
        >
            +
        </button>
    </div>
`

const createOrder = ({ id, name, price }: Omit<(typeof menu)[number], "emoji" | "ingredients">) => `
    <div class="w-[550px] flex flex-row justify-between">
        <div class="flex gap-3 items-center justify-center">
            <h3>${name}</h3>
            <button
                class="text-2xl text-gray-400 cursor-pointer hover:text-shadow-[0px_0px_20px] hover:text-shadow-blue-600 hover:text-blue-600 transition-all duration-200"
                data-type="remove"
                data-item="${id}"
            >
                ×
            </button>
        </div>
        <p>$${price}</p>
    </div>
`

const items = []
const cart = new Set<number>()

for (const item of menu) items.push(createItem(item))
itemsSection.innerHTML = items.join("")

function renderOrder(data = cart) {
    const item = data
        .keys()
        .toArray()
        .map((x) => menu[x]!)

    const orders = item.map((x) => createOrder(x))
    if (orders.length) {
        const total = item.map((x) => x.price).reduce((x, y) => x + y)

        orderList.innerHTML = orders.join("")
        orderPrice.textContent = `$${total}`

        orderSection.classList.add("flex")
        orderSection.classList.remove("hidden")
    } else {
        orderSection.classList.add("hidden")
        orderSection.classList.remove("flex")
    }
}

orderSection.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const button = event.target
        if (button.id === "order-btn") {
            modalSection.classList.add("flex")
            modalSection.classList.remove("hidden")
        } else {
            cart.delete(Number(button.dataset.item))
            renderOrder()
        }
    }
})

itemsSection.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const button = event.target
        const items = menu.find((x) => button.dataset.item === x.id.toString())

        if (!items) throw new Error("Items not found")
        cart.add(menu.indexOf(items))
        renderOrder()
    }
})

payment.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = new FormData(payment).get("name")
    successText.textContent = `Thanks, ${name} Your order is on its way!`

    modalSection.classList.add("hidden")
    modalSection.classList.remove("flex")

    orderSection.classList.add("hidden")
    orderSection.classList.remove("flex")

    successSection.classList.add("flex")
    successSection.classList.remove("hidden")
})
