import { createContext, useState, useEffect, useCallback } from "react";
import firebase from 'firebase/app';
import "firebase/auth";

const LoginContext = createContext({loggedIn: false});

function WithLogin({children}) {
  const [state, login] = useLogin();

  // TODO use Redirect from "react-router-dom" to redirect to login page instead of button
  return (
    <LoginContext.Provider value={state}>
      <LoginContext.Consumer>
        { ({loggedIn, user}) =>
            (loggedIn && children) ||
            (!loggedIn && <LoginButton onClick={login}/>)
        }
      </LoginContext.Consumer>
    </LoginContext.Provider>
  );
}

function useLogin() {
  const [ state, setState ] = useState({
    loggedIn: false,
    user: undefined,
    userName: undefined
  });

  useEffect(() => {
    const loginState = localStorage.getItem('loginState');
    if (loginState)
      setState(JSON.parse(loginState));
  }, []);

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const loginState = {
          loggedIn: true,
          user: result.user.email,
          userName: result.user.displayName
        };
        localStorage.setItem('loginState', JSON.stringify(loginState));
        setState(loginState);
      }).catch((error) => {
        console.error(error);
      });
  }, [setState]);

  return [state, () => login()];
}

function LoginButton({onClick}) {
  return <button onClick={onClick}>Login</button>
}

export { LoginContext, WithLogin };
