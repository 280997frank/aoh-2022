import React from "react";
import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import SeparateArrowRight from "@/assets/images/ns55-showcase/separate_arrow_right.png";
interface IBackgroundNsItem {
  imageRightPosition?: boolean;
  data: {
    year: string;
    image?: string;
    title?: string;
    description?: string;
  };
}

const BackgroundNsItem = ({
  imageRightPosition = true,
  data: { year, image, title, description },
}: IBackgroundNsItem) => {
  if (imageRightPosition) {
    return (
      <Grid
        mt="-1px"
        w="100%"
        display="grid"
        gridTemplateAreas={{
          base: " 'year image image' 'year text text' ",
          md: " 'text year image'",
        }}
        gridTemplateColumns={{ base: "100px 1fr", md: "1fr 120px 1fr" }}
      >
        <GridItem
          gridArea="year"
          position="relative"
          bg="#2E4924"
          w={{ base: "100px", md: "120px" }}
          display="flex"
          flexDir="column"
          rowSpan={2}
          minH="100px"
        >
          {!title && !description ? (
            <Heading
              // mr="40px"
              color="white"
              fontSize={{ base: "2.3rem", md: "3rem" }}
              fontWeight="bold"
              pos="absolute"
              w={{ base: "70%", md: "75%" }}
              zIndex="2"
              left={{ base: "0", md: "0" }}
            >
              {year}
            </Heading>
          ) : (
            <Heading
              mr="30px"
              color="white"
              fontSize={
                image
                  ? { base: "2.3rem", md: "3rem" }
                  : { base: "1.2rem", md: "1.5rem" }
              }
              fontWeight="bold"
              pb={{ base: "20px", md: "30px" }}
              top={{ base: "0", md: "unset" }}
              bottom={{ base: "unset", md: "20px" }}
              css={
                image
                  ? {
                      position: "static",
                    }
                  : {
                      position: "absolute",
                      // bottom: "20px",
                      right: "0",
                    }
              }
            >
              {year}
            </Heading>
          )}
        </GridItem>
        {image && (
          <Box
            gridArea="image"
            w="100%"
            pos="relative"
            h="fit-content"
            // transform={{ base: "translateX(-10px)", md: "translateX(0)" }}
            pb={{ base: "20px", md: "30px" }}
          >
            <Image
              opacity=".7"
              width="auto"
              maxW="100%"
              src={image}
              alt={image}
            />
            <Image
              display={{ base: "block", md: "none" }}
              w={{ base: "100px", md: "140px" }}
              position="absolute"
              right={{ base: "unset", md: "-112px" }}
              left={{ base: "-120px", md: "unset" }}
              bottom="10px"
              src={SeparateArrowRight.src}
              alt="separate-arrow"
            />
          </Box>
        )}
        {title && description && (
          <Box
            gridArea="text"
            pos="relative"
            w="100%"
            minH="100px"
            pl="10px"
            pr="25px"
            pb={{ base: "20px", md: "30px" }}
          >
            <Heading
              fontSize={{ base: "1rem", md: "1.8rem" }}
              color="brand.green"
            >
              <Text dangerouslySetInnerHTML={{ __html: title }} />
            </Heading>
            <Text fontSize={{ base: ".9rem" }}>{description}</Text>
            <Image
              display={image ? { base: "none", md: "block" } : "block"}
              w={{ base: "100px", md: "140px" }}
              position="absolute"
              right={{ base: "unset", md: "-112px" }}
              left={{ base: "-120px", md: "unset" }}
              bottom={{ base: "unset", md: "20px" }}
              top={{ base: "20px", md: "unset" }}
              src={SeparateArrowRight.src}
              alt="separate-arrow"
            />
          </Box>
        )}
      </Grid>
    );
  }
  return (
    <Grid
      mt="-1px"
      w="100%"
      display="grid"
      gridTemplateAreas={{
        base: " 'year image image' 'year text text' ",
        md: " 'image year text'",
      }}
      gridTemplateColumns={{ base: "100px 1fr", md: "1fr 120px 1fr" }}
    >
      <GridItem
        gridArea="year"
        bg="#2E4924"
        w={{ base: "100px", md: "120px" }}
        display="flex"
        flexDir="column"
        rowSpan={2}
        position="relative"
        minH={{ base: "60px", md: "2.5vw" }}
      >
        {!title && !description ? (
          <Heading
            // mr="40px"
            color="white"
            fontSize={{ base: "2.3rem", md: "3rem" }}
            fontWeight="bold"
            pos="absolute"
            w={{ base: "70%", md: "75%" }}
            zIndex="2"
            top={{ base: "-70px", md: "unset" }}
            right={{ base: "unset", md: "0" }}
            left={{ base: "0", md: "unset" }}
          >
            {year}
          </Heading>
        ) : (
          <Heading
            ml={{ base: "0", md: "30px" }}
            mr={{ base: "30px", md: "0" }}
            color="white"
            fontSize={
              image
                ? { base: "2.3rem", md: "3rem" }
                : { base: "1.2rem", md: "1.5rem" }
            }
            fontWeight="bold"
            textAlign={{ base: "left", md: "left" }}
            pb={{ base: "20px", md: "30px" }}
            top={{ base: "0", md: "unset" }}
            bottom={{ base: "unset", md: "20px" }}
            left={{ base: "25px", md: "0" }}
            css={
              image
                ? {
                    position: "static",
                  }
                : {
                    position: "absolute",
                  }
            }
          >
            {year}
          </Heading>
        )}
      </GridItem>
      {image && (
        <Box
          gridArea="image"
          w="100%"
          pos="relative"
          // h="fit-content"
          display="flex"
          alignItems="flex-end"
          minH="130px"
          // transform={{
          //   base: "translateX(-10px)",
          //   md: "translateX(0px)",
          // }}
          pb={{ base: "20px", md: "30px" }}
        >
          <Image opacity=".7" width="100%" src={image} alt={image} />
          <Image
            display={{ base: "block", md: "none" }}
            w={{ base: "100px", md: "140px" }}
            position="absolute"
            transform={{ base: "scaleX(1)", md: "scaleX(-1)" }}
            left={{ base: "-110px", md: "-112px" }}
            // right={{ base: "-110px", md: "unset" }}
            bottom="10px"
            src={SeparateArrowRight.src}
            alt="separate-arrow"
          />
        </Box>
      )}
      {title && description && (
        <Box
          gridArea="text"
          w="100%"
          pl={{ base: "10px", md: "25px" }}
          pr="10px"
          pb={{ base: "20px", md: "30px" }}
          position="relative"
          minH="100px"
        >
          <Heading
            fontSize={{ base: "1rem", md: "1.8rem" }}
            color="brand.green"
          >
            <Text dangerouslySetInnerHTML={{ __html: title }} />
          </Heading>
          <Text fontSize={{ base: ".9rem" }}>{description}</Text>
          <Image
            display={image ? { base: "none", md: "block" } : "block"}
            w={{ base: "100px", md: "140px" }}
            position="absolute"
            transform={{ base: "scaleX(1)", md: "scaleX(-1)" }}
            top={{ base: "20px", md: "unset" }}
            left={{ base: "-120px", md: "-112px" }}
            // right={{ base: "-110px", md: "unset" }}
            bottom="20px"
            src={SeparateArrowRight.src}
            alt="separate-arrow"
          />
        </Box>
      )}
    </Grid>
  );
};

export default BackgroundNsItem;
