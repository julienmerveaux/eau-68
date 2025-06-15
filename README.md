# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


3. Créer un fichier .env et y copier le contenu du fichier .env.example.

Vous trouverez dans ce fichier les valeurs nécessaires à la configuration de Firebase utilisées dans firebase/firebase.config.ts.

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