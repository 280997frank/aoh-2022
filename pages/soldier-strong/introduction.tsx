import BackButton from "@/components/Atoms/BackButton";
import LineBreak from "@/components/Atoms/LineBreak";
import ISPPContent from "@/components/Organisms/introduction/Ispp";
import ProfessionalisingArmyTrainingContent from "@/components/Organisms/introduction/ProfessionalisingArmyTraining";
import SBRContent from "@/components/Organisms/introduction/Sbr";
import ServiceFitnessTrainingContent from "@/components/Organisms/introduction/ServiceFitnessTraining";
import SoldierStrongProgrammeContent from "@/components/Organisms/introduction/SoldierStrongProgramme";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { IIntroductionItem } from "@/types/introduction";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { Fragment, useCallback } from "react";
import { useDocumentData } from "react-firehooks/firestore";
import { useOnClickTracking } from "@/hooks/trackings";

interface IIntroductionData {
  soldierStrongProgramme: IIntroductionItem[];
  strongBodyRegime: IIntroductionItem[];
  integratedSoldierPerformanceProgramme: IIntroductionItem[];
  professionalisingArmyTraining: IIntroductionItem[];
  serviceFitFitnessTraining: IIntroductionItem[];
}

const Introduction = () => {
  const route = useRouter();
  const req = collection(
    db,
    "soldier-strong"
  ) as CollectionReference<IIntroductionData>;
  const [data, loading, error] = useDocumentData(doc(req, "introduction"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const backButton = useCallback(() => {
    route.push("/soldier-strong");
  }, [route]);

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/introduction",
      title: "Soldier Strong Introduction",
    },
  });

  return (
    <Layout title="Soldier Strong Introduction">
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        <BackButton
          withLabel
          top={["85px", "145px"]}
          left={["-10px", "0"]}
          isFloating
        />
        <Tabs colorScheme="green">
          <Center>
            <TabList
              // bg="salmon"
              flexDir="row"
              borderBottom="none"
              ml={{ base: "50px", md: "0" }}
              w="auto"
              overflowX="auto"
              overflowY="hidden"
              zIndex="sticky"
            >
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
              >
                <Text
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Professionalising
                  <br />
                  Army Training
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
              >
                <Text
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Integrated Soldier
                  <br />
                  Performance Programme (ISPP)
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
              >
                <Text
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Strong Body
                  <br />
                  Regime (SBR)
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
              >
                <Text
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Soldier Strong
                  <br />
                  Programme
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
              >
                <Text
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Service-fit Fitness
                  <br />
                  Training
                </Text>
              </Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              {data && (
                <Fragment>
                  <ProfessionalisingArmyTrainingContent
                    data={data.professionalisingArmyTraining}
                  />
                  <LineBreak />
                </Fragment>
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Fragment>
                  <ISPPContent
                    data={data.integratedSoldierPerformanceProgramme}
                  />
                  <LineBreak />
                </Fragment>
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Fragment>
                  <SBRContent data={data.strongBodyRegime} />
                  <LineBreak />
                </Fragment>
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Fragment>
                  <SoldierStrongProgrammeContent
                    data={data.soldierStrongProgramme}
                  />
                  <LineBreak />
                </Fragment>
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Fragment>
                  <ServiceFitnessTrainingContent
                    data={data.serviceFitFitnessTraining}
                  />
                  <LineBreak />
                </Fragment>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Introduction;
