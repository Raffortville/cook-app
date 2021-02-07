import React from 'react'
import {useDispatch} from 'react-redux'
import '../Fiche/module.Fiche.scss'
import {setSearchMode} from '../../Store/modules/searchStore'
import FormFiche from '../../Components/Fiche/formFiche'
import Alert from '../../Components/Alert/Alert'

const Fiches = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])

    return(
        <main className="height90">
            <div className="wrapTitre">
                <p className="h3 underLine">Créer fiche technique</p>
                 <div className="wrapAlert">
                     <Alert/>
                 </div>
            </div>
            <div className="wrapFormOut">
                <FormFiche/>
            </div>
        </main>
    )
}

export default Fiches