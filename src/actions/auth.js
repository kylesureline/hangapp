import { firebase } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
};

export const startLogin = (email, password) => {
  return () => {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password);
  }
}

export const startSignup = (email, password) => {
  return () => {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password);
  }
}
