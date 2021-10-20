import React, { useMemo } from 'react'

import SearchResultsItem from './SearchResultsItem'

const NEW_RESULTS = {
    events: [],
    performers: [],
    venues: []
}

const SearchResultsList = props => {

    /*
        On props change, create a new `results` obj from `props.results`
        Required rules for `results` obj:
        - Only 3 items per entityType
        - Only entityTypes of Event, Performer and Venue, in that order
    */
    const results = useMemo(() => {
        const newResults = NEW_RESULTS
        if(Object.keys(props.results).length > 0) {
            Object.entries(props.results || {}).forEach(entity => {
                const [entityType, entityItems] = entity
                if(entityType in newResults) {
                    newResults[entityType] = entityItems.slice(0, 3)
                }
            })
        }
        return newResults
    }, [props.results])

    const isBlank = useMemo(() => (
        props.searchText.length === 0 && 
        Object.keys(props.results).length === 0
    ), [props.searchText, props.results])

    return isBlank ? <React.Fragment /> : (
        <div className="searchResultsList">
            {Object.entries(results).map(([entityType, entities], idx) => (
                entities.map((entity, idx2) => (
                    <SearchResultsItem 
                        key={idx + '_' + idx2 + '_' + entity.id} 
                        entity={entity} 
                        entityType={entityType}
                    />
                ))
            ))}
        </div>
    )
    
}

export default SearchResultsList