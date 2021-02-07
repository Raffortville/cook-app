import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'

import ingredientStore from './modules/ingredientStore'
import ficheStore from './modules/ficheStore'
import alertStore from './modules/alertStore'
import progressionStore from './modules/progressionStore'
import formStore from './modules/formStore'
import searchStore from './modules/searchStore'
import userStore from './modules/userStore'

const reducer = combineReducers({ingredientStore,ficheStore,alertStore,progressionStore,formStore,searchStore,userStore})

const store = configureStore({reducer})


export default store