import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import { useEffect, useState } from "react";
import { shuffle } from "lodash"
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Songs from "./Songs"
import useSpotify from "../hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((error) => console.log("Something went wrong", error));
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow h-screen overflow-y-scroll bg-[#111111]">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 
        hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
        >
          <img
            className="rounded-full w-8 h-8"
            src={session?.user.image}
            alt="profile image" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-[#111111] ${color} h-96 text-white pl-10 pb-36`}>
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="Playlist image" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold" >{playlist?.name}</h1>
        </div>
      </section>

      <div className="pt-8">
        <Songs />
      </div>
    </div>
  )
}

export default Center
