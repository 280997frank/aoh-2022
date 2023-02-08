import { FC } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, CollectionReference, query } from "firebase/firestore";
import { useCollectionData } from "react-firehooks";

import { TCompanyIntro, TContactPerson, TSocialMedia } from "@/types/contactUs";

import { db } from "@/connections/firebase";

import ContactPerson from "@/components/Molecules/ContactPerson";
import CompanyIntro from "@/components/Molecules/CompanyIntro";
import Layout from "@/components/Template/Layout";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const companyIntro = collection(
  db,
  "company-intro"
) as CollectionReference<TCompanyIntro>;
const contactPerson = collection(
  db,
  "contact-person"
) as CollectionReference<TContactPerson>;

const ContactUs: FC = () => {
  const [companyIntroData, companyIntroLoading] = useCollectionData(
    query(companyIntro),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );
  const [contactPersonData, contactPersonLoading] = useCollectionData(
    query(contactPerson),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

  return (
    <Layout title="Contact Us">
      <div
        style={{
          background: "#E7E6D0",
          minHeight: "100vh",
          padding: "12px",
        }}
      >
        <Heading
          fontSize={{ base: "2rem", lg: "3rem" }}
          fontWeight="bold"
          lineHeight={{ base: "2.75rem", lg: "4.125rem" }}
          color="brand.orange"
          textAlign="center"
          marginBottom={{ base: 10, lg: 20 }}
        >
          Contact Us
        </Heading>

        {companyIntroLoading ? (
          <Stack direction="column" align="center">
            <Skeleton
              width={{ base: 160, "2xl": 240 }}
              height={{ base: 160, "2xl": 240 }}
              borderRadius={16}
            />
            <Skeleton width="175px" height="38px" borderRadius={20} />
            <Skeleton
              height={{ base: "16px", lg: "22px" }}
              width={{ base: "100%", md: 480 }}
            />
            <Skeleton
              height={{ base: "16px", lg: "22px" }}
              width={{ base: "100%", md: 480 }}
            />
          </Stack>
        ) : (
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, xl: 20 }}
            justifyContent="center"
          >
            {companyIntroData?.map((companyIntro: TCompanyIntro) => (
              <CompanyIntro
                key={companyIntro.labelCta}
                companyIntro={companyIntro}
              />
            ))}
          </Flex>
        )}

        {/* <Flex justifyContent="center">
          <Box
            px={6}
            pt="12px"
            pb={2}
            mt={{ base: 10, lg: 20 }}
            mb={{ base: 4, "2xl": 4 }}
            backgroundColor="brand.green"
            borderRadius={20}
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", "2xl": "xl" }}
              lineHeight={{ base: "22px", "2xl": "27px" }}
              color="white"
              textTransform="uppercase"
            >
              Contact Details
            </Text>
          </Box>
        </Flex> */}

        {contactPersonLoading ? (
          <Stack direction="column" align="center">
            <Skeleton height={6} width="350px" />
            <Stack direction={{ base: "column", md: "row" }}>
              <Skeleton height={6} width={60} />
              <Skeleton height={6} width={60} />
            </Stack>
          </Stack>
        ) : (
          contactPersonData?.map(
            (contactPerson: TContactPerson, index: number) => (
              <ContactPerson key={index} contactPerson={contactPerson} />
            )
          )
        )}

        <Flex
          justifyContent="center"
          marginTop={{ base: 0, md: 10 }}
          paddingBottom={{ base: 10, md: 0 }}
          gap={4}
        >
          {contactPersonData?.[0].socialMedia?.map(
            (item: TSocialMedia, index: number) => (
              <IconButton
                key={index}
                borderRadius="full"
                backgroundColor="#F65438"
                color="white"
                aria-label={item.icon}
                _hover={{}}
                icon={
                  item.icon === "facebook messenger" ? (
                    <FaFacebookMessenger size={24} />
                  ) : item.icon === "instagram" ? (
                    <FaInstagram size={24} />
                  ) : item.icon === "twitter" ? (
                    <FaTwitter size={24} />
                  ) : item.icon === "youtube" ? (
                    <FaYoutube size={24} />
                  ) : item.icon === "facebook" ? (
                    <FaFacebookF size={24} />
                  ) : (
                    <span />
                  )
                }
                onClick={() => {
                  window.open(item.url, "_blank");
                }}
              />
            )
          )}
        </Flex>
      </div>
    </Layout>
  );
};

export default ContactUs;
