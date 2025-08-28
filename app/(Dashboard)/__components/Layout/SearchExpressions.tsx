import SearchResults from '@/components/ui/SearchResults'
import React from 'react'

interface SearchProps {
    orgId: string,
    searchParams: {
        search?: string,
        favorites?: boolean
    }
}

function SearchExpressions({orgId, searchParams}: SearchProps) {

    

    const data = []
    console.log(searchParams.search?.length)

    if(orgId && !searchParams.search && !searchParams.favorites){
      return(
        <SearchResults message='Create Your Board' imageUrl='/clipboard.svg' btn="Create Board"/>
      )
    }

    if(orgId && !searchParams.search && searchParams.favorites ){
      return (
        <SearchResults message='favorites' imageUrl='/bag.svg' />
      )
    }

    if(orgId && searchParams.search && !data.length){
      return (
        <SearchResults message='No WhiteBoard Found' imageUrl='/not-found.svg'/>
      )
    }
}

export default SearchExpressions