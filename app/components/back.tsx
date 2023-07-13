import Link from "next/link";

export default function Back() {
    return (
        <div className="block mt-4 mb-4">
            <Link href="/" className="border border-black p-2 hover:bg-black hover:text-white">Back to Home</Link>
        </div>
    )
}