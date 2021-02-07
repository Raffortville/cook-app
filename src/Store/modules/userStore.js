import {createSlice} from '@reduxjs/toolkit'
import {auth, db,providerGg,providerFb,storage} from '../../Firebase'
import {setLoading} from './alertStore'
import {setFichesSearch,getFiches} from './ficheStore'

export const initialState = { user : {username:"",email:"",password:"", avatar:""}, userLog:false};


const userSlice = createSlice({

    name:"user",

    initialState:initialState,

    reducers: {

        setUser:(state,{payload}) => {state.user = payload},

        setUserLog:(state,{payload}) => {state.userLog = payload},
    }
});


export const createUser = (payload) => async dispatch => {

    dispatch(setLoading(true))
    
    try {

        const {user} =  await auth.createUserWithEmailAndPassword(payload.email,payload.password);

        await db.collection('users').doc(user.uid).set({

            username:payload.username,     
            email:payload.email,
            emailContact:payload.email,
            uid:user.uid,
            avatar:""
        })

        dispatch(getUser(user.uid))

    } catch (error) {
        
        console.log(error)
    }
}

export const logUser = (payload) => async dispatch => {

    dispatch(setLoading(true))

    try {

       const {user} = await auth.signInWithEmailAndPassword(payload.email,payload.password);

       dispatch(getUser(user.uid))

    } catch (error) {
        
        console.log(error)
    }
}

export const logUserWthProvider = (provider) => async dispatch  => {

   const providerAuth = provider === "Fb" ? providerFb : providerGg;

   dispatch(setLoading(true))

    try {   

        const result =  await auth.signInWithPopup(providerAuth)

        await db.collection('users').doc(result.user.uid).set({

            uid:result.user.uid,
            username:result.user.displayName,
            email:result.user.email,
            emailContact:result.user.email,
            avatar:""
        })

        dispatch(getUser(result.user.uid))

    } catch (error) {
        
        console.log(error)
    }
}

export const getUser = (payload) => async dispatch => {

    try {

        const user = await db.collection('users').doc(payload).get()

        dispatch(setUser(user.data()))
        dispatch(setUserLog(true))
        dispatch(setLoading(false))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const patchUserProfil = (payload,avatar) => async dispatch => {

    dispatch(setLoading(true))

    try {

        await db.collection('users').doc(payload.uid).update({

            username:payload.username,
            emailContact:payload.emailContact
        })
        
        avatar === "" ? dispatch(getUser(payload.uid)) : dispatch(addAvatarProfil(payload.uid,avatar))

    } catch (error) {
        
        console.log(error)
    }
}

export const addAvatarProfil = (uid,avatar) => async dispatch => {

    try {

        await storage.ref('avatar/' + uid).putString(avatar,"data_url")

        const avatarUrl = await storage.ref('avatar/' + uid).getDownloadURL();

        await db.collection('users').doc(uid).update({avatar:avatarUrl})

        dispatch(getUser(uid))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const logOut = () => async dispatch => {

    try {

       await auth.signOut();

       dispatch(setUser(initialState.user))
       dispatch(setUserLog(false))
       dispatch(getFiches([]))
       dispatch(setFichesSearch([]))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const {setUser,setUserLog} = userSlice.actions;

export const userSelector = (state) => state.userStore.user;
export const userLogSelector = (state) => state.userStore.userLog;


export default userSlice.reducer
