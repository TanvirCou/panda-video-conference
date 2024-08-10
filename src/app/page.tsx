"use client"

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const { fullName, setFullName } = useUser();
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setRoomId("");
    setFullName("");
  }, [])

  const handleJoinRoom = () => {
    router.push(`/room/${roomId}`);
  }

  const handleCreateRoom = () => {
    router.push(`/room/${uuidv4()}`);
  }

  return (
    <div className="h-screen w-full bg-gray-950 flex justify-center items-center text-white">
      <div className="w-[90%] md:w-[75%] lg:w-[60%] flex flex-col gap-y-4 items-center">
        <p className="text-2xl md:text-3xl font-bold font-[Poppins]">Panda Video Conference</p>

        <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold flex flex-col items-center">
          <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ">Have a smooth meeting</p>
          <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ">
            <span className="block">With team member</span>
          </p>
        </div>

        <p className="text-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[60%]">Zegocloud is a global communication service provider which provides them developer-friendly and powerful SDK & APIs</p>

        <div className="w-full flex justify-center">
          <input type="text" onChange={(e) => setFullName(e.target.value)} className="h-10 border border-cyan-500 rounded-md w-[90%] lg:w-[80%] xl:w-[70%] focus:outline-none text-black px-1.5" placeholder="Enter your name" />
        </div>

        {
          fullName && fullName.length >= 3 &&
          <div className="w-full flex flex-col items-center gap-y-1">
            <div className="w-full flex justify-center items-center">
              <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" className="h-10 border border-cyan-500 rounded-md w-[62%] md:w-[65%] lg:w-[55%] xl:w-[52%] focus:outline-none text-black px-1.5" placeholder="Enter room id" />
              <button onClick={handleJoinRoom} className="bg-cyan-500 h-10 px-4 md:px-6 text-white font-medium rounded-md ml-3">Join Room</button>
            </div>

            <p onClick={handleCreateRoom} className="text-md md:text-lg text-white font-medium hover:underline hover:text-cyan-500 cursor-pointer">Or, Create a new meeting</p>
          </div>
        }
      </div>

    </div>
  );
}
