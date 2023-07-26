"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useEffect, useState } from "react";
import { RoomEvent } from "@beeper/matrix-widget-toolkit-api";
import Back from "@/app/components/back";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Messages() {
    const [messages, setMessages] = useState<RoomEvent<any>[]>([])
    const widgetApi = useWidgetApi();

    async function fetchData() {
        // , roomIds: ["!wFOXJBgtfhaxtKduWk:beeper.com"]
        let messagesResponse: RoomEvent<any>[] = await widgetApi.receiveRoomEvents('m.room.message', { limit: 20 });
        setMessages(messagesResponse);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <Back />
            { messages.map((message) => {
                return (
                    <p key={message.event_id}>{`${message.sender}: ${message.content.body}`}</p>
                )
            })}
            <p className="text-bold text-lg mt-4">Raw Data</p>
            <SyntaxHighlighter language="json">
                {JSON.stringify(messages, null, 4)}
            </SyntaxHighlighter>
        </>
    )
}