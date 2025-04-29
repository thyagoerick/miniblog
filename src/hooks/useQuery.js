import { useLocation } from "react-router-dom";
import { useMemo } from "react"; 

/** useMemo:
 * Ele basicamente pode fazer duas coisas:
 * 
 * 1 - Performance da aplicação, onde queremos que o retorno do valor fique salvo e não temos a reexecução dessa função desnecessáriamente, apenas quando precisarmos;
 * 
 * 2 - Conseguimos referenciar um objeto, para que seja possível fazer a comparação dele por aquele objeto, como se tivesse um id, como se o obj JS tivesse uma chave unica, permitindo saber se ele foi modificado, por exemplo. Não são objs com o mesmo valor.
 * 
 * Os objs JS podem ser declarados por referência ou por atribuição. Ex:
 * - Atribuição (dois obj com o mesmo valor, mas não são iguais):
 *      cosnt a = {}
 *      const b = {}
 * As vezes queremos saber quando estamos alterando a e quando estamos alterando b, e podemos fazer isso com useMemo.
 */

// Agora vamos utilizar na questão de cachear o valor para performance, e só executar esse hook quando for realmente necessário, quando a busca mudar

export function useQuery () {
    const {search} = useLocation() // pega os parametros da URL

    return useMemo(() => new URLSearchParams(search), [search]) // a função só será executada quando o search for alterado

}