import React from "react";
import { Text, Heading, Image, Box } from "@chakra-ui/react";
import { TLayout } from "@/types/venueInfo";

const VenueInfoLayout = ({ label }: TLayout) => {
  return (
    <Box pl="20rem" pr="20rem">
      <Heading
        fontSize={{ base: "2rem", lg: "3rem" }}
        fontWeight="bold"
        lineHeight={{ base: "2.75rem", lg: "4.125rem" }}
        color="#2E4924"
        textAlign="center"
        marginBottom={{ base: 10, lg: 10 }}
      >
        {label}
      </Heading>
      <Image
        boxSize="100%"
        objectFit="cover"
        src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/dummy%2FFrame%2017.png?alt=media&token=f6d494b9-8dcb-49da-ac26-bc63f8b9f18f"
        alt=""
      />
      <Heading fontSize={28} color="#F65438" pt={10} pb={5}>
        INFORMATION
      </Heading>
      <Text color="#2E4924" fontWeight={500} fontSize={21} lineHeight="29px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
        rhoncus dolor purus non enim praesent elementum facilisis leo, vel
        fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis
        enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra
        orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae
        tortor condimentum. Lacinia quis vel eros donec ac odio tempor orci
        dapibus ultrices in iaculis nunc sed augue lacus, viverra vitaemin
        congue eu, consequat ac felis donec et odio pellentesque diam volutpat
        commodo sed egestas egestas fringillaet phasellus faucibus.
      </Text>
    </Box>
  );
};

export default VenueInfoLayout;
