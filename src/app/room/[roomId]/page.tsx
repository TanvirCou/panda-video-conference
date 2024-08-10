/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import useUser from '@/hooks/useUser';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const page = ({params}: {params: {roomId: string}}) => {
    const {fullName} = useUser();
    const roomID = params.roomId;

    let myMeeting: any = async (element: any) => {
        const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, uuidv4(), fullName || "user" + Date.now(), 3600);
       
        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
               container: element,
               sharedLinks: [
                 {
                   name: 'Shareable link',
                   url:
                    window.location.protocol + '//' + 
                    window.location.host + window.location.pathname +
                     '?roomID=' +
                     roomID,
                 },
               ],
               scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
               },
               maxUsers: 10,
          });
         };
    
    return (
        <div
        className="w-full h-screen flex"
        ref={myMeeting}
      ></div>
    );
};

export default page;