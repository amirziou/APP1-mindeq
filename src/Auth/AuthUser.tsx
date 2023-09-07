import { useEffect, useState } from "react";
import { auth } from "../../config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthUser = () => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    if (userAuth) {
      navigate("/");
    }
  }, [userAuth]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out success");
      })
      .catch((error) => console.log(error));
  };

  // if (userAuth) {
  //   return (<div>{"you are signed in"}</div>);
  // } else {
  //   return <div>{"you are Signed out"}</div>;
  // }
  return null;
};

export default AuthUser;
