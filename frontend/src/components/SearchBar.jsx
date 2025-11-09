import React from 'react';

export default function SearchBar({ query, setQuery, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search posts..." className="input" />
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-500">Sort</label>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="input">
          <option value="top">Top</option>
          <option value="new">Newest</option>
        </select>
      </div>
    </div>
  )
}
