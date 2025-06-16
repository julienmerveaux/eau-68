import {doc, updateDoc, arrayUnion, getDoc, arrayRemove, setDoc} from "firebase/firestore";
import {auth, db} from "@/firebase/firebase.config";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {userTest} from "@/userDonnéeTest"

const testExpoGo: boolean = false;


export async function signUpService(name: string, email: string, password: string) {
    if (!testExpoGo) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {displayName: name});

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
    } else {
        console.log("test")
        return userTest
    }

}


export async function loginService(email: string, password: string) {
    if (!testExpoGo) {
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
    } else {
        console.log("test")
        return userTest

    }
    // Connexion via Firebase Auth

}

export async function logoutService() {
    if (!testExpoGo) {
        try {
            await signOut(auth);
            console.log('Utilisateur déconnecté avec succès');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    } else {
        console.log("test")
        return null
    }

}

export async function addFavoriteCommune(commune: string) {
    if (!testExpoGo) {
        if (!commune || typeof commune !== 'string') {
            throw new Error('Nom de commune invalide');
        }

        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Utilisateur non connecté");

        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
            favorites: arrayUnion(commune),
        });
    } else {
        if (!userTest.favorites.includes(commune)) {
            userTest.favorites.push(commune);
        }
        return userTest
    }

}

export async function removeFavoriteCommune(communeNom: string) {
    if (!testExpoGo) {
        if (!auth.currentUser) {
            throw new Error("Utilisateur non connecté");
        }

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            favorites: arrayRemove(communeNom),
        });
    } else {
        const index = userTest.favorites.indexOf(communeNom);
        if (index !== -1) {
            userTest.favorites.splice(index, 1);
        }
    }

}