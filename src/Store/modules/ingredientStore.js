import {createSlice} from '@reduxjs/toolkit'
import {db} from '../../Firebase'
import {setLoading} from './alertStore'


export const initialState = {

    ingredients : [],

    ingredientTitre : {nom:"", titre:true, subArray:[]},

    ingredient : {nom:"",prix:"",qte :"", titre :false},
}

const ingredientSlice = createSlice({

    name:"ingredients",

    initialState,

    reducers:{

        addIngredientTitre :(state,{payload}) => { state.ingredients = [...state.ingredients,payload]},

        addIngredientSubArray:(state,{payload}) => {state.ingredientTitre = {...state.ingredientTitre,subArray:[...state.ingredientTitre.subArray,payload]}},

        updateIngredientTitre:(state,{payload}) => {state.ingredients = state.ingredients.map(item => item.ingredientTitreId === payload.ingredientTitreId ? payload : item)},

        selectIngredient:(state,{payload}) => { state.ingredient = payload},

        selectIngredientTtitre:(state,{payload}) => {state.ingredientTitre = payload},

        getIngredients:(state,{payload}) => {state.ingredients = payload},

        deleteIngredientTitre:(state,{payload}) => {state.ingredients = state.ingredients.filter(item => item.ingredientTitreId !== payload)}

    }
})

export const createIngredientTitre = (payload) => async dispatch => {

    try {

        const ingredientTitre = await db.collection('ingredientsTitre').add({nom:payload.nom,titre:payload.titre,subArray:payload.subArray,ficheId:payload.ficheId,created:payload.created})
      
        await db.collection('ingredientsTitre').doc(ingredientTitre.id).update({ingredientTitreId:ingredientTitre.id})
        
        const ingredientTitreSaved = await db.collection('ingredientsTitre').doc(ingredientTitre.id).get()

        dispatch(addIngredientTitre(ingredientTitreSaved.data()))

    } catch (error) {
        
        console.log(error)
    }
}

export const createIngredient = (payload) => async dispatch => {

    try {

        const ingredient = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').add({

            nom:payload.nom,
            qte:payload.qte,
            prix:payload.prix,
            titre:payload.titre,
            ingredientTitreId:payload.ingredientTitreId,
            created:payload.created
        })

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').doc(ingredient.id).update({ingredientId:ingredient.id})

        const ingredientSaved = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').doc(ingredient.id).get();

       dispatch(addIngredientToSubArray(ingredientSaved.data()))

    } catch (error) {
        
        console.log(error)
    }
}   

export const addIngredientToSubArray = (payload) => async dispatch => {

    try {
        
        const ingredientTitre = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).get()

        let arr = await ingredientTitre.data().subArray

        await arr.push(payload)

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).update({subArray:arr})

        dispatch(getAndPatchIngredientTitre(payload))
       
    } catch (error) {
        
        console.log(error)
    }

}

export const removeIngredientTitre = (payload) =>  async dispatch => {

    try {

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).delete()

        dispatch(removeAllIngredients(payload))
        
    } catch (error) {
        
        console.log(error)
    }
}   

export const removeAllIngredients = (payload) => async dispatch => {

    try {

        const ingredients = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').where("ingredientTitreId","==", payload.ingredientTitreId).get()

        ingredients.forEach( async ingredient =>
            
            await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').doc(ingredient.data().ingredientId).delete()
        )

       dispatch(deleteIngredientTitre(payload.ingredientTitreId)) 
    
    } catch (error) {
        
        console.log(error)
    }
}

export const removeIngredient = (payload) => async dispatch => {

    try {

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').doc(payload.ingredientId).delete()

        dispatch(updateSubArray(payload))

    } catch (error) {
        
        console.log(error)
    }
}

export const getAndPatchIngredientTitre = (payload) => async dispatch => {

    try {

        const ingredientTitreSaved = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).get()
       
        dispatch(updateIngredientTitre(ingredientTitreSaved.data()))

    } catch (error) {
        
        console.log(error)
    }
}

export const updateSubArray = (payload) => async dispatch => {

    let arr = [];

    try {

        const ingredients = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').where('ingredientTitreId',"==",payload.ingredientTitreId).get()

        ingredients.forEach(ingre => {

            arr.push(ingre.data())
        })

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).update({subArray: arr})

        dispatch(getAndPatchIngredientTitre(payload))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const patchIngredient = (payload) => async dispatch => {

    try {

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).collection('ingredients').doc(payload.ingredientId).update({nom:payload.nom,qte:payload.qte,prix:payload.prix})

        dispatch(updateSubArray(payload))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const patchIngredientTitre = (payload) => async dispatch => {

    try {

        await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).update({nom:payload.nom})

        const ingredientTitreUpdated = await db.collection('ingredientsTitre').doc(payload.ingredientTitreId).get()

        dispatch(updateIngredientTitre(ingredientTitreUpdated.data()))
        
    } catch (error) {
        
        console.log(error)
    }
}

export const fetchIngredients = (payload) => async dispatch => {

    dispatch(setLoading(true))

    let arr = [];

    try {

        const ingredients = await db.collection('ingredientsTitre').where("ficheId","==",payload).get()

        if(ingredients.empty){

            console.log("no ingredients")

        } else {

            ingredients.forEach(ingredient => {

                arr.push(ingredient.data())
            })
        }

        dispatch(getIngredients(arr))

        dispatch(setLoading(false))

    } catch (error) {
        
        console.log(error)
    }
}


export const {getIngredients,addIngredientTitre,addIngredientSubArray,updateIngredientTitre,selectIngredient,
    selectIngredientTtitre,deleteIngredientTitre} = ingredientSlice.actions;

export const ingredientSelector = (state) => state.ingredientStore.ingredient;
export const ingredientsSelector = (state) => state.ingredientStore.ingredients;
export const ingredientTitreSelector = (state) => state.ingredientStore.ingredientTitre;


export default ingredientSlice.reducer