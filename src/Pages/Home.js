import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {setSearchMode} from '../Store/modules/searchStore'
import {loadingSelector} from '../Store/modules/alertStore'
import Loader from '../Components/Alert/Loader'

const Home = () => {

    const dispatch = useDispatch()

    const loading = useSelector(loadingSelector)

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])

    return(

        <main className="wrapMain">

            {loading ? <Loader/> :
          
                <div style={{marginTop:"30px"}}>
                    <h2 className="h3 textAlignCenter textPrimary">COOK APP</h2>
                    <p className="p2 textMain">L'application pour réaliser et gérer vos fiches technique de fabrications</p>
                </div> 
            }
        </main>
    )
}


export default Home