import React, {Suspense} from 'react'
import useSWR, {mutate} from 'swr'
import './App.css';
import { makeStyles } from '@material-ui/core/styles'
import {Box, Container, GridList, GridListTile, Button, GridListTileBar, IconButton} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: '700px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconRed: {
    color: 'rgba(221, 4, 0, 0.7)',
  },
}));

const userId = 'i0r7o1'
const fetcher = (url, options) => fetch(`https://api.thecatapi.com/v1${url}`, {...options, headers: {'x-api-key': 'e1dba036-ad1f-4f92-bb2a-19eec4279cf7', 'content-type': 'application/json'}}).then(r => r.json())

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

function CatList() {
  const { data: favorites } = useSWR(`/favourites?sub_id=${userId}&limit=1000`, fetcher, {suspense: true})
  const { data: cats, error } = useSWR('/images/search?limit=50', fetcher, { refreshInterval: 0, revalidateOnFocus: false, suspense: true })
  const classes = useStyles()

  cats.forEach((cat) => {
    cat.favourited = favorites.find((e) => cat.id === e.image_id)
  })

  return <Container fixed>
    <Box my={4}>
      <GridList cellHeight='auto' className={classes.gridList} cols={5}>
        {cats.map((cat) => (
          <GridListTile key={cat.url} cols={cat.width > cat.height ? 2 : 1}>
            <img src={cat.url} alt={cat.id} width='100%'/>
            <GridListTileBar
              actionIcon={
                <IconButton aria-label={`favorite this cat`} className={cat.favourited ? classes.iconRed : classes.icon} onClick={() => { cat.favourited ? unfavorite(cat.favourited.id) : favorite(cat.id) }}>
                  <FavoriteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
    <Button variant="contained" onClick={() => mutate('/images/search?limit=10')}>Reload</Button>
  </Container>
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatList />
    </Suspense>
  );
}

export default App;
