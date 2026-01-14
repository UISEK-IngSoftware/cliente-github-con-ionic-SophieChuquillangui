import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonLoading
} from '@ionic/react';

import './EditRepo.css';

import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { updateRepository, getUserInfo } from '../services/GithubService';

interface RouteParams {
  repoName: string;
}

const EditRepo: React.FC = () => {
  const { repoName } = useParams<RouteParams>();
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState<string | null>(null);

  // Obtener el owner desde el usuario autenticado
  useEffect(() => {
    const loadUser = async () => {
      const user = await getUserInfo();
      if (user) {
        setOwner(user.login);
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    if (!owner) return;

    setLoading(true);
    try {
      await updateRepository(owner, repoName, {
        description
      });
      history.push('/tab1');
    } catch (error) {
      console.error('Error actualizando repositorio', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Repositorio</IonLabel>
          <IonInput value={repoName} disabled />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput
            value={description}
            onIonChange={e => setDescription(e.detail.value!)}
            placeholder="Nueva descripción"
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleUpdate}
          disabled={!description}
        >
          Guardar cambios
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="medium"
          onClick={() => history.goBack()}
        >
          Cancelar
        </IonButton>

        <IonLoading isOpen={loading} message="Actualizando..." />
      </IonContent>
    </IonPage>
  );
};

export default EditRepo;
