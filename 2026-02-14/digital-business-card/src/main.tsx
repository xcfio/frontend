import { createRoot } from "react-dom/client"
import Info from "./components/Info"
import About from "./components/About"
import Interests from "./components/Interests"
import Footer from "./components/Footer"
import Images from "./components/Images"

const root = createRoot(document.getElementById("root") as any)
root.render(
    <div className="bg-[#1A1B21] text-white w-80 mx-auto flex flex-col gap-8 rounded-2xl mt-10">
        <Images />
        <Info />
        <About />
        <Interests />
        <Footer />
    </div>
)
