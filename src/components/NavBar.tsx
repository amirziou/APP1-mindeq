import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/lelogo3.png";

const NavBar = () => {
  return (
    <HStack padding="10px" backgroundColor={"gray.200"}>
      {/*to write in horizantle*/}
      <Image src={logo} width={150} />
      <Text></Text>
    </HStack>
  );
};

export default NavBar;
