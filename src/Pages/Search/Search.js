import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {fichesSelector,fetchFiches} from '../../Store/modules/ficheStore'
import {setSearchMode} from '../../Store/modules/searchStore'
import {userSelector} from '../../Store/modules/userStore'
import {loadingSelector} from '../../Store/modules/alertStore'
import ListFiches from '../../Components/Fiche/ListFiches'
import Alert from '../../Components/Alert/Alert'
import Loader from '../../Components/Alert/Loader'
import './module.search.scss'

const Search = () => {

  const history = useHistory()

  const fichesSearch = useSelector(fichesSelector)

  const user = useSelector(userSelector)

  const loading = useSelector(loadingSelector)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchFiches(user.uid))
    dispatch(setSearchMode(true))
    
  },[dispatch,user.uid])

  return(
    <div className="height90">
      {loading ? <Loader/> : 
      fichesSearch.length > 0 ? <ListFiches/> : (  

        <div className="wrapMessage" onClick={()=>history.push('/formFiche')}>
          <p >Vous n'avez pas de fiches crées</p>
          <p style={{marginTop:"20px"}} className="h4 textSecondary borderSimple">Créer une fiche</p>
          <div className="wrapAlertFiche">
            <Alert/>
          </div>
        </div>
      )
    }
    </div>
  )
}


export default Search