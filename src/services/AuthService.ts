//La variable tiene una clave que está en comillas, las cuales van a almacenar strings de username y password en el localStorage, sólo para el uso necesario
const TOKEN_KEY= "github_auth_token";
const USERNAME_KEY= "github_auth_username";

class AuthService {
    login (username: string, token:string){
        //Se utilizan dos componentes, un login que obtiene datos en las claves, y el logout que utiliza un remove para borrarlas
        if (username && token){
            this.logout(); //usa el componente logout para remover contraseñas previas ingresadas
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(TOKEN_KEY, token);
            return true;
        }
        return false;
    }

    logout (){
            localStorage.removeItem(USERNAME_KEY);
            localStorage.removeItem(TOKEN_KEY);    
        }

    //Verificación si existe: user + si se autenticó o no
        isAuthenticated (): boolean {
            return localStorage.getItem(TOKEN_KEY) !==null
                && localStorage.getItem(USERNAME_KEY) !==null;
        }

    //Se crean funciones para obtener token y username por separado 
    getToken (){
        return localStorage.getItem(TOKEN_KEY);
    }

    getUsername (){
        return localStorage.getItem(USERNAME_KEY);
    }

    //Función para agregar headers a cada petición
    getAuthHeader (){
        const token = this.getToken();
        const username = this.getUsername();

        if (token && username) {
            return 'Basic ' + btoa(username + ':' + token);
        }
        return null;
    }
}
export default new AuthService();