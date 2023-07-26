"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useEffect, useState } from "react";
import { RoomEvent } from "@beeper/matrix-widget-toolkit-api";
import Back from "@/app/components/back";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Reactions() {
    const [reactions, setReactions] = useState<RoomEvent<any>[]>([])
    const widgetApi = useWidgetApi();

    async function fetchData() {
        let reactionsResponse: RoomEvent<any>[] = await widgetApi.receiveRoomEvents('m.reaction', { limit: 20 });
        setReactions(reactionsResponse);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <Back />
            <SyntaxHighlighter language="json">
                {JSON.stringify(reactions, null, 4)}
            </SyntaxHighlighter>
        </>
    )
}