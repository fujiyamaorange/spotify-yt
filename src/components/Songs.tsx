import { useRecoilValue } from 'recoil'

import { playlistState } from '@/atoms/playlistAtom'
import { Song } from './Song'

export const Songs: React.VFC = () => {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className="flex flex-col px-8 py-4 space-y-1 text-white">
      {Object.keys(playlist).length > 0 &&
        playlist.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track.track} order={i} />
        ))}
    </div>
  )
}
