import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/lelogo3.png";

const NavBar = () => {
  return (
    <HStack padding="10px">
      {/*to write in horizantle*/}
      <Image src={logo} width={150} />
      <Text>Nav bar</Text>
    </HStack>
  );
};

export default NavBar;
