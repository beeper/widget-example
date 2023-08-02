"use client"

import dynamic from 'next/dynamic'
import {EventDirection, WidgetEventCapability} from '@beeper/matrix-widget-api';
import Option from "@/app/components/option";

const MuiCapabilitiesGuard = dynamic(() => import('@beeper/matrix-widget-toolkit-mui').then((mod) => mod.MuiCapabilitiesGuard), {
    ssr: false,
})

export default function Home() {
    return (
        <>
            {/* Request capabilities here */}
            {/* alternatively https://github.com/nordeck/matrix-widget-toolkit/blob/main/example-widget-mui/src/AllRoomsPage/AllRoomsPage.tsx */}
            <MuiCapabilitiesGuard
                capabilities={[
                    WidgetEventCapability.forStateEvent(
                        EventDirection.Receive,
                        'm.room.member'
                    ),
                    WidgetEventCapability.forStateEvent(
                        EventDirection.Receive,
                        'm.room.name'
                    ),
                    // 'org.matrix.msc2762.timeline:*',
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Receive,
                        'm.room.message'
                    ),
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Receive,
                        'm.reaction'
                    ),
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Send,
                        'm.room.message'
                    ),
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Send,
                        'm.room.redaction'
                    ),
                    WidgetEventCapability.forStateEvent(
                        EventDirection.Send,
                        'm.room.name'
                    ),
                ]}
            >
                <p className="text-lg font-bold">Welcome to Beeper Widgets!</p>
                <p>Explore any of the following examples.</p>
                <Option path="/examples/members" text="View Members"/>
                <Option path="/examples/messages" text="Read Messages"/>
                <Option path="/examples/send" text="Send Message" />
                <Option path="/examples/reactions" text="Read Reactions"/>
                <Option path="/examples/redaction" text="Delete Message" />
                <Option path="/examples/name" text="Room Name" />
                <Option path="/examples/storage" text="Store Data" />
            </MuiCapabilitiesGuard>
        </>
    );
};