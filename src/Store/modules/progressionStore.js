import {createSlice} from '@reduxjs/toolkit'
import {db} from '../../Firebase'


export const initialStateProgress = { 

    progressions : [], 

    progressTitre : {nom:"", titre: true, numero:"", subArray:[]},
    
    progress: {nom:"",titre:false}
}

const proregressionSlice = createSlice({

    name:"progression",

    initialState : initialStateProgress,

    reducers:{

        getProgressions:(state,{payload}) => {state.progressions = payload},

        addProgressTitre:(state,{payload}) => {state.progressions = [...state.progressions,payload]},

        selectProgressTitre:(state,{payload}) => {state.progressTitre = payload},

        selectProgress:(state,{payload}) => {state.progress = payload},

        updateProgressTitre:(state,{payload}) => {state.progressions = state.progressions.map(item => item.progressTitreId === payload.progressTitreId ? payload : item)},

        deleteProgressTitre:(state,{payload}) => {state.progressions = state.progressions.filter(item => item.progressTitreId !== payload.progressTitreId)},

        addProgressToSubArray:(state,{payload}) => {state.progressTitre = {...state.progressTitre,subArray:[...state.progressTitre.subArray,payload]}}
    }
})


export const createProgressionTitre = (payload) => async dispatch => {

    try {

        const progressTitre = await db.collection('progressTitre').add({nom:payload.nom,titre:payload.titre,ficheId:payload.ficheId,numero:payload.numero,subArray:payload.subArray})
        
        await db.collection('progressTitre').doc(progressTitre.id).update({progressTitreId:progressTitre.id})

        const progressTitreSaved = await db.collection('progressTitre').doc(progressTitre.id).get()

        dispatch(addProgressTitre(progressTitreSaved.data()))

    } catch (error) {
        
        console.log(error)
    }

}


export const createProgression = (payload) => async dispatch => {

    try {

        const progres = await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').add({nom:payload.nom,titre:payload.titre,progressTitreId:payload.progressTitreId});

        await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').doc(progres.id).update({progressId:progres.id})
        
       dispatch(updateSubArray(payload))

    } catch (error) {
        
        console.log(error)
    }
}

export const updateSubArray = (payload) => async dispatch => {

    let arr = [];

    try {

        const progress = await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').where("progressTitreId",'==',payload.progressTitreId).get()

        progress.forEach(progr => arr.push(progr.data()))
        
        await db.collection('progressTitre').doc(payload.progressTitreId).update({subArray:arr})

        dispatch(getAndPatchProgressTitre(payload))

    } catch (error) {
        
        console.log(error)
    }
}


export const getAndPatchProgressTitre = (payload) => async dispatch => {

    try {

        const progressTitreUpdated = await db.collection("progressTitre").doc(payload.progressTitreId).get()

        dispatch(updateProgressTitre(progressTitreUpdated.data()))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const removeProgression = (payload) => async dispatch => {

    try {

        await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').doc(payload.progressId).delete()
       
        dispatch(updateSubArray(payload));


    } catch (error) {
        
        console.log(error)
    }
}

export const removeProgressionTitre = (payload) => async dispatch => {

    try {

        const progress = await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').where('progressTitreId',"==",payload.progressTitreId).get();

        progress.forEach( async progr => {

            await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').doc(progr.data().progressId).delete()
        })

        await db.collection('progressTitre').doc(payload.progressTitreId).delete()

        dispatch(deleteProgressTitre(payload))
        
    } catch (error) {
        
        console.log(error)
    }
}


export const patchProgression = (payload) => async dispatch => {

    try {

        await db.collection('progressTitre').doc(payload.progressTitreId).collection('progress').doc(payload.progressId).update({nom:payload.nom})
        
        dispatch(updateSubArray(payload))

    } catch (error) {
        
        console.log(error)
    }
}

export const patchProgressionTitre = (payload) => async dispatch => {

    try {

        await db.collection('progressTitre').doc(payload.progressTitreId).update({nom:payload.nom,numero:payload.numero})

        dispatch(updateProgressTitre(payload))
        
    } catch (error) {

        console.log(error)
    }
}

export const fetchProgressions = (payload) => async dispatch => {

    let arr = [];

    try {

        const progressions = await db.collection('progressTitre').where("ficheId",'==',payload).get()

        if(progressions.empty){

            console.log("no progressions")

        } else {

            progressions.forEach(prog => {

                arr.push(prog.data())
            })
        }

        dispatch(getProgressions(arr))
        
    } catch (error) {

        console.log(error)
    }
}


export const {getProgressions,addProgressToSubArray,addProgressTitre,selectProgressTitre,selectProgress,updateProgressTitre,deleteProgressTitre} = proregressionSlice.actions;

export const progressTitreSelector = (state) => state.progressionStore.progressTitre;
export const progressSelector = (state) => state.progressionStore.progress;
export const progresssionsSelector = (state) => state.progressionStore.progressions;


export default proregressionSlice.reducer
