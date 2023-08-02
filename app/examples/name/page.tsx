"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useEffect, useState } from "react";
import { StateEvent } from "@beeper/matrix-widget-toolkit-api";
import Back from "@/app/components/back";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Name() {
    const [nameResponse, setNameResponse] = useState<StateEvent<any>[]>([])
    const [userInput, setUserInput] = useState("");
    const widgetApi = useWidgetApi();

    async function fetchData() {
        const response: StateEvent<any>[] = await widgetApi.receiveStateEvents('m.room.name');
        setNameResponse(response);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function setName(event: any) {
        event.preventDefault();

        setUserInput("");

        await widgetApi.sendStateEvent("m.room.name", {
            name: userInput
        });

        await fetchData();
    }

    return (
        <>
            <Back />
            {nameResponse.length && <p className="mt-4">Room name: {nameResponse[0].content.name}</p>}

            <form onSubmit={setName}>
                <input className="block border border-black p-2 w-3/4 text-black" value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder="Enter a name for the room" />
                <button className="block mt-2 bg-black text-white p-2 border border-black hover:bg-white hover:text-black">Set name</button>
            </form>

            <p className="mt-8">Raw data:</p>

            <SyntaxHighlighter language="json" className="mt-4">
                {JSON.stringify(nameResponse, null, 4)}
            </SyntaxHighlighter>
        </>
    )
}