import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataHomePage from "../components/DataHomePage";
import HistoryData from "../firebase/HistoryData";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../config";
import SignIn from "../Auth/SignIn";
import GetAuth from "../firebase/GetAuth";

const HomePage = () => {
  const [userAuth, setUserAuth] = useState<User | null>(() => {
    // Initialize userAuth from local storage, if available
    const storedUserAuth = localStorage.getItem("userAuth");
    return storedUserAuth ? JSON.parse(storedUserAuth) : null;
  });

  const {} = HistoryData();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
        // Store userAuth in local storage
        localStorage.setItem("userAuth", JSON.stringify(user));
      } else {
        setUserAuth(null);
        // Remove userAuth from local storage
        localStorage.removeItem("userAuth");
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <Grid
      backgroundColor={"gray.200"}
      templateAreas={{
        base: '"main"', // for small devices; under 1024px
        lg: '"main"', // bigger than 1024px
      }}
    >
      <Show above="lg"> {/*to show it just in large screen lg*/}</Show>
      <GridItem area={"main"}>
        {userAuth ? (
          <>
            <DataHomePage />
          </>
        ) : (
          <SignIn />
        )}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
