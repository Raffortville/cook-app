import {createSlice} from '@reduxjs/toolkit'
import {db,storage} from '../../Firebase'
import {setLoading} from './alertStore'

export const initialState = {

    fiche : { nom:"",categorie:"",cuisson:"", description:"",image:""},

    fiches : [],

    fichesSearch : [],
}

const ficheSlice = createSlice({

    name:'Fiche',

    initialState,

    reducers : {

        selectFiche: (state,{payload}) => { state.fiche = payload},

        addFiche:(state,{payload}) => {state.fiches = [...state.fiches,payload]},

        getFiches:(state,{payload}) => {state.fiches = payload},

        updateFiche:(state,{payload}) => {state.fiches = state.fiches.map(fiche => fiche.ficheId === payload.ficheId ? payload : fiche)},

        setFichesSearch:(state,{payload}) => {state.fichesSearch = payload},

    }
})


export const createFiche = (payload,img,uid) => async dispatch => {

    try {

        const fiche = await db.collection('fiches').add({

            nom:payload.nom,
            categorie:payload.categorie,
            cuisson:payload.cuisson,
            description:payload.description,
            userId:uid
        })

        await db.collection('fiches').doc(fiche.id).update({ficheId : fiche.id})

        img !== undefined ? dispatch(storageFicheImg(fiche.id,img,uid)) : dispatch(storageDefaultImg(payload,fiche.id,uid));
        
    } catch (error) {
        
        console.log(error)
    }
}

export const storageFicheImg = (id,img,uid) => async dispatch => {

    try {

       await storage.ref('/fiches/' + id).putString(img,'data_url')
        
       const imageUrl = await storage.ref('/fiches/' + id).getDownloadURL()

       await db.collection('fiches').doc(id).update({image:imageUrl})

       dispatch(fetchFiches(uid))

    } catch (error) {
        console.log(error)
    }
}


export const storageDefaultImg = (payload,id,uid) => async dispatch => {

    try {

        const imageUrl = await storage.ref().child('/categories/' + payload.categorie+'.jpg').getDownloadURL()

        await db.collection('fiches').doc(id).update({image:imageUrl})

        dispatch(fetchFiches(uid))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const patchFiche = (payload,img) => async dispatch => {

    try {

        await db.collection('fiches').doc(payload.ficheId).update({nom:payload.nom,categorie:payload.categorie,cuisson:payload.cuisson,description:payload.description})
        
        const ficheUpdated = await db.collection('fiches').doc(payload.ficheId).get();

        img !== ficheUpdated.data().image ? dispatch(storageFicheImg(payload.ficheId,img,payload.userId)) : dispatch(updateFiche(ficheUpdated.data()))

    } catch (error) {
        
        console.log(error)
    }
}


export const fetchFiches = (uid) => async dispatch => {

    dispatch(setLoading(true))

    let arr = [];

    try {

        const fiches = await db.collection('fiches').where("userId","==",uid).get()

        if(fiches.empty){

            console.log('no fiches')

        } else {

            fiches.forEach(fiche => {

                arr.push(fiche.data())
            })

            dispatch(getFiches(arr))
            dispatch(setFichesSearch(arr))
        }

        dispatch(setLoading(false))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const selectFicheById = (payload) => async dispatch => {

    try {

        const fiche = await db.collection('fiches').doc(payload).get()

        dispatch(selectFiche(fiche.data()))
        
    } catch (error) {
        
        console.log(error)
    }
}



export const {selectFiche,addFiche,getFiches,updateFiche,setFichesSearch,selectFichesSearch} = ficheSlice.actions;

export const ficheSelector = (state) => state.ficheStore.fiche;
export const fichesSelector = (state) => state.ficheStore.fiches;
export const fichesSearchSelector = (state) => state.ficheStore.fichesSearch;

export default ficheSlice.reducer
