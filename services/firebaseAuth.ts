import {doc, updateDoc, arrayUnion, getDoc, arrayRemove, setDoc} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export async function signUpService(name: string, email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        favorites: [], // tableau vide au départ
        createdAt: new Date()
    });

    return {
        id: user.uid,
        name,
        email,
    };
}

export async function loginService(email: string, password: string) {
    // Connexion via Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupération du document Firestore lié à cet utilisateur
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        throw new Error("Aucun document utilisateur trouvé dans Firestore.");
    }

    const userData = userDocSnap.data();

    return {
        id: user.uid,
        name: userData.name || '', // ou displayName si tu l’utilises
        email: user.email || '',
        favorites: userData.favorites || [],
    };
}

export async function logoutService() {
    try {
        await signOut(auth);
        console.log('Utilisateur déconnecté avec succès');
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        throw error;
    }
}

export async function addFavoriteCommune(commune: string) {
    if (!commune || typeof commune !== 'string') {
        throw new Error('Nom de commune invalide');
    }

    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Utilisateur non connecté");

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
        favorites: arrayUnion(commune),
    });
}

export async function removeFavoriteCommune(communeNom: string) {
    if (!auth.currentUser) {
        throw new Error("Utilisateur non connecté");
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
        favorites: arrayRemove(communeNom),
    });
}