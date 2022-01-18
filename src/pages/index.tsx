import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Sidebar } from '@/components/Sidebar'
import { Center } from '@/components/Center'
import { Player } from '@/components/Player'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // This is for first rendering
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />

        <div className="fixed bottom-0 w-screen">
          <Player />
        </div>
      </main>
    </div>
  )
}
