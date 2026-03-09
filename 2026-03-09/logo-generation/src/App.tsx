import type { Component } from "solid-js"
import image from "/image.svg?url"
import bg from "/bg-1.jpg?url"

const App: Component = () => {
    return (
        <>
            <main class="w-125 h-125 relative">
                <img class="rounded-full rotate-75" src={bg} alt="No image available" />
                <img class="scale-70 absolute top-0 left-0" src={image} alt="No image available" />
            </main>
        </>
    )
}

export default App
