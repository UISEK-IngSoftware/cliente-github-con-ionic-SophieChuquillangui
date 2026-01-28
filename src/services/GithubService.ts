import axios from "axios"; 
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const githubApi = axios.create ({
    baseURL: GITHUB_API_URL,
   });

//INTERCEPTORES: headers con autorización 
githubApi.interceptors.request.use ((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//Llamada a la API con Axios: try-catch
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try{
        //Autorización a repos por user y token
        const response = await githubApi.get(`/user/repos`,{
        //Parámetros de consulta (cómo se despliegan los repos en la página)
        params:{
            per_page: 100,
            sort: "created",
            direction: "desc",
            affiliation: "owner",
            t: Date.now()
            }

        }); 
        
        //Serialización ( data en json)/Deserialización (map)
        const repositories: RepositoryItem[] = response.data.map((repo:any)=>({
            name:repo.name,
            description: repo.description ? repo.description : null,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language ? repo.language : null,
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
            const response = await githubApi.post (`/user/repos`, repo);
                console.log ("Repositorio ingresado", response.data);
            }
            catch (error) {
                console.error ("Error al crear repositorio", error);
            }
    };

    
    //Función para obtener datos de usuario desde GitHub
    export const getUserInfo = async () : Promise<UserInfo | null> => {
        try {
            const response = await githubApi.get(`/user`);
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

    //Delete method base 
    export const deleteRepository = (
        owner: string,
        repoName: string
        ) => {
        return githubApi.delete(`/repos/${owner}/${repoName}`);
 };

    //Patch method (same as before)
    export const updateRepository = (
        owner: string,
        repoName: string,
        data: {
            name?: string;
            description?: string;
            private?: boolean;
        }
        ) => {
        return githubApi.patch(`/repos/${owner}/${repoName}`, data);
    };
