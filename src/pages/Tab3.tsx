import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" src="https://avatars.githubusercontent.com/u/191817345?v=4" />
      <IonCardHeader>
        <IonCardTitle>Sophie Chuquillangui</IonCardTitle>
        <IonCardSubtitle>SophieChuquillangui</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Soy Diseñadora Gráfica y estudiante de Ingeniería en Informática, entusiasta por los avances
del mundo moderno y comprometida con el aprendizaje continuo. Me motiva crecer tanto a nivel personal como profesional, aplicando mi conocimiento
para resolver problemas reales con creatividad y responsabilidad. 
</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
