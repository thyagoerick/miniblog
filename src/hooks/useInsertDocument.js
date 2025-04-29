import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config'
import { collection, addDoc, Timestamp} from "firebase/firestore";


//estado inicial do reducer
const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "INSERT_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}



export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState)

    //deal with memory leak
    //const [cancelled, setCancelled] = useState(false)
    
    // const checkCancelBeforeDispatch = (action) => {
    //     if(!cancelled){
    //         dispatch(action)
    //     }
    // }

    const insertDocument = async (document) => {
        dispatch({ type: "LOADING" });
        let active = true;

        // checkCancelBeforeDispatch({
        //     type:"LOADING",
        // })
        
        try {
            
            const newDocument =  {...document, createdAt: Timestamp.now()};

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );
            
            if (active) {
                dispatch({ type: "INSERT_DOC", payload: insertedDocument });
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

    return {insertDocument, response}

}