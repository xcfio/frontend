import { createEffect, createSignal } from "solid-js"

export default function App() {
    const [colors, setColors] = createSignal(["#1952B9", "#2267E3", "#4E86E9", "#7BA5F0", "#A8C4F5"])
    const [formData, setFromData] = createSignal<{
        color: string
        type:
            | "monochrome"
            | "monochrome-dark"
            | "monochrome-light"
            | "analogic"
            | "complement"
            | "analogic-complement"
            | "triad"
            | "quad"
    }>({ color: "#6495ed", type: "monochrome" })

    // prettier-ignore
    createEffect(() => {fetchColors()})

    async function fetchColors() {
        const ftc = await fetch(
            `https://www.thecolorapi.com/scheme?count=5&hex=${formData().color.slice(1)}&mode=${formData().type}`
        )
        const data = (await ftc.json()) as ColorAPIResponse
        setColors(data.colors.map((x) => x.hex.value))
    }

    return (
        <>
            <main class="w-138 h-138 mx-auto flex flex-col bg-[#1F2937] text-neutral-300">
                <form
                    class="flex justify-around items-center p-5 gap-4"
                    onSubmit={(data) => {
                        data.preventDefault()
                        setFromData(Object.fromEntries(new FormData(data.currentTarget)) as any)
                    }}
                >
                    <input
                        class="h-10 border-0.5 border-x-2 cursor-pointer border-gray-300 bg-gray-300 rounded-xs"
                        type="color"
                        name="color"
                        id="color"
                        value={formData().color}
                        required
                    />
                    <select
                        class="h-10 grow border rounded-md cursor-pointer bg-[#1F2937] p-2 pr-1 text-md"
                        id="type"
                        name="type"
                        value={formData().type}
                        required
                    >
                        <option value="" disabled>
                            Select a color scheme
                        </option>
                        <option value="monochrome">monochrome</option>
                        <option value="monochrome-dark">monochrome-dark</option>
                        <option value="monochrome-light">monochrome-light</option>
                        <option value="analogic">analogic</option>
                        <option value="complement">complement</option>
                        <option value="analogic-complement">analogic-complement</option>
                        <option value="triad">triad</option>
                        <option value="quad">quad</option>
                    </select>
                    <button
                        class="h-10 bg-[#3D4B60] text-white border-[#3D4B60] text-xs font-medium border rounded-md p-2 cursor-pointer text-md"
                        type="submit"
                    >
                        Get color scheme
                    </button>
                </form>
                <div class="grow flex justify-stretch gap-1 items-stretch" id="colors">
                    {colors().map((x) => (
                        <div
                            class="w-1/5 cursor-pointer"
                            style={{ "background-color": x }}
                            onClick={() => navigator.clipboard.writeText(x)}
                        ></div>
                    ))}
                </div>
                <div class="flex justify-around py-4 gap-1 text-xs font-medium" id="colors-text">
                    {colors().map((x) => (
                        <div>{x}</div>
                    ))}
                </div>
            </main>
        </>
    )
}

export interface ColorAPIResponse {
    mode: string
    count: string
    colors: Seed[]
    seed: Seed
    _links: ColorAPIResponseLinks
    _embedded: Embedded
}

export interface Embedded {}

export interface ColorAPIResponseLinks {
    self: string
    schemes: Schemes
}

export interface Schemes {
    monochrome: string
    "monochrome-dark": string
    "monochrome-light": string
    analogic: string
    complement: string
    "analogic-complement": string
    triad: string
    quad: string
}

export interface Seed {
    hex: Hex
    rgb: RGB
    hsl: Hsl
    hsv: Hsv
    name: Name
    cmyk: Cmyk
    XYZ: Xyz
    image: Image
    contrast: Contrast
    _links: SeedLinks
    _embedded: Embedded
}

export interface Xyz {
    fraction: XYZFraction
    value: string
    X: number
    Y: number
    Z: number
}

export interface XYZFraction {
    X: number
    Y: number
    Z: number
}

export interface SeedLinks {
    self: Self
}

export interface Self {
    href: string
}

export interface Cmyk {
    fraction: CmykFraction
    value: string
    c: number
    m: number
    y: number
    k: number
}

export interface CmykFraction {
    c: number
    m: number
    y: number
    k: number
}

export interface Contrast {
    value: string
}

export interface Hex {
    value: string
    clean: string
}

export interface Hsl {
    fraction: HslFraction
    h: number
    s: number
    l: number
    value: string
}

export interface HslFraction {
    h: number
    s: number
    l: number
}

export interface Hsv {
    fraction: HsvFraction
    value: string
    h: number
    s: number
    v: number
}

export interface HsvFraction {
    h: number
    s: number
    v: number
}

export interface Image {
    bare: string
    named: string
}

export interface Name {
    value: string
    closest_named_hex: string
    exact_match_name: boolean
    distance: number
}

export interface RGB {
    fraction: RGBFraction
    r: number
    g: number
    b: number
    value: string
}

export interface RGBFraction {
    r: number
    g: number
    b: number
}
