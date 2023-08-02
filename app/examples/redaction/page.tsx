"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useState } from "react";
import Back from "@/app/components/back";

export default function Redaction() {
    const [messageId, setMessageId] = useState("")
    const widgetApi = useWidgetApi()

    async function deleteMessage(event: any) {
        event.preventDefault();
        setMessageId("");

        await widgetApi.sendRoomEvent('m.room.redaction', {
            redacts: messageId // this is the eventId
        });

    }

    async function sendMessage(event: any) {
        event.preventDefault();

        const sendMessageResponse = await widgetApi.sendRoomEvent('m.room.message', {
            msgtype: 'm.text',
            body: "This message will be deleted",
        });

        setMessageId(sendMessageResponse.event_id);
    }

    return (
        <>
            <Back />
            <p>First, press the button to send a test message.</p>
            <button onClick={sendMessage} className="mt-2 bg-white text-black p-2 border border-black hover:bg-gray-100 block">Send a test message</button>
            <button className="mt-2 bg-black text-white p-2 border border-black hover:bg-white hover:text-black block disabled:opacity-50 disabled:cursor-not-allowed" onClick={deleteMessage} disabled={messageId === ""}>Delete that message</button>
        </>
    )
}