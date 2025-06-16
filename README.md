# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Crée un compte expo et se connecter via le lien suivant : https://expo.dev/signup


Vous trouverez dans ce fichier les valeurs nécessaires à la configuration de Firebase utilisées dans firebase/firebase.config.ts.

2. Install dependencies

   ```bash
   npm install
   ```

3. Créer un fichier .env et y copier le contenu du fichier .env.example.

Vous trouverez dans ce fichier les valeurs nécessaires à la configuration de Firebase utilisées dans firebase/firebase.config.ts.

4. Start the app

   ```bash
   npx expo start
   ```

Un terminal va s’ouvrir, patientez un instant, un QR code apparaîtra.

    Sur iOS : ouvrez l’appareil photo ou un lecteur de QR code, puis scannez le code.

    Sur Android : je ne suis pas certain, mais selon la documentation, vous pouvez utiliser l’application Expo Go pour scanner le QR code ou bien un lecteur de QR tiers.
## Structure du code et choix techniques
### Structure du code

Le projet est structuré en plusieurs dossiers :
- app/ Regroupe les composants réutilisables ainsi que les routes utilisées pour la navigation.
- app/(tabs) Regroupe les pages du projet ainsi qu’un fichier _layout.tsx qui sert de routeur principal pour Expo.
- app/components Contient les composants réutilisables de l’application.
- firebase/firebase.config.ts Gère la connexion à Firebase ainsi qu’à la base de données Firestore.
- interface/interface.ts Regroupe les interfaces de structures de données exportables pour être réutilisées dans l’ensemble de l’application
- services/apiHubeau.ts Contient le service permettant de récupérer les données au format JSON via l’API Hubeau
- services/firebaseAuth.ts Contient le service permettant d’interagir avec l’API Firebase pour la connexion, l’inscription et les autres opérations liées à l’authentification ou la base de donnée firestore.
- store/... les stores sert à stocker et partager des données entre plusieurs parties de l’application, sans avoir à les transmettre manuellement à chaque fois.

### Choix techniques
- React-native + expo + expo-routeur + expo go
- TypeScript pour bénéficier du typage statique.
- firebase pour  l’authentification et la base de données temps réel.
- zustand bibliothèque légère et simple pour gérer l’état de l’application.

> ⚠️ Expo Go ne supporte pas l’authentification Firebase, comme le montre la pièce jointe de l’e-mail.

Si vous souhaitez malgré tout utiliser Expo, j’ai créé un système permettant de simuler une authentification.
Allez dans services/firebaseAuth et changer la valeur de ***testExpoGo*** en True
et commenté la ligne en mettant // devant
> import {auth, db} from "@/firebase/firebase.config";



Si la valeur est à false, l'application utilisera Firebase : il faudra donc tester l'authentification sur le web.
En revanche, si la valeur est à true, l'authentification est simulée localement vous pourrez utiliser Expo GO