"use client"

import {MuiCapabilitiesGuard} from '@beeper/matrix-widget-toolkit-mui';
import {useWidgetApi} from '@beeper/matrix-widget-toolkit-react';
import {EventDirection, WidgetEventCapability} from '@beeper/matrix-widget-api';
import {useState, useEffect} from 'react';
import {
    Box
} from '@mui/material';
import {RoomEvent} from '@beeper/matrix-widget-toolkit-api';


export default function WidgetPage() {
    return (
        <>
            <Box m={1}>
                <MuiCapabilitiesGuard
                    capabilities={[
                        // WidgetEventCapability.forStateEvent(
                        //     EventDirection.Receive,
                        //     'm.room.member'
                        // ),
                        // WidgetEventCapability.forRoomEvent(
                        //     EventDirection.Receive,
                        //     'm.room.message'
                        // ),
                        // WidgetEventCapability.forRoomEvent(
                        //     EventDirection.Receive,
                        //     'm.reaction'
                        // ),
                        // WidgetEventCapability.forRoomEvent(
                        //     EventDirection.Receive,
                        //     'm.room.redaction'
                        // ),
                        // WidgetEventCapability.forRoomAccountData(
                        //     EventDirection.Receive,
                        //     'm.fully_read'
                        // ),
                    ]}
                >
                    <WidgetPageContent/>
                </MuiCapabilitiesGuard>
            </Box>
        </>
    );
};

export interface RoomMessageEvent {
    msgtype: string;
    body: string;
}

function WidgetPageContent() {

    const widgetApi = useWidgetApi();

    async function fetchData(useUnread: boolean, limit: number = 500) {
        let roomEvents: RoomEvent<RoomMessageEvent>[] = await widgetApi.receiveRoomEvents('m.room.message', {limit: limit});
        console.log(roomEvents);
    }

    useEffect(() => {
        fetchData(false);
    }, []);

    return (
        <>
            <p>Welcome to Widget-Nextjs</p>
        </>
    )
}