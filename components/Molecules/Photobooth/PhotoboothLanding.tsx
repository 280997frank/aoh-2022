import Button from "@/components/Atoms/Button";
import { snapshotOptions } from "@/constants/collection/core";
import { photoboothDoc } from "@/constants/collection/photobooth";
import { TPhotoboothLandingProps } from "@/types/photobooth";
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks";

const PhotoboothLanding: TPhotoboothLandingProps = ({ onNextSection }) => {
  const toast = useToast();
  const [isAgree, setIsAgree] = useState(false);

  const [data, loading, error] = useDocumentData(
    photoboothDoc,
    snapshotOptions
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  if (loading) {
    return (
      <Flex flexDir="column" align="center" gridGap={8} p={6}>
        <Skeleton height="350px" width="100%" />
        <Skeleton height={6} width="300px" />
        <Skeleton height="100px" width="100%" />
        <Skeleton height="40px" width="300px" />
      </Flex>
    );
  }

  return (
    <Fragment>
      {data && (
        <Flex
          flexDir="column"
          p={6}
          alignItems="center"
          textAlign="center"
          gridGap={8}
        >
          <Image src={data.image} alt="phoneImage" width="600px" />
          <Heading
            color="brand.green"
            as="h2"
            fontWeight=" 700"
            fontSize="24px"
            lineHeight="26px"
          >
            {data.title}
          </Heading>
          <Text
            fontWeight="400"
            fontSize="14px"
            lineHeight="19px"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
          <Flex width="100%" gridGap={2}>
            <Checkbox
              borderColor="brand.jaffa"
              iconColor="brand.orange"
              size="md"
              sx={{
                "& .chakra-checkbox__control": {
                  background: "transparent !important",
                  border: "1px solid #ED703E",
                },
              }}
              isChecked={isAgree}
              onChange={() => {
                setIsAgree(!isAgree);
              }}
            />
            <Text
              fontSize={{
                base: "13px",
                md: "14px",
              }}
            >
              I have read and agree to the
              <Link href={data?.tncFile} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <Text as="u" ml={1} cursor="pointer" color="#ED703E">
                    Terms and Conditions
                  </Text>
                </a>
              </Link>
            </Text>
          </Flex>
          <Box width="300px">
            <Button
              bgColor="brand.jaffa"
              onClick={() => onNextSection()}
              disabled={!isAgree}
            >
              {data.btnSnap}
            </Button>
          </Box>
        </Flex>
      )}
    </Fragment>
  );
};

export default PhotoboothLanding;
