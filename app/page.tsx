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
            <MuiCapabilitiesGuard
                capabilities={[
                    WidgetEventCapability.forStateEvent(
                        EventDirection.Receive,
                        'm.room.member'
                    ),
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Receive,
                        'm.room.message'
                    ),
                    WidgetEventCapability.forRoomEvent(
                        EventDirection.Send,
                        'm.room.message'
                    )
                ]}
            >
                <p className="text-lg font-bold">Welcome to Beeper Widgets!</p>
                <p>Explore any of the following examples.</p>
                <Option path="/examples/members" text="View Members"/>
                <Option path="/examples/messages" text="Read Messages"/>
                <Option path="/examples/send" text="Send Message" />
            </MuiCapabilitiesGuard>
        </>
    );
};