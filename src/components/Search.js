import React, { useState } from 'react'

import useDebounce from '../hooks/useDebounce'
import SearchResultsList from './SearchResultsList'


const Search = props => {

    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState({})
    
    // debounce input before sending API GET request
    useDebounce(() => {
        // clear results
        setResults({})
        // fetch API
        if(searchText.length >= 1) {
            let url = 'https://mobile-staging.gametime.co/v1/search?q='
            url += encodeURI(searchText)
            fetch(url)
                .then((res) => {
                    if (res.ok) return res.json()
                    throw new Error('Something went wrong')
                })
                .then((responseJson) => { setResults(responseJson) })
                .catch((error) => { console.log(error.toString()) })
        }
    }, 200, [searchText])

    return (
        <div className="searchBarContainer">

            <input 
                className="searchBarInput"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.currentTarget.value)}
                placeholder="Search"
            />
   
            <SearchResultsList 
                searchText={searchText} 
                results={results} 
            />

        </div>
        
    )

}

export default Search
