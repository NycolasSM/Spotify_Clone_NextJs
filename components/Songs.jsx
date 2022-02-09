import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song.jsx"

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 -translate-y-28 flex flex-col space-y-0 text-neutral-300">
      <div className="flex justify-between pl-5 pr-1 pb-2" >
        <div className="flex gap-9">
          <span>#</span>
          <span>Title</span>
        </div>
        <span>Album</span>
        <span>Duration</span>
      </div>
      <hr className="border-top-[0.1px] border-neutral-600 pb-2" />
      {playlist?.tracks.items.map((track, i) => (<>
        <Song key={track.track.id} track={track} order={i} />
      </>
      ))}
    </div>
  )
}

export default Songs;
