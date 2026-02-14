import { Facebook, Github, Instagram, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#161619] flex justify-center gap-6 py-5 px-9 rounded-2xl">
            <a href="#">
                <Twitter color="#918E9B" className="w-7 h-7" />
            </a>
            <a href="#">
                <Facebook color="#918E9B" className="w-7 h-7" />
            </a>
            <a href="#">
                <Instagram color="#918E9B" className="w-7 h-7" />
            </a>
            <a href="#">
                <Github color="#918E9B" className="w-7 h-7" />
            </a>
        </footer>
    )
}
