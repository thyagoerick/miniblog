import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetail from '../../components/PostDetail';
import { Link } from 'react-router-dom';


const Search = () => {

    const query = useQuery();
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <h1>Resultados encontrados para: {search}</h1>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados postas a partir da sua busca</p>
                        <Link to='/' className='btn btn_dark'>Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default Search
