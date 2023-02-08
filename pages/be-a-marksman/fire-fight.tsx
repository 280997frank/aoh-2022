import LineBreak from "@/components/Atoms/LineBreak";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { useOnClickTracking } from "@/hooks/trackings";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useDocumentData } from "react-firehooks";

const marksmanCollection = collection(
  db,
  "be-a-marksman"
) as CollectionReference<{
  pageTitle: string;
  title: string;
  description: string;
  images: string[];
}>;

const FireFight = () => {
  const toast = useToast();

  const [data, loading, error] = useDocumentData(
    doc(marksmanCollection, "fire-fight"),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
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

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/be-a-marksman/fire-fight",
      title: "Fire Fight",
    },
  });

  return (
    <Layout title="Fire Fight" withBackButton>
      <Box
        className="content"
        width={{
          base: "100%",
          md: "74%",
        }}
        height="100%"
        margin="0 auto"
        marginTop={{
          base: "20px",
          md: "100px",
        }}
      >
        <Box
          width="100%"
          my={{
            base: 8,
            md: 16,
          }}
        >
          <Heading
            fontWeight="bold"
            fontSize={{
              base: "24px",
              md: "38px",
            }}
            color="brand.green"
            lineHeight="52px"
            as="h1"
            textAlign="center"
            dangerouslySetInnerHTML={{ __html: data?.pageTitle || "" }}
          />
          {/* {data && <SwiperMarksman images={data.images} />} */}
        </Box>
        <Box
          pb={8}
          px={{
            base: 8,
            md: 0,
          }}
        >
          {/* <Divider
            my={{
              base: 8,
              md: 12,
            }}
            borderColor="#C0BE9A"
          /> */}
          <Heading
            color="brand.brown"
            as="h2"
            fontWeight="700"
            fontSize={{
              base: "18px",
              md: "28px",
            }}
            lineHeight={{
              base: "21px",
              md: "38px",
            }}
            mb={3}
          >
            {data?.title}
          </Heading>
          <Text
            fontWeight="400"
            fontSize={{
              base: "14px",
              md: "21px",
            }}
            lineHeight={{
              base: "19px",
              md: "29px",
            }}
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            sx={{
              "& ul": {
                paddingLeft: "2rem",
              },
            }}
          />
        </Box>
        <Box width="100%">
          <LineBreak />
        </Box>
      </Box>
    </Layout>
  );
};

export default FireFight;
