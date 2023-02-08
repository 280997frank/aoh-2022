import {
  Stack,
  HStack,
  VStack,
  Box,
  Flex,
  Icon,
  Img,
  Heading,
  Text,
  SimpleGrid,
  Skeleton,
  Checkbox,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";

import { useTermsAndConditions } from "@/hooks/tickets";

import Button from "@/components/Atoms/Button";
import BookingForm from "@/components/Molecules/BookingForm";

import type { FC } from "react";

interface BookingFormContainerProps {
  venue: string;
  title: string;
  description: string;
}

const BookingFormContainer: FC<BookingFormContainerProps> = ({
  venue,
  title,
  description,
}) => {
  const [isMdOrLarger] = useMediaQuery("(min-width: 48em)");
  const [isAgreeToTnC, setAgreeToTnC] = useState(false);
  const [isAgreeToAdvisory, setAgreeToAdvisory] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [imgContainerWidth, setImgContainerWidth] = useState("auto");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [registerPage, loading] = useTermsAndConditions();
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setImgContainerSize = () => {
      if (imgContainerRef.current && isMdOrLarger) {
        setImgContainerWidth(`${imgContainerRef.current.offsetHeight}px`);
      }
    };

    setImgContainerSize();

    window.addEventListener("resize", setImgContainerSize, false);

    return () => {
      window.removeEventListener("resize", setImgContainerSize, false);
    };
  }, [isMdOrLarger]);

  useEffect(() => {
    if (registerPage) {
      setCheckboxes([registerPage.tnc, registerPage.advisory]);
    }
  }, [registerPage]);

  return (
    <>
      <Stack gap={0} direction={{ base: "column", lg: "row" }}>
        <Flex
          flex={`0 1 ${imgContainerWidth}`}
          justifyContent="center"
          ref={imgContainerRef}
        >
          <Img
            borderTopLeftRadius="2xl"
            borderTopRightRadius={{ base: "2xl", lg: 0 }}
            borderBottomLeftRadius={{ base: 0, lg: "2xl" }}
            src="/images/aoh-visual.jpg"
            htmlWidth="1999"
            htmlHeight="1124"
            m="0 !important"
            w="full"
            h="full"
            objectFit="cover"
            sx={{
              "@media screen and (orientation: portrait)": {
                // height: "100%",
                width: "auto",
              },
            }}
          />
        </Flex>
        <Box
          flex="0 1 0"
          bgColor="white"
          w="full"
          borderBottomLeftRadius={{ base: "2xl", lg: 0 }}
          borderBottomRightRadius="2xl"
          borderTopRightRadius={{ base: 0, lg: "2xl" }}
          p={{ base: 8, md: 4, xl: 6 }}
          m="0 !important"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
            <Box w={{ md: "90%" }}>
              <Heading
                color="brand.green"
                fontWeight="bold"
                fontSize="2rem"
                mb={4}
              >
                {title}
              </Heading>
              <Text color="brand.green" mb={2}>
                <Icon as={RiMapPin2Fill} color="brand.orange" />
                &nbsp;
                {venue}
              </Text>
              <Text color="brand.green">
                <Icon as={BiCalendar} color="brand.orange" />
                &nbsp;
                {description}
              </Text>
            </Box>
            <Box my={{ base: 8, md: 0 }}>
              <BookingForm
                setSubmitting={setSubmitting}
                isSubmitting={isSubmitting}
                venue={venue}
                title={title}
              />
            </Box>
          </SimpleGrid>
          <VStack
            gap={0}
            m={{
              base: "1rem 0 !important",
              md: "2rem 0 !important",
            }}
          >
            {checkboxes.map((checkbox, index) => {
              let isAgree = index === 0 ? isAgreeToTnC : isAgreeToAdvisory;
              let setAgree = index === 0 ? setAgreeToTnC : setAgreeToAdvisory;

              return (
                <HStack key={checkbox} w="full">
                  <Checkbox
                    alignItems="flex-start"
                    iconColor="brand.orange"
                    size="md"
                    sx={{
                      "& .chakra-checkbox__control": {
                        background: "white !important",
                        borderColor: "#E5E5E5 !important",
                        borderRadius: "base",
                      },
                    }}
                    isChecked={isAgree}
                    onChange={() => {
                      setAgree(!isAgree);
                    }}
                  >
                    <Skeleton isLoaded={!loading}>
                      <Text
                        as="span"
                        color="brand.green"
                        lineHeight={{
                          base: "1rem",
                          md: "1.375rem",
                        }}
                        fontSize={{
                          base: "xs",
                          md: "md",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: checkbox,
                        }}
                      />
                    </Skeleton>
                  </Checkbox>
                </HStack>
              );
            })}
          </VStack>
          <Stack
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            alignItems="flex-end"
          >
            {/* <Box
              id="g-recaptcha"
              // className="g-recaptcha"
              // data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              // data-callback="onSuccessfulReCaptcha"
              // data-expired-callback="onExpiredReCaptcha"
              // data-error-callback="onErrorReCaptcha"
            /> */}
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
              onChange={window.onSuccessfulReCaptcha}
              onExpired={window.onExpiredReCaptcha}
              onErrored={window.onErrorReCaptcha}
            />
            <Box width="full">
              <Button
                bgColor="brand.orange"
                type="submit"
                form="booking-form"
                disabled={!isAgreeToTnC || !isAgreeToAdvisory}
                isLoading={isSubmitting}
              >
                BOOK TICKETS
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default BookingFormContainer;
