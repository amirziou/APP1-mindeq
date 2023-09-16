import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../config";
import { useParams } from "react-router-dom";

const GetAuth = () => {
  const [userAuth, setUserAuth] = useState<User | null>(() => {
    // Initialize userAuth from local storage, if available
    const storedUserAuth = localStorage.getItem("userAuth");
    return storedUserAuth ? JSON.parse(storedUserAuth) : null;
  });

  const uid = userAuth?.uid;

  return { uid };
};

export default GetAuth;
