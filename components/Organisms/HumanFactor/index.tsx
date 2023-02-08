import ContentDetail from "@/components/Molecules/ContentDetail";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Image,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { db } from "@/connections/firebase";
import { SoldierShowcaseProps } from "@/interfaces/solder-showcase";
import ShowCase from "@/components/Organisms/ShowCaseLeap";

const HumanFactor: FC<SoldierShowcaseProps> = ({
  preDesign,
  data,
  firstPrototype,
  finalProduct,
}) => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  return (
    <Box>
      <Tabs colorScheme="green">
        <Center>
          <TabList
            // overflow={isDesktop ? "undefined" : "scroll"}
            overflowX={isDesktop ? "hidden" : "hidden"}
            maxW={isDesktop ? "unset" : "100%"}
            overflowY="hidden"
            ml={isDesktop ? "none" : "none"}
            borderBottom="none"
            fontSize={{ base: "sm", md: "lg" }}
            gap={{ base: 4, md: 7 }}
            alignContent="center"
            alignItems="center"
          >
            <Tab
              borderBottom="none"
              color="#C0BE9A"
              _focus={{}}
              _active={{ borderBottom: "none" }}
              // minWidth={{ base: 100, md: 200 }}
              _selected={{
                color: "brand.crete",
              }}
              p="2"
              pt="0"
              pb="0"
            >
              <Text
                fontSize={{ base: 12, md: "md" }}
                // minWidth={{ base: 100, md: 200 }}
                fontWeight="bold"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                PRE-DESIGN
              </Text>
            </Tab>
            <Tab
              // minW="222px"
              p="2"
              pt="0"
              pb="0"
              borderBottom="none"
              color="#C0BE9A"
              _focus={{}}
              // minWidth={{ base: 100, md: 200 }}
              _active={{ borderBottom: "none" }}
              _selected={{
                color: "brand.crete",
              }}
            >
              <Text
                fontSize={{ base: 12, md: "md" }}
                // minWidth={{ base: 100, md: 200 }}
                fontWeight="bold"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                FIRST PROTOTYPE
              </Text>
            </Tab>
            <Tab
              // minW="222px"
              p="2"
              pt="0"
              pb="0"
              borderBottom="none"
              color="#C0BE9A"
              // minWidth={{ base: 150, md: 200 }}
              _focus={{}}
              _active={{ borderBottom: "none" }}
              _selected={{
                color: "brand.crete",
              }}
            >
              <Text
                fontSize={{ base: 12, md: "md" }}
                // minWidth={{ base: 150, md: 200 }}
                fontWeight="bold"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                FINAL DESIGN
              </Text>
            </Tab>
          </TabList>
        </Center>

        <TabPanels paddingTop={{ base: "20px", md: "40px" }}>
          <TabPanel>
            <ContentDetail color="#747e2f">
              {preDesign.type === "image" ? (
                <AspectRatio ratio={16 / 9}>
                  <Img
                    __css={{
                      objectFit: "contain !important",
                    }}
                    src={preDesign.url}
                    width="100%"
                    alt="image"
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9}>
                  <video controls controlsList="nodownload" width="100%">
                    <source src={preDesign.url} />
                  </video>
                </AspectRatio>
              )}
            </ContentDetail>
            <Box mt="30px" mb="20px" paddingBottom={"20px"}>
              <ContentDetail>
                <Text
                  color="#2E4924"
                  dangerouslySetInnerHTML={{
                    __html: preDesign.description,
                  }}
                />
              </ContentDetail>
            </Box>
          </TabPanel>
          <TabPanel>
            <ShowCase data={firstPrototype} />
          </TabPanel>
          <TabPanel>
            <ShowCase data={finalProduct} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HumanFactor;
