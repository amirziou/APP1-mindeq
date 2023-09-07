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
  const [error, setError] = useState(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
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
                  {/* <FormHelperText textAlign="right">
                    <Link to={""}>Mot de passe oublié?</Link>
                  </FormHelperText> */}
                </FormControl>
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
        {/* <Box>
          Contactez nous!
          
          <Link color="#009688" to={"/#"}>
            Sign Up
          </Link>
        </Box> */}
        <AuthUser />
      </Flex>

      {/* <div>
        <form onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Sign In</Button>
          {error && <p>{error}</p>}
        </form>
      </div> */}
    </>
  );
};

export default SignIn;
