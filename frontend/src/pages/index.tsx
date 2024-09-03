import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import PhraseList from "../components/PhraseList"
import { searchPhrases } from "../services/phraseService"

const Home = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState("id")
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC")
  const [status, setStatus] = useState("")

  const fetchAllPhrases = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await searchPhrases("", sort, order, status)
      setResults(data)
    } catch (err) {
      setError("Failed to fetch phrases. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await searchPhrases(query, sort, order, status)
      setResults(data)
    } catch (err) {
      setError("Failed to fetch phrases. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setQuery("")
    setSort("id")
    setOrder("ASC")
    setStatus("")
    fetchAllPhrases()
  }

  useEffect(() => {
    fetchAllPhrases()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Phrase Search</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />
      {loading && <p className='text-blue-500'>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <PhraseList results={results} />
    </div>
  )
}

export default Home
