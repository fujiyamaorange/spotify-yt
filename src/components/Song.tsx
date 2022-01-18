import Image from 'next/image'
import { useSetRecoilState } from 'recoil'

import { millisToMinutesAndSeconds } from '@/lib/time'
import { currentTrackIdState, isPlayingState } from '@/atoms/songsAtom'

type Props = {
  track: SpotifyApi.TrackObjectFull
  order: number
}

export const Song: React.VFC<Props> = ({ track, order }) => {
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState)
  const setIsPlaying = useSetRecoilState(isPlayingState)

  const playSong = () => {
    if (!currentTrackIdState) return
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    console.error('プレミアムでないと再生できません')
    // spotifyApi.play({ uris: [track.uri] })
  }

  return (
    <div
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <div>
          <Image
            src={track.album.images[0].url}
            height="40"
            width="40"
            alt="alnum images"
          />
        </div>
        <div>
          <p className="text-white truncate w-36 lg:w-64">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden w-40 md:inline">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}
