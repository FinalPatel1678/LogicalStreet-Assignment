import React from "react"

interface SearchBarProps {
  query: string
  setQuery: (query: string) => void
  onSearch: () => void
  sort: string
  setSort: (sort: string) => void
  order: "ASC" | "DESC"
  setOrder: (order: "ASC" | "DESC") => void
  status: string
  setStatus: (status: string) => void
  onReset: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, sort, setSort, order, setOrder, status, setStatus, onReset }) => {
  return (
    <div className='flex items-center flex-col space-y-4 mb-6 w-full'>
      <div className='flex space-x-4'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter a phrase'
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-80'
        />
        <button onClick={onSearch} className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200'>
          Search
        </button>
        <button onClick={onReset} className='px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-200'>
          Reset
        </button>
      </div>

      <div className='flex space-x-4'>
        <div className='flex items-center'>
          <label htmlFor='sort' className='mr-2'>
            Sort By:
          </label>
          <select id='sort' value={sort} onChange={(e) => setSort(e.target.value)} className='px-2 py-1 border border-gray-300 rounded-md'>
            <option value='id'>ID</option>
            <option value='createdAt'>Created At</option>
            <option value='updatedAt'>Updated At</option>
          </select>
        </div>

        <div className='flex items-center'>
          <label htmlFor='order' className='mr-2'>
            Order:
          </label>
          <select
            id='order'
            value={order}
            onChange={(e) => setOrder(e.target.value as "ASC" | "DESC")}
            className='px-2 py-1 border border-gray-300 rounded-md'
          >
            <option value='ASC'>Ascending</option>
            <option value='DESC'>Descending</option>
          </select>
        </div>

        <div className='flex items-center'>
          <label htmlFor='status' className='mr-2'>
            Status:
          </label>
          <select id='status' value={status} onChange={(e) => setStatus(e.target.value)} className='px-2 py-1 border border-gray-300 rounded-md'>
            <option value=''>All</option>
            <option value='active'>Active</option>
            <option value='pending'>Pending</option>
            <option value='spam'>Spam</option>
            <option value='deleted'>Deleted</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
