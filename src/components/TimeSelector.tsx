import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
const TimeSelector = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList display="flex" justifyContent="center" alignItems="center">
        <Tab>Heure</Tab>
        <Tab>Jour</Tab>
        <Tab>Semaine</Tab>
        <Tab>Mois</Tab>
      </TabList>
      <TabPanels>
        {/* <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};

export default TimeSelector;
