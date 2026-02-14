import Image from "../images/react-logo.png"

export default function Navbar() {
    return (
        <header>
            <nav>
                <img src={Image} alt="React logo" />
                <span>ReactFacts</span>
            </nav>
        </header>
    )
}
