import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore";


//estado inicial do reducer
const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "DELETED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}



export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState)

    //deal with memory leak
    //const [cancelled, setCancelled] = useState(false)
    
    // const checkCancelBeforeDispatch = (action) => {
    //     if(!cancelled){
    //         dispatch(action)
    //     }
    // }

    const deleteDocument = async (id) => {
        dispatch({ type: "LOADING" });
        let active = true;

        // checkCancelBeforeDispatch({
        //     type:"LOADING",
        // })
        
        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
           
            
            if (active) {
                dispatch({ type: "DELETED_DOC", payload: deletedDocument });
            }
            // checkCancelBeforeDispatch({
            //     type:"INSERT_DOC",
            //     payload: insertedDocument
            // })

        } catch (error) {
            if (active) {
                dispatch({ type: "ERROR", payload: error.message });
            }
            // checkCancelBeforeDispatch({
            //     type:"ERROR",
            //     payload: error.message,
            // })
        }

        return () => {
            active = false;
        };
    }


    // // Precisamos ter um useEffect que será executado apenas uma vez, para colocar o cancelled como true assim que sairmos da página
    // useEffect(()=>{
    //     return () => setCancelled(true); // faz com q não tenhamos memory leak, permitindo termos um app mais performatico nas requisições do react
    // },[])

    return {deleteDocument, response}

}