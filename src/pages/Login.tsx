import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import { useState } from "react";
import './Login.css';
import AuthService from "../services/AuthService";

//En todos los siguientes componentes, el factor en común es que, aparte de crear el componente, se le añade también un className.
//Esto sirve para controlar estilos del componente conectando con el css, padding, márgenes, etc. de forma más personalizada y modular
const Login: React.FC = () => {
    
    const [username, setUsername] = useState ('');
    const [token, setToken] = useState ('');
    const [error, setError] = useState ('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username || !token) {
            setError ('Por favor, igresa tu usuario y token de GitHub');
            return;
        }
        const success = AuthService.login (username,token);
        if (success){
            window.location.href = '/tab1';
        } else {
            setError ('Error al iniciar sesión');
        }
    };

return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    Login
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className= "ion-padding">
            <div className= "login-container">
                <IonIcon icon={logoGithub} className= "login-logo"/>
                <h1>Inicio de sesión GitHub</h1>
                <form className = "login-form" onSubmit= {handleLogin}> 
                    <IonInput className= "login-field"
                    label="Usuario de GitHub"
                    labelPlacement= "floating"
                    fill= "outline"
                    type= "text"
                    value= {username}
                    onIonInput={e => setUsername(e.detail.value!)}
                    required></IonInput>

                    <IonInput className= "login-field"
                    label="Token de GitHub"
                    labelPlacement= "floating"
                    fill= "outline"
                    type= "password"
                    value= {token}
                    onIonInput={e => setToken(e.detail.value!)}
                    required></IonInput>

                    {error && (
                        <IonText color="danger" className="error-message">
                            {error}
                            </IonText>
                    )}

                    <IonButton expand= "block" type= "submit">
                        Iniciar Sesión
                    </IonButton>

                    <IonText color= "medium" className= "login-hint">
                        <p>Ingresa tu usuario y tu Token de GitHub</p>
                    </IonText>

                </form>
            </div>
        </IonContent>
    </IonPage>
);
}
export default Login;