import { IonItem, IonLabel, IonThumbnail, IonIcon, IonItemSliding, IonItemOptions,IonItemOption } from '@ionic/react';
import './RepoItem.css';
import { useRef } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { trashOutline, createOutline } from 'ionicons/icons';

interface RepoItemProps {
  repo: RepositoryItem;
  onDelete?: () => void;
  onEdit?: () => void;
}

  

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
    const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

    const handleEditClick = async () => {
    await slidingRef.current?.close();
    onEdit?.();
  };

  const handleDeleteClick = async () => {
    await slidingRef.current?.close();
    onDelete?.();
  };


  return (
    <IonItemSliding ref={slidingRef}>

      {/* ITEM VISIBLE */}
      <IonItem>
        <IonThumbnail slot="start">
          <img
            src={
              repo.imageUrl ||
              'https://i.pinimg.com/474x/9b/09/f0/9b09f0426b4e427c873c17dc85df1e2d.jpg'
            }
            alt={repo.name}
          />
        </IonThumbnail>

        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>
      </IonItem>

      {/* OPCIONES OCULTAS (SLIDE) */}
      <IonItemOptions side="end">

        <IonItemOption color="primary" onClick={handleEditClick}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>

        <IonItemOption color="danger" onClick={handleDeleteClick}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>

      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;