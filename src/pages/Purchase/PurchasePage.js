
import React from 'react'
import Promotions from '../../components/Promotions/Promotions'
import GameList from '../../components/GameList/GameList'
import { TabletSharp } from '@mui/icons-material'
import CategoryGames from '../../components/CategoriaJuego/CategoryGames'
import Categories from '../../components/CategoriaJuego/CategoriaJuego'
import GameReviews from '../../components/GameReviews/GameReviews'

const PurchasePage = () => {
  return (<>
    <Promotions/>
    <Categories/>
    <GameList/>
    <TabletSharp/>
    <GameReviews/>

    </>
  )
}

export default PurchasePage

