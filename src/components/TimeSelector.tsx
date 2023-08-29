import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  onTimeSet: (arg0: string) => void;
}

const TimeSelector = ({ onTimeSet }: Props) => {
  const tabs = ["jour", "mois", "année"];
  const [selectedTab, setSelectedTab] = useState<string>(
    localStorage.getItem("selectedTab") || tabs[0]
  );

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
    onTimeSet(selectedTab); // Call onTimeSet when selectedTab changes
  }, [selectedTab, onTimeSet]);

  useEffect(() => {
    // Call onTimeSet when the component mounts to trigger it on refresh
    onTimeSet(selectedTab);
  }, []); // Empty dependency array to trigger once on mount

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      marginY={8}
      index={tabs.indexOf(selectedTab)}
      onChange={(index) => setSelectedTab(tabs[index])}
    >
      <TabList display="flex" justifyContent="center" alignItems="center">
        {tabs.map((tab) => (
          <Tab key={tab} onClick={() => onTimeSet(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TimeSelector;
