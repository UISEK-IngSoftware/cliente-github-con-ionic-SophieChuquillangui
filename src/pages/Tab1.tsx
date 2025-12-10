import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewDidEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { useState } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]> ([]); 

  //Declarar función para leer los repositorios desde el Service 
  const loadRepos = async ()=>{
    const reposData = await fetchRepositories();
    setRepos (reposData);
  };

  //Función OnResume pero en Ionic, para lectura de repositorios
  useIonViewDidEnter(()=>{
    console.log("IonViewDidEnter - Cargando Repositorios"); 
    loadRepos();
  }); 

          //Iterar en el comoponente de RepoItem, mapearlo con index

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
          {repos.map((repo,index)=>(
            <RepoItem
            key={index}
            repo={repo}
           />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
