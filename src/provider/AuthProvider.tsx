import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import { auth } from '../config/firebaseConfig';
import { BaseFunctionComponent } from '../common/BaseComponent';

export const AuthProvider: BaseFunctionComponent = (props) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
};
