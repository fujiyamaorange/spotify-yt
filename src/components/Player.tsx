import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { useState, useEffect, useCallback } from 'react'
import {
  SwitchHorizontalIcon,
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import { debounce } from 'lodash'

import { useSpotify } from '@/hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '@/atoms/songsAtom'
import { useSongInfo } from '@/hooks/useSongsInfo'

export const Player: React.VFC = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now playing: ', data.body.item)
        setCurrentTrackId(data.body.item?.id ?? '')
      })

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body.is_playing)
      })
    }
  }

  const handlePlayPause = () => {
    //
    spotifyApi.getMyCurrentPlaybackState().then(() => {
      // dummy function
      if (isPlaying) {
        console.log('音楽を停止します')
        setIsPlaying(false)
      } else {
        console.log('音楽を再生します')
        setIsPlaying(true)
      }

      // real function
      // if (data.body.is_playing) {
      //   spotifyApi.pause()
      //   setIsPlaying(false)
      // } else {
      //   spotifyApi.play()
      //   setIsPlaying(true)
      // }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = useCallback(
    // debounce
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((e) => console.log(e))
    }, 500),
    []
  )

  return (
    <div className="grid h-24 grid-cols-3 px-2 text-xs text-white md:text-base md:px-8 bg-gradient-to-b from-black to-gray-900">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {Object.keys(songInfo).length !== 0 && (
          <div className="hidden md:inline">
            <Image
              src={songInfo?.album.images?.[0]?.url}
              alt="music image"
              height="40"
              width="40"
            />
          </div>
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="w-10 h-10 button" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="w-10 h-10 button" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end pr-5 space-x-3 md:space-x-4">
        <VolumeOffIcon onClick={() => setVolume(0)} className="button" />
        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon onClick={() => setVolume(100)} className="button" />
      </div>
    </div>
  )
}
