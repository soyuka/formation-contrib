import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconRed: {
    color: 'rgba(221, 4, 0, 0.7)',
  },
}));

const FavoriteButton = ({cat, favorite, unfavorite}) => {
  const classes = useStyles()

  return (<IconButton aria-label={`favorite this cat`} className={cat.favourited ? classes.iconRed : classes.icon} onClick={() => { cat.favourited ? unfavorite(cat.favourited.id) : favorite(cat.id) }}>
    <FavoriteIcon />
  </IconButton>)
}

export default FavoriteButton
