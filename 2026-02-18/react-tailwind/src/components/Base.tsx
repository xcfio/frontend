import type { JSX } from "react"

export function Base({ children }: { children: JSX.Element }): JSX.Element {
    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            {/* Top right yellow ellipse */}
            <div className="absolute -top-16 -right-16 w-74.25 h-58.75 bg-yellow-100 rounded-[50%]" />

            {/* Bottom left blue ellipse */}
            <div className="absolute -bottom-16 -left-16 w-74.25 h-58.75 bg-blue-100 rounded-[50%]" />

            {children}
        </div>
    )
}
