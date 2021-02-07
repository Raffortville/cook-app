import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {logUserWthProvider} from '../../Store/modules/userStore'
import LogForm from '../../Components/Logs/logForm'
import Alert from '../../Components/Alert/Alert'
import SocialButtons from '../../Components/Buttons/socialButto'
import {titleCreateUser} from '../../Constants'
import './module.logStyle.scss'

const Signup = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const handleSignUpWithProvider = (provider) => {

        dispatch(logUserWthProvider(provider))
        history.push('/')
    }

    return(

        <main className="wrapMain">
            <section className="wrapSection">
                <div>
                    <LogForm title={titleCreateUser}/>
                </div>
                <div>
                    <SocialButtons handleLog={handleSignUpWithProvider}/>
                </div>
            </section>
            <div className="wrapAlert">
                <Alert/>
            </div>
        </main>
    )
}

export default Signup