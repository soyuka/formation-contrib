import React, {Suspense} from 'react'
import {mutate} from 'swr'
import CatList from './CatList'

import './App.css';

const userId = 'i0r7o1'
const fetcher = (url, options) => 
  fetch(`https://api.thecatapi.com/v1${url}`, {
    ...options, headers: {'x-api-key': 'e1dba036-ad1f-4f92-bb2a-19eec4279cf7', 'content-type': 'application/json'}
  }).then(r => r.json())

function favorite(catId: string) {
  fetcher('/favourites', {body: JSON.stringify({sub_id: userId, image_id: catId}), method: 'POST'})
    .then(() => {
      mutate(`/favourites?sub_id=${userId}&limit=1000`)
    })
}

function unfavorite(favoriteId: string) {
  fetcher(`/favourites/${favoriteId}`, {method: 'DELETE'})
    .then(() => {
      mutate(`/favourites?sub_id=${userId}&limit=1000`)
    })
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatList favorite={favorite} unfavorite={unfavorite} fetcher={fetcher} userId={userId} />
    </Suspense>
  );
}

export default App;
