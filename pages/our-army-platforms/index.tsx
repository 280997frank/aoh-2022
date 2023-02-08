import Pano from "@/components/Atoms/Pano";
import PhotoboothModal from "@/components/Organisms/PhotoboothModal";
import Layout from "@/components/Template/Layout";
import { usePano } from "@/hooks/krpano";
import { useWindowSize } from "@/hooks/windowSize";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/Atoms/BackButton";
import { useOnClickTracking } from "@/hooks/trackings";

const ArmyPlatforms = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const windowSize = useWindowSize();
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const changeScene = (scene: string) => {
    router.push(scene);
  };

  usePano("changePage", changeScene);

  usePano("onClickSpot", (spotName) => {
    if (spotName === "photobooth") {
      if (isDesktop) {
        setIsModalOpen(true);
      } else {
        router.push("/our-army-platforms/photobooth");
      }
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      if (windowSize.width <= 384) {
        router.push("/our-army-platforms/photobooth");
      }
    }
  }, [windowSize, isModalOpen, router]);

  useOnClickTracking({
    data: {
      slug: "/our-army-platforms",
      title: "Our Army Platforms",
    },
    isClicked: true,
    type: "zones",
  });

  return (
    <Layout title="Army Platforms">
      <BackButton
        withLabel
        variant="cream"
        isFloating
        onClick={() => router.push("/")}
      />
      <Pano startscene="scene_garage" />
      <PhotoboothModal
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default ArmyPlatforms;
