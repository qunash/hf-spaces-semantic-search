import { Inter } from 'next/font/google'
import SearchBar from '@/components/searchBar'
import Card from '@/components/card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  function onSearch(query: string): void {
    alert(`Searching for ${query}`)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <SearchBar onSearch={onSearch} />
      <Card
        username='anzorq'
        title='zedzek'
        description='Circassian translator demo'
        emoji='💬'
        colorFrom='green'
        colorTo='yellow'
        updateDate='19 days'
        numLikes={5}
      />
    </main>
  )
}
