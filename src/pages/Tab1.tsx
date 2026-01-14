import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewDidEnter, IonAlert } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import {trashOutline, createOutline} from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]> ([]); 

  //ADICIÓN IMPORTANTE: usar spinners o LoadStateBars
  
  //Declarar función para leer los repositorios desde el Service 
  const loadRepos = async ()=>{
    const reposData = await fetchRepositories();
    setRepos (reposData);
  };

  //ADD: Alerta de eliminación con hooks: useState + useHistory
   const [showAlert, setShowAlert] = useState(false);
   const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);
   const history = useHistory();



  //Función OnResume pero en Ionic, para lectura de repositorios
  useIonViewDidEnter(()=>{
    console.log("IonViewDidEnter - Cargando Repositorios"); 
    loadRepos();
  }); 

          
   // ADD: Llamar a Delete
  const handleDelete = async () => {
    if (!selectedRepo) return;

    try {
      await deleteRepository(
        selectedRepo.owner.login,
        selectedRepo.name
      );
      setRepos(prev =>
        prev.filter(repo => repo.id !== selectedRepo.id)
      );
    } catch (error) {
      console.error('Error eliminando repositorio', error);
    }
  };

  //ADD: Llamar a Edit
  const handleEdit = (repo: RepositoryItem) => {
    history.push(`/edit/${repo.name}`);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>



        <IonList>
          /*Iterar en el comoponente de RepoItem, mapearlo con index*/
          {repos.map((repo,index)=>(
            <RepoItem
            key={index}
            repo={repo}
            onDelete={() => {
                setSelectedRepo(repo);
                setShowAlert(true);
              }}
            onEdit={() => handleEdit(repo)}
            />
          ))}
        </IonList>
        
        //Alerta para el Delete 
        <IonAlert>
          isOpen={showAlert}
          header="Eliminar repositorio"
          message="¿Deseas eliminar este repositorio?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: handleDelete
            }
          ]}
          onDidDismiss={() => setShowAlert(false)}
        </IonAlert>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
