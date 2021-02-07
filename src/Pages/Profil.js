import React from 'react'
import {useDispatch} from 'react-redux'
import {setSearchMode} from '../Store/modules/searchStore'
import ProfilCard from '../Components/Profil/ProfileCard'

const Profil = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])

    return(
        
        <main className="height90 d-flex">
            <ProfilCard/>
        </main>
    )
}


export default Profil