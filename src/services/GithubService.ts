import axios from "axios"; 
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

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
            direction: "desc",
            affiliation: "owner"
            }

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

    export const createRepository = async (repo: RepositoryItem) : Promise<void> => {
        try {
            const response = await axios.post (`${GITHUB_API_URL}/user/repos`, repo, {
                headers:{
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                } });
                console.log ("Repositorio ingresado", response.data);
            }
            catch (error) {
                console.error ("Error al crear repositorio", error);
            }
    };

    
    //Función para obtener datos de usuario desde GitHub
    export const getUserInfo = async () : Promise<UserInfo> => {
        try {
            const response = await axios.get(`${GITHUB_API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_URL}`,
                }
            });
            return response.data as UserInfo;
        }
        catch (error){
            console.error ("Error al obtener información del usuario", error);
            const userNotFound : UserInfo ={
                login: 'undefined', 
                name: 'Usuario no encontrado', 
                bio: 'No se pudo obtener la información del usuario', 
                avatar_url: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
            }
            return userNotFound;
        }
    };