import React, { useEffect, useState } from "react";
import TimeSelector from "../components/TimeSelector";
import StatsPageHeure from "./StatsPageHeure";
import StatsPageJour from "./StatsPageJour";
import StatsPageSem from "./StatsPageMois";
import StatsPageMois from "./StatsPageMois";
import Formulaire from "../formulaire/Formulaire";
import DialogForm from "./DialogForm";
import { CanceledError } from "axios";
import { ref, onValue } from "firebase/database";
import { db } from "../../config";
import axiosClient from "../firebase/axios-client";
import { useParams } from "react-router-dom";
import StatsPageAnn from "./StatsPageAnn";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { auth } from "../../config";
import { User, onAuthStateChanged } from "firebase/auth";
import SignIn from "../Auth/SignIn";

interface Data {
  Reference: string;
  bonne: number;
  client: string;
  faible: number;
  moyenne: number;
  id: string;
  // Add other properties if needed
}

const StatsPageTime = () => {
  const [Time, setTime] = useState("");
  const { id } = useParams();

  const [userAuth, setUserAuth] = useState<User | null>(() => {
    // Initialize userAuth from local storage, if available
    const storedUserAuth = localStorage.getItem("userAuth");
    return storedUserAuth ? JSON.parse(storedUserAuth) : null;
  });

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
    <>
      {userAuth ? (
        <>
          <Flex alignItems="center" paddingX={5} paddingY={7}>
            <Box>
              <Link to={"/"}>
                <MdArrowBackIosNew size={30} />
              </Link>
            </Box>

            <Box position="absolute" left="53%" transform="translateX(-50%)">
              <TimeSelector
                onTimeSet={(a: string) => {
                  setTime(a);
                }}
              />
            </Box>
          </Flex>

          <HStack justifyContent="space-between" alignItems="center">
            <Box>
              <DialogForm
                onSubmit={(data) => {
                  data.id = id;
                  data.timestamp = Date.now();
                  axiosClient
                    .put(
                      "/zo3wpezaASdJEwL9saNdRp7fKQ93/client/" +
                        id +
                        ".json?auth=bOwevX8JzXtka7iPE1eFIUoAMr4AoavrLfkYAPd8",
                      { data }
                    )
                    .then((res) => {
                      // console.log("going data");
                      //console.log(res.data);
                    })
                    .catch((err) => {
                      if (err instanceof CanceledError) return;
                    });
                }}
              />
            </Box>
            <Box marginX={7}>
              <Text as="kbd" fontSize="lg">
                Chaine {id}
              </Text>
            </Box>
          </HStack>
          {Time === "jour" ? <StatsPageHeure /> : null}
          {/* {Time === "jour" ? <StatsPageJour /> : null} */}
          {Time === "mois" ? <StatsPageMois /> : null}
          {Time === "année" ? <StatsPageAnn /> : null}
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default StatsPageTime;
