import React from "react"
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {setSearchMode} from '../../Store/modules/searchStore'
import {logUserWthProvider} from '../../Store/modules/userStore'
import LogForm from '../../Components/Logs/logForm'
import Alert from '../../Components/Alert/Alert'
import  SocialButtons from '../../Components/Buttons/socialButto'
import {titleIdentifyUser} from '../../Constants'
import './module.logStyle.scss'

const Login = () => {
    
    const dispatch = useDispatch()

    const history = useHistory()

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])


    const handleLogWithProvider = (provider) => {
        
        dispatch(logUserWthProvider(provider))
        history.push('/')
    }

    return( 
        <main className="wrapMain">
            <section className="wrapSection">
                <div>
                    <LogForm title={titleIdentifyUser}/>
                </div>
                <div>
                    <SocialButtons handleLog={handleLogWithProvider}/>
                </div>
            </section>
            <div className="wrapAlert">
                <Alert/>
            </div>
        </main>
    )
}

export default Login