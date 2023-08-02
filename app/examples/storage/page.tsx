"use client"

import { useState } from "react";
import Back from "@/app/components/back";

export default function Storage() {

    const [text, setText] = useState("")
    const [storedText, setStoredText] = useState(localStorage.getItem('widget_example_text') || "")

    function setLocalStorage(event: any) {
        event.preventDefault();
        localStorage.setItem('widget_example_text', text);

        // Automatically update the text displayed when the user changes localStorage
        setStoredText(localStorage.getItem('widget_example_text') || "");
    }

    return (
        <>
            <Back />
            <p className="mt-4">{"Using localStorage, a widget can access data across any of the user's chats."}</p>
            <p className="mt-4">This is useful if you want the user to add their own information, such as preferences and API keys.</p>

            { storedText &&
                <p className="mt-4">Current value: { storedText }</p>
            }

            <form onSubmit={setLocalStorage}>
                <input className="block border border-black p-2 w-3/4 text-black" value={text} onChange={(event) => setText(event.target.value)} placeholder="Enter text" />
                <button className="mt-2 bg-black text-white p-2 border border-black hover:bg-white hover:text-black">Set localStorage</button>
            </form>
        </>
    )
}