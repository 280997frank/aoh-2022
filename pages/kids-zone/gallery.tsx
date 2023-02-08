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
      slug: "/kids-zone/gallery",
      title: "Kids Zone's Gallery",
    },
  });

  return (
    <Layout title="Gallery" withBackButton>
      {isDesktop ? <GallerySection /> : <GalleryMobileSection />}
    </Layout>
  );
};

export default GalleryPage;
