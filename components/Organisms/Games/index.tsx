import {
  Box,
  Heading,
  Img,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { actions as gameActions } from "@/states/game/slice";

const Games = () => {
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      w={"100%"}
      h="100%"
      paddingTop={{ base: "0", md: "30vh" }}
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      zIndex={10}
      position="absolute"
    >
      <Heading
        as="h1"
        fontSize={{
          base: "24px",
          md: "40px",
        }}
        color="brand.orange"
        margin="20px 0"
      >
        VIRTUAL GAMES
      </Heading>
      {/* <Text
        color="#2E4924"
        fontSize={{
          base: "14px",
          md: "16px",
        }}
        width={{
          base: "80%",
          md: "95%",
        }}
        margin={"20px 0"}
        textAlign="center"
      >
        Try out our interactive games here! Be the Top 5 players of each game
        daily to win attractive prizes!
      </Text> */}
      {isMobile ? (
        <VStack
          marginTop={{
            base: 5,
            md: 20,
          }}
        >
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="absolute"
              display="flex"
              flexDir="row"
              w="75%"
              top="-5"
              justifyContent="space-between"
            >
              <Img
                cursor="pointer"
                h={100}
                onClick={() => dispatch(gameActions.setGame("droneFlying"))}
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fdrone-racer.png?alt=media&token=b4f1403e-4684-43ff-90c4-9c0c71e6db84"
              />
              <Img
                cursor="pointer"
                h={100}
                onClick={() =>
                  dispatch(gameActions.setGame("obstacleSpeedRacer"))
                }
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fbattle-driver.png?alt=media&token=5fe0290b-5c70-447c-9386-7d7dbf579983"
              />
              <Img
                cursor="pointer"
                h={100}
                onClick={() => dispatch(gameActions.setGame("spotSoldier"))}
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fspot-soldier.png?alt=media&token=9f2d5375-10c3-4e3a-a584-fb21fbe857ec"
              />
            </Box>
            <Img src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fmobile-card1.png?alt=media&token=4342786f-38c6-4e39-8fdb-54095f5ae65c" />
          </Box>
          <Box position="relative" display="flex" justifyContent="center">
            <Img src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fmobile-card2.png?alt=media&token=abf49b61-b559-4083-af1b-40880d606e1c" />
            <Box
              position="absolute"
              display="flex"
              flexDir="row"
              w="60%"
              top="-5"
              justifyContent="space-around"
              alignItems="center"
            >
              <Img
                cursor="pointer"
                h={100}
                onClick={() => dispatch(gameActions.setGame("sar21Shooting"))}
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fwatch-your-front.png?alt=media&token=9fb73aab-39dc-445b-b457-03d688652169"
              />
              <Img
                cursor="pointer"
                h={100}
                onClick={() => dispatch(gameActions.setGame("obstacleCourse"))}
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fobstacle-runner.png?alt=media&token=a24c98fa-ee38-4591-bfcf-f5329af381f3"
              />
            </Box>
          </Box>
        </VStack>
      ) : (
        <>
          <Img
            paddingTop="20"
            src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2FScroll%20Pages_R8_games%20floor%20copy%201.png?alt=media&token=fee375c7-3eec-497d-9046-2cafaa04edca"
          />
          <Box
            position="absolute"
            display="flex"
            flexDir="row"
            w="80%"
            justifyContent="space-between"
          >
            <Img
              cursor="pointer"
              h={300}
              onClick={() => dispatch(gameActions.setGame("droneFlying"))}
              src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fdrone-racer.png?alt=media&token=b4f1403e-4684-43ff-90c4-9c0c71e6db84"
            />
            <Img
              cursor="pointer"
              h={300}
              onClick={() =>
                dispatch(gameActions.setGame("obstacleSpeedRacer"))
              }
              src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fbattle-driver.png?alt=media&token=5fe0290b-5c70-447c-9386-7d7dbf579983"
            />
            <Img
              cursor="pointer"
              h={300}
              onClick={() => dispatch(gameActions.setGame("spotSoldier"))}
              src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fspot-soldier.png?alt=media&token=9f2d5375-10c3-4e3a-a584-fb21fbe857ec"
            />
            <Img
              cursor="pointer"
              h={300}
              onClick={() => dispatch(gameActions.setGame("sar21Shooting"))}
              src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fwatch-your-front.png?alt=media&token=9fb73aab-39dc-445b-b457-03d688652169"
            />
            <Img
              cursor="pointer"
              h={300}
              onClick={() => dispatch(gameActions.setGame("obstacleCourse"))}
              src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fobstacle-runner.png?alt=media&token=a24c98fa-ee38-4591-bfcf-f5329af381f3"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Games;
