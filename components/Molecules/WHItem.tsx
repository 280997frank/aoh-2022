import {
  Box,
  VStack,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  useMediaQuery,
  chakra,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import SessionCard from "@/components/Atoms/SessionCard";
import SessionList from "@/components/Atoms/SessionList";
import CarouselGroupDot from "@/components/Atoms/CarouselGroupDot";
import ArrowLeftCircle from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";

import type { FC } from "react";
import type { Session } from "@/interfaces/sessions";

dayjs.extend(customParseFormat);

interface WHItemProps {
  timeSlots: Session["timeSlots"];
}

function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

const ChakrafiedSlider = chakra(Slider);
const ChakrafiedCarouselProvider = chakra(CarouselProvider);
const ARROW_BUTTON_SIZE = {
  w: { base: "2rem", lg: "2.5rem" },
  h: { base: "2rem", lg: "2.5rem" },
};

const WHItem: FC<WHItemProps> = ({ timeSlots }) => {
  // const sliderRef = useRef(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [tabIndex, setTabIndex] = useState(0);

  const dateList = useMemo(() => {
    return timeSlots.map(({ date }) => date).filter(onlyUnique);
  }, [timeSlots]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box>
      <Tabs
        isLazy
        variant="unstyled"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList justifyContent="center">
          {dateList.map((date) => (
            <Tab
              key={date}
              _selected={{ color: "brand.orange" }}
              color="brand.option"
              fontWeight="bold"
              fontSize={{ base: "0.9375rem", lg: "lg" }}
              textTransform="uppercase"
            >
              {dayjs(date, "DD-MM-YYYY").format("DD MMM")}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {dateList.map((date) => {
            const dailyTimeSlots = timeSlots.filter(
              (timeSlot) => timeSlot.date === date
            );
            const keyEventsList = dailyTimeSlots.filter(
              ({ category }) => category?.toLowerCase() === "key events"
            );
            const mainStageList = dailyTimeSlots.filter(
              ({ category }) => category?.toLowerCase() === "main stage"
            );
            const competitionsList = dailyTimeSlots.filter(
              ({ category }) => category?.toLowerCase() === "competitions"
            );

            return (
              <TabPanel
                key={date}
                bgImage={{ base: "none", lg: "/images/clouds.png" }}
                bgPos="center -5%"
                backgroundSize="100% auto"
                backgroundRepeat="no-repeat"
                px={0}
              >
                <ChakrafiedCarouselProvider
                  naturalSlideWidth={300}
                  naturalSlideHeight={300}
                  totalSlides={keyEventsList.length}
                  visibleSlides={
                    isMobile ? 1 : Math.min(keyEventsList.length, 3)
                  }
                  infinite
                  isIntrinsicHeight
                  touchEnabled={keyEventsList.length > 1}
                  // className="session-carousel" // .carousel
                  bgImage='url("/images/running-track.png")'
                  backgroundSize="100% auto"
                  backgroundPosition={{
                    base: "center 90%",
                    "2xl": "center bottom",
                  }}
                  backgroundRepeat="no-repeat"
                  margin="auto"
                  w={{ "2xl": "75%" }}
                  sx={{
                    "& .carousel__slider-tray-wrapper": {
                      width: {
                        lg: "58rem",
                      },
                      margin: "auto",
                      overflow: "hidden",
                    },
                    "& .carousel__dot--selected > *": {
                      backgroundColor: "#ed703e",
                    },
                  }}
                >
                  <Flex>
                    <VStack
                      justifyContent="center"
                      visibility={{
                        base: keyEventsList.length > 1 ? "visible" : "hidden",
                        lg: keyEventsList.length > 3 ? "visible" : "hidden",
                      }}
                    >
                      <ButtonBack>
                        <ArrowLeftCircle {...ARROW_BUTTON_SIZE} />
                      </ButtonBack>
                    </VStack>
                    <ChakrafiedSlider flex="1">
                      {/* ^ .carousel__slider */}
                      {keyEventsList.map((timeSlot, index, array) => (
                        <Slide
                          key={`${timeSlot.title} ${timeSlot.startTime} ${timeSlot.endTime}`}
                          index={index}
                          // className="session-card"
                        >
                          <SessionCard
                            {...timeSlot}
                            isSingleItem={array.length === 2 && !isMobile}
                          />
                        </Slide>
                      ))}
                    </ChakrafiedSlider>
                    <VStack
                      justifyContent="center"
                      visibility={{
                        base: keyEventsList.length > 1 ? "visible" : "hidden",
                        lg: keyEventsList.length > 3 ? "visible" : "hidden",
                      }}
                    >
                      <ButtonNext>
                        <ArrowRightCircle {...ARROW_BUTTON_SIZE} />
                      </ButtonNext>
                    </VStack>
                  </Flex>
                  <Box
                    textAlign="center"
                    mt={{ base: 8, lg: 20 }}
                    visibility={{
                      base: keyEventsList.length > 1 ? "visible" : "hidden",
                      lg: keyEventsList.length > 3 ? "visible" : "hidden",
                    }}
                  >
                    <DotGroup
                      renderDots={(props) => <CarouselGroupDot {...props} />}
                    />
                  </Box>
                </ChakrafiedCarouselProvider>
                <Box mt={4} mb={8}>
                  <Link
                    href="#schedule"
                    borderRadius="2.1875rem"
                    border="1px solid #F65438"
                    fontWeight="bold"
                    fontSize="lg"
                    color={{ base: "#FBFAE5", lg: "brand.orange" }}
                    bgColor={{ base: "brand.orange", lg: "transparent" }}
                    display="block"
                    w="20rem"
                    textAlign="center"
                    margin="0 auto"
                    lineHeight="2.5rem"
                    sx={{
                      "@supports (-webkit-touch-callout: none)": {
                        paddingTop: "0.3rem",
                      },
                    }}
                  >
                    FIND OUT MORE
                  </Link>
                </Box>
                <VStack
                  id="schedule"
                  w={{ base: "90vw", lg: "50vw" }}
                  maxW="full"
                  m="0 auto 2rem"
                  gap={4}
                >
                  {keyEventsList.length && (
                    <SessionList caption="Key Events" data={keyEventsList} />
                  )}
                  {mainStageList.length && (
                    <SessionList caption="Main Stage" data={mainStageList} />
                  )}
                  {competitionsList.length && (
                    <SessionList
                      caption="Competitions"
                      data={competitionsList}
                    />
                  )}
                </VStack>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WHItem;
