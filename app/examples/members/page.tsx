"use client"

import { useWidgetApi } from "@beeper/matrix-widget-toolkit-react";
import { useEffect, useState } from "react";
import { StateEvent } from "@beeper/matrix-widget-toolkit-api";
import Back from "@/app/components/back";

export default function Members() {
    const [users, setUsers] = useState<StateEvent<any>[]>([])
    const widgetApi = useWidgetApi();

    async function fetchData() {
        const userResponse: StateEvent<any>[] = await widgetApi.receiveStateEvents('m.room.member');
        setUsers(userResponse);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Back />
            { users.map((user) => {
                return (
                    <p key={user.event_id}>{`${user.content.displayname}: ${user.sender}`}</p>
                )
            })}
        </>
    )
}