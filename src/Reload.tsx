import React from 'react'
import {Button} from '@material-ui/core'

/**
 * @param mutate - fonction de mutation pour recharger la donnée
 */
const Reload = ({mutate}) => {
    return (<Button variant="contained" onClick={() => mutate('/images/search?limit=50')}>Reload</Button>)
}

export default Reload
