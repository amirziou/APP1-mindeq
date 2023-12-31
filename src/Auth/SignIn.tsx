import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import AuthUser from "./AuthUser";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        console.log(error);
        setError("Email ou mot de passe incorrect.");
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="80vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="140"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Bonjour</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSignIn}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="adresse email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="mot de passe"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem" marginX={1}>
                      <Button
                        h="1.75rem"
                        w="4.5rem"
                        size="sm"
                        onClick={handleShowClick}
                      >
                        {showPassword ? "Cacher" : "Montrer"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {error && (
                  <h6 style={{ fontSize: "12px", color: "red" }}>{error}</h6>
                )}
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Connecter
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>

        <AuthUser />
      </Flex>
    </>
  );
};

export default SignIn;
