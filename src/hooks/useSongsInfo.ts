import { useState, useEffect } from 'react'
import {  useRecoilValue } from 'recoil'

import { currentTrackIdState } from '@/atoms/songsAtom'
import { useSpotify } from './useSpotify'

export const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const currentTrackId = useRecoilValue(
    currentTrackIdState
  )
  const [songInfo, setSongInfo] = useState<any>({})

  useEffect(() => {
    const fetchSonginfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
        console.log(trackInfo)
      }
    }

    fetchSonginfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}
