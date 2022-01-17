import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
;``
import { useSpotify } from '@/hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '@/atoms/songsAtom'

export const Player: React.VFC = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  const [currentTrackId, setCurrentTrackId] = useRecoilState(
    currentTrackIdState
  )
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  return (
    <div>
      <div>{/* <Image alt="music image" /> */}</div>
    </div>
  )
}
