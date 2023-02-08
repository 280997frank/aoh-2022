import React, { FC } from "react";
import { Box, Divider, Flex, Link, Text } from "@chakra-ui/react";

import { TContactPerson } from "@/types/contactUs";

const ContactPerson: FC<{
  contactPerson: TContactPerson;
}> = ({ contactPerson }) => {
  return (
    <Flex direction="column" align="center" marginBottom={4}>
      <Flex gap={{ base: 2, md: 4 }} align="center">
        <Link
          href={`mailto:${contactPerson.emailUs.url}`}
          px={6}
          pt={{
            base: "10px",
            lg: "8px",
            "2xl": "12px",
          }}
          pb={2}
          mt={{ base: 10, lg: 20 }}
          mb={{ base: 4, "2xl": 4 }}
          backgroundColor="#F65438"
          borderRadius="full"
          target="_blank"
          fontWeight="bold"
          fontSize={{ base: "sm", "2xl": "xl" }}
          lineHeight={{ base: "sm", "2xl": "27px" }}
          color="white"
          textTransform="uppercase"
          _hover={{}}
        >
          {contactPerson.emailUs.label}
        </Link>
        {/* <Divider orientation="vertical" height="18px" borderColor="black" /> */}

        <Link
          px={6}
          pt={{
            base: "10px",
            lg: "8px",
            "2xl": "12px",
          }}
          pb={2}
          mt={{ base: 10, lg: 20 }}
          mb={{ base: 4, "2xl": 4 }}
          backgroundColor="#F65438"
          borderRadius="full"
          href={contactPerson.feedback.url}
          target="_blank"
          fontWeight="bold"
          fontSize={{ base: "sm", "2xl": "xl" }}
          lineHeight={{ base: "sm", "2xl": "27px" }}
          color="white"
          textTransform="uppercase"
          _hover={{}}
        >
          {contactPerson.feedback.label}
        </Link>
      </Flex>
    </Flex>
  );
};

export default ContactPerson;
