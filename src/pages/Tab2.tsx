import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonTextarea} from '@ionic/react';

import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  //Hook: Use History 
  const history = useHistory ();
  //Declaración del nuevo Item
  const repoFormData : RepositoryItem ={
    name: '',
    description:  '',
    imageUrl:  null, 
    owner:  null,
    language: null,
  };

  //Setting de name y description en el componente anterior (es nuevo, ergo, se pedirá al usuario)
  //Ambas funciones se van a conectar al input 
  const setRepoName= (value:string) => {
    repoFormData.name = value
  };
  const setRepoDescription= (value:string) => {
    repoFormData.description = value
  };
  //Función para guardar el repositorio - Verificación de Campo Fill
  const saveRepository = () => {
    if (repoFormData.name.trim() ===  ''){
      alert ( 'El nombre del repositorio es obligatorio');
      return;
    }
  //Catch llamada para gestión de errores 
    createRepository(repoFormData)
    .then(() => {history.push ( '/tab1');})
    .catch (() => {
      alert ( 'Error al crear el repositorio');
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          
                <IonInput label="Nombre del Repositorio" 
                labelPlacement="floating" fill="outline" 
                placeholder="android-project"
                className='form-field'
                //Input para RepoForm Name (*e=event, es un status que cambia), conecta con las funciones de arriba
                value={repoFormData.name}
                onIonChange={(e) => setRepoName (e.detail.value!)}>
                </IonInput>

                <IonTextarea label="Descripción del Repositorio" 
                labelPlacement="floating" fill="outline" 
                placeholder="Este es un repositorio de Android"
                className='form-field'
                //Input para RepoForm Name (*e=event, es un status que cambia), conecta con las funciones de arriba
                value={repoFormData.description}
                onIonChange={(e) => setRepoDescription (e.detail.value!)}
                rows={6}>
                  
                  </IonTextarea>
                  <IonButton expand='block' className= 'form-field' onClick={saveRepository}>
                    Guardar
                  </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
