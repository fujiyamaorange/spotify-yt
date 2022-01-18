import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilValue, useRecoilState } from 'recoil'

import { playlistIdState, playlistState } from '@/atoms/playlistAtom'
import spotifyApi from '@/lib/spotify'
import { Songs } from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const INITIAL_COLOR = 'from-black-500'

export const Center = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState(INITIAL_COLOR)
  const playlistId = useRecoilValue(playlistIdState)
  const [
    playlist,
    setPlaylist,
  ] = useRecoilState<SpotifyApi.SinglePlaylistResponse>(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop() ?? INITIAL_COLOR)
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
        console.log(data.body)
      })
      .catch((e) => {
        console.log('Something went wrong!', e)
      })
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center p-1 pr-2 space-x-3 text-white transition duration-300 bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
          onClick={() => signOut()}
        >
          <Image
            className="rounded-full"
            height="40"
            width="40"
            src={
              session?.user?.image ??
              'https://mvp.microsoft.com/en-us/PublicProfile/Photo/5003286'
            }
            alt="user"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end p-8 text-white space-x-7 bg-gradient-to-b to-black ${color} h-80`}
      >
        {Object.keys(playlist).length > 0 ? (
          <div className="shadow-2xl w-max h-max">
            <Image
              className="bg-center bg-no-repeat bg-cover"
              src={playlist.images[0].url}
              height="176"
              width="176"
              alt="album image"
            />
          </div>
        ) : (
          <div className="bg-gray-300 shadow-2xl w-44 h-44" />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">
            {playlist?.name ?? 'PLAYLIST NAME'}
          </h1>
        </div>
      </section>

      <Songs />
    </div>
  )
}
