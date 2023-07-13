import Link from "next/link";

interface OptionProps {
    path: string;
    text: string;
}

export default function Option({ path, text }: OptionProps) {
    return (
        <Link href={ path } className="block p-4 border border-black mt-2 hover:bg-black hover:text-white">{ text }</Link>
    )
}