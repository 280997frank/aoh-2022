import { Box, Heading } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const GalleryMobileSection: React.FC<{ zoneArmy?: string }> = ({
  zoneArmy = "kids-zone",
}) => {
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

  return (
    <Box className="content" height="100%" margin="0 auto">
      <Box my={8}>
        <Heading
          fontWeight="bold"
          fontSize="24px"
          color="brand.green"
          w="full"
          lineHeight="23px"
          as="h1"
          textAlign="center"
        >
          SOCIAL MEDIA WALL
        </Heading>
        <Heading
          fontWeight="500"
          fontSize="15px"
          color={getColorZone(zoneArmy)}
          w="full"
          as="h4"
          textAlign="center"
          fontStyle="italic"
        >
          {zoneArmy === "kids-zone" ? "#AOH22" : "#ReadyDecisiveRespected"}
        </Heading>
      </Box>
      <Box className="application">
        <Helmet>
          <script
            src="https://plugins.flockler.com/embed/18016b13777016234af193f5c9aa47bd/18016bd220c00ea9a162fdbd4ffba2c1"
            async
          ></script>
          <script
            src="https://plugins.flockler.com/embed/180180d8b2a08f21191f7eedf6efa4b2/180180ecfb20b08639267f902533986a"
            async
          ></script>
          <style type="text/css">{`
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
        `}</style>
        </Helmet>
        {/* <div id="flockler-embed-180180ecfb20b08639267f902533986a"></div> */}
        <div id="flockler-embed-18016bd220c00ea9a162fdbd4ffba2c1"></div>
      </Box>
    </Box>
  );
};

export default GalleryMobileSection;
