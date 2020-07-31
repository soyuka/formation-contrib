import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Box, Container, GridList, GridListTile, Button, GridListTileBar} from '@material-ui/core'
import useSWR, {mutate} from 'swr'

import Reload from './Reload'
import FavoriteButton from './FavoriteButton'

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

const CatList = ({favorite, unfavorite, userId, fetcher}) => {
  const { data: favorites } = useSWR(`/favourites?sub_id=${userId}&limit=1000`, fetcher, {suspense: true})
  const { data: cats, error } = useSWR('/images/search?limit=50', fetcher, { refreshInterval: 0, revalidateOnFocus: false, suspense: true })
  const classes = useStyles()

  cats.forEach((cat) => {
    cat.favourited = favorites.find((e) => cat.id === e.image_id)
  })

  return <Container fixed>
    <Box my={4}>
      <GridList aria-label={`grid list`} cellHeight='auto' className={classes.gridList} cols={5}>
        {cats.map((cat) => (
          <GridListTile key={cat.url} cols={cat.width > cat.height ? 2 : 1}>
            <img aria-label={`cat image`} src={cat.url} alt={cat.id} width='100%'/>
            <GridListTileBar
              actionIcon={
                <FavoriteButton favorite={favorite} unfavorite={unfavorite} cat={cat}/> 
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
    <Reload mutate={mutate} />
  </Container>
}

export default CatList
