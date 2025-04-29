import {auth} from '../firebase/config' // permite utilizar funções de autenticação

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup [instrução] - não deixar resquicio de funções sendo executadas, então ele serve para não ter problema de limite de memória, já que vamos ter muitas mudanças de componentes entre páginas
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false) // useState que cancela as ações futuras do componente, inicia como não cancelada, pois será cancelada quando as coisas derem certo



    //cleanup - pra evitar vazamento de memória
    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }


    // Register
    const createUser = async (data) => {
        checkIfIsCancelled() //cleanup
        
        setLoading(true)
        setError(null)

        //cadastrando um usuário na base de autenticação do firebase
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            //para atualizarmos o nome do usuario pois para cadastrar só utilizamos o email e senha, aí precisamos atualizar o nome depois que o usuario está cadastrado, é assim q o firebase funciona nesse caso
            await updateProfile(user, { 
                displayName: data.displayName
            })

            setLoading(false)

            return user;

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage);
        }
    };

    //logout - sing out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    };

    // login - sign in
    const login = async(data) => {
        checkIfIsCancelled();
        
        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {
            console.log('error',error);
            
            let systemErrorMessage;
            if(error.code === "auth/invalid-credential") {
                systemErrorMessage = "Credenciais inválidas! Verifique o e-mail e a senha."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde. "+error.message
                console.log('error.message',error.message);
            }

            setError(systemErrorMessage)
            setLoading(false)

        }
    }


    // Precisamos ter um useEffect que será executado apenas uma vez, para colocar o cancelled como true assim que sairmos da página
    useEffect(()=>{
        return () => setCancelled(true); // faz com q não tenhamos memory leak, permitindo termos um app mais performatico nas requisições do react
    },[])



    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }

}

