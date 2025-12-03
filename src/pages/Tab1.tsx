import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
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
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <RepoItem
            name="android-project"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1745px-Android_robot.svg.png"
          />
          <RepoItem
            name="ios-project"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvh-j7HsTHJ8ZckknAoiZMx9VcFmsFkv72g&s"
          />
          <RepoItem
            name="ionic-project"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqJZuk231xDvLafBXK6I47B32mywaPb-4GBw&s"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
