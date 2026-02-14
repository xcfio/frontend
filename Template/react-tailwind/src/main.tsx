import { createRoot } from "react-dom/client"
import { Info } from "lucide-react"

const root = createRoot(document.getElementById("root") as any)
root.render(
    <div className="flex gap-1">
        <Info />
        <h1 className="text-blue-500 inline-block pt-0.5">Hello world</h1>
    </div>
)
