import Head from 'next/head'

import Sidebar from '../components/Sidebar.jsx'
import Center from '../components/Center.jsx'
import Player from '../components/Player.jsx'
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}