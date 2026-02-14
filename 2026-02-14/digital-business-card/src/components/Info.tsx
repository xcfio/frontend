import { Linkedin, Mail } from "lucide-react"

export default function Info() {
    return (
        <section className="flex flex-col text-center gap-4 px-9">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-black">Laura Smith</h1>
                <p className="text-sm font-normal text-[#F3BF99]">Frontend Developer</p>
                <p className="text-xs font-normal">laura.website</p>
            </div>
            <div className="flex justify-between text-sm">
                <button className="text-gray-700 bg-white font-semibold flex items-center gap-2 py-2 px-4 rounded-md">
                    <Mail size={14} />
                    <span>Email</span>
                </button>
                <button className="bg-[#5093E2] font-semibold flex items-center gap-2 py-2 px-4 rounded-md">
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                </button>
            </div>
        </section>
    )
}
