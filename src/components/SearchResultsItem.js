import React, { useMemo } from 'react'


const SearchResultsItem = props => {

    const { entityType, entity } = props

    const image = useMemo(() => {
        if(entityType === 'events') return entity.performers[0].hero_image_url
        if(entityType === 'performers') return entity.hero_image_url
        if(entityType === 'venues') return entity.image_url
    }, [entity, entityType])

    const title = useMemo(() => {
        if(entityType === 'events') return entity.event.name
        if(entityType === 'performers') return entity.name
        if(entityType === 'venues') return entity.name
        return ''
    }, [entity, entityType])

    const subtitle = useMemo(() => {
        if(entityType === 'events') return entity.venue.name
        if(entityType === 'performers') return entity.category
        if(entityType === 'venues') return entity.city
        return ''
    }, [entity, entityType])

    return (
        <div className="searchResultsItem">
            <i 
                className="searchResultsItemImage"
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
            <span className="searchResultsItemMeta">
                <span className="searchResultsItemTitle">
                    {title}
                </span>
                <span className="searchResultsItemSubitle">
                    {subtitle}
                </span>
            </span>
        </div>
    )

}

export default SearchResultsItem