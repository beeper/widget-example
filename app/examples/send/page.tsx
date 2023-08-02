"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useState } from "react";
import Back from "@/app/components/back";

export default function Send() {
    const [message, setMessage] = useState("")
    const widgetApi = useWidgetApi()

    async function fetchData(event: any) {
        event.preventDefault();
        setMessage("");

        await widgetApi.sendRoomEvent('m.room.message', {
            msgtype: 'm.text',
            body: message,
        });
    }

    return (
        <>
            <Back />
            <form onSubmit={fetchData}>
                <input className="block border border-black p-2 w-3/4 text-black" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Enter message" />
                <button className="mt-2 bg-black text-white p-2 border border-black hover:bg-white hover:text-black">Send</button>
            </form>
        </>
    )
}