import React from "react"

interface Translation {
  [key: string]: string | undefined
}

interface Phrase {
  id: string
  phrase: string
  createdAt: string
  updatedAt: string
  status: string
  translations: Translation
}

interface PhraseListProps {
  results: Phrase[]
}

const PhraseList: React.FC<PhraseListProps> = ({ results }) => {
  if (results.length === 0) {
    return <p className='text-gray-500'>No phrases found.</p>
  }

  return (
    <div className='w-full max-w-4xl'>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>ID</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Phrase</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Translations</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Created At</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Updated At</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((phrase) => (
            <tr key={phrase.id}>
              <td className='py-2 px-4 border-b border-gray-200'>{phrase.id}</td>
              <td className='py-2 px-4 border-b border-gray-200'>{phrase.phrase}</td>
              <td className='py-2 px-4 border-b border-gray-200'>
                {Object.entries(phrase.translations).map(([lang, translation]) => (
                  <p key={lang} className='text-sm'>
                    <strong>{lang.toUpperCase()}:</strong> {translation}
                  </p>
                ))}
              </td>
              <td className='py-2 px-4 border-b border-gray-200'>{new Date(phrase.createdAt).toLocaleString()}</td>
              <td className='py-2 px-4 border-b border-gray-200'>{new Date(phrase.updatedAt).toLocaleString()}</td>
              <td className={`py-2 px-4 border-b border-gray-200 ${getStatusColor(phrase.status)}`}>{phrase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-500"
    case "pending":
      return "text-yellow-500"
    case "spam":
      return "text-red-500"
    case "deleted":
      return "text-gray-500"
    default:
      return ""
  }
}

export default PhraseList
