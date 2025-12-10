import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{repo: RepositoryItem}> = ({ repo }) => {
  return (
    <IonItem>
        <IonThumbnail slot='start'>
            <img src={repo.imageUrl || "https://i.pinimg.com/474x/9b/09/f0/9b09f0426b4e427c873c17dc85df1e2d.jpg"} alt={repo.name}/>
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
          </IonLabel>
    </IonItem>
  );
};

export default RepoItem; 