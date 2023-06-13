import ModalProvider from '@/Providers/ModalProvider'
import './globals.css'

import Sidebar from '@/components/Sidebar'
import SupaBaseProvider from '@/Providers/SupabaseProvider'
import UserProvider from '@/Providers/UserProvider'

import { Figtree } from 'next/font/google'
import ToasterProvider from '@/Providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const products = await getActiveProductsWithPrices()
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupaBaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupaBaseProvider>
      </body>
    </html>
  )
}
