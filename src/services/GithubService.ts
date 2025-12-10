import axios from "axios"; 
import { RepositoryItem } from "../interfaces/RepositoryItem";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_TOKEN = "ghp_XXXXXXXXXXXXXXXXXXXXXXXX";

//Llamada a la API con Axios: try-catch
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try{
        //Autorización a repos por user y token
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {Authorization: `Bearer ${GITHUB_API_TOKEN}`, 
    },
        //Parámetros de consulta (cómo se despliegan los repos en la página)
        params:{
            per_page: 100,
            sort: "created",
            direction: "desc"}

        }); 
        
        //Serialización ( data en json)/Deserialización (map)
        const repositories: RepositoryItem[] = response.data.map((repo:any)=>({
            name:repo.name,
            description: repo.description ? repo.description : null,
            owner: repo.owner ? repo.owner.login : null,
            language : repo.language ? repo.language : null,
        })); 

        return repositories; 

    //Gestión de errores: mensaje 
    } catch (error){
            console.error("Hubo un error al obtener el repositorio", error);
            return [];
        }
    }