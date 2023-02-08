import { snapshotOptions } from "@/constants/collection/core";
import { kidsZoneSocialMedia } from "@/constants/collection/social-media-wall";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDocumentData } from "react-firehooks";
import { Helmet } from "react-helmet";

const GallerySection: React.FC<{ zoneArmy?: string }> = ({
  zoneArmy = "kids-zone",
}) => {
  const toast = useToast();

  const [data, loading, error] = useDocumentData(
    kidsZoneSocialMedia,
    snapshotOptions
  );

  const getColorZone = (zone?: string) => {
    switch (zone) {
      case "kids-zone":
        return "brand.pink";
      case "platform":
        return "brand.jaffa";

      default:
        return "brand.pink";
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Box className="content" width="1000px" height="100%" margin="0 auto">
      <Box marginBottom={3} pt={20}>
        <Heading
          fontWeight="700"
          fontSize="38px"
          color="brand.green"
          w="full"
          lineHeight="46px"
          as="h1"
          textAlign="center"
          mb={2}
        >
          SOCIAL MEDIA WALL
        </Heading>
        <Heading
          fontWeight="700"
          fontSize="24px"
          color={getColorZone(zoneArmy)}
          w="full"
          as="h4"
          textAlign="center"
          lineHeight="124%"
        >
          {zoneArmy === "kids-zone" ? "#AOH22" : "#ReadyDecisiveRespected"}
        </Heading>
      </Box>
      {data && (
        <Box className="application" pt={3}>
          <Helmet>
            {data.scripts?.map((script, index) => (
              <script src={script} async key={index}></script>
            ))}

            <style type="text/css">
              {`
                .flockler-wall_v2-items a.flockler-btn-load-more,
                .flockler-wall_v2-items a.flockler-btn-load-more:hover {
                  background: #2E4924 !important;
                  color: #fff !important;
                  border-radius: 35px !important;
                }
                .flockler-wall_v2-item__meta {
                  display: none;  
                }
                .flockler-wall_v2-item__media+.flockler-wall_v2-item__text {
                  display: none;
                }
                div.flockler-wall_v2-item__footer {
                  display: none;
                }
              `}
            </style>
          </Helmet>
          {data.embeds?.map((embed, index) => (
            <div id={embed} key={index}></div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GallerySection;
