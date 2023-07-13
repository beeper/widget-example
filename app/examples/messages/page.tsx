"use client"

import {useWidgetApi} from "@beeper/matrix-widget-toolkit-react";
import {useEffect, useState} from "react";
import {RoomEvent} from "@beeper/matrix-widget-toolkit-api";
import Back from "@/app/components/back";

export default function Messages() {
    const [messages, setMessages] = useState<RoomEvent<any>[]>([])
    const widgetApi = useWidgetApi();

    async function fetchData() {
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
        </>
    )
}