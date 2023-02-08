import GalleryMobileSection from "@/components/Organisms/Zone3/GalleryMobileSection";
import GallerySection from "@/components/Organisms/Zone3/GallerySection";
import Layout from "@/components/Template/Layout";
import { useMediaQuery } from "@chakra-ui/react";
import { useOnClickTracking } from "@/hooks/trackings";

const GalleryPage = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  useOnClickTracking({
    isClicked: true,
    type: "hotspot",
    data: {
      slug: "/our-army-platforms/gallery",
      title: "Our Army Platforms' Gallery",
    },
  });

  return (
    <Layout title="Gallery" withBackButton>
      {isDesktop ? (
        <GallerySection zoneArmy="platform" />
      ) : (
        <GalleryMobileSection zoneArmy="platform" />
      )}
    </Layout>
  );
};

export default GalleryPage;
