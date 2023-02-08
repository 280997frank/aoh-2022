import { FC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import Layout from "@/components/Template/Layout";
import Hotspot from "@/components/Atoms/Hotspot";
import { useRouter } from "next/router";
import PledgeYourSupport from "@/components/Organisms/PledgeYourSupport";
import BackButton from "@/components/Atoms/BackButton";
import Pano from "@/components/Atoms/Pano";

import { usePano } from "@/hooks/krpano";
import { useOnClickTracking } from "@/hooks/trackings";

const Nss5ShowcaseZone3: FC = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const changeScene = (scene: string) => {
    router.push(scene);
  };

  usePano("openPledgeModal", () => {
    const [firstTracker] = window.ga.getAll();
    if (firstTracker) {
      const trackerName = firstTracker.get("name");
      window.ga(`${trackerName}.send`, "event", "Zone3", "Showcase");
    }
    onOpen();
  });
  usePano("changePage", changeScene);

  useOnClickTracking({
    isClicked: true,
    type: "zones",
    data: {
      slug: "/ns55-showcase/zone-3",
      title: "NS 55 Showcase Zone 3",
    },
  });

  return (
    <Layout title="NS55 Showcase">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/ns55-showcase")}
        isFloating
      />
      <Pano startscene="scene_zone3" />
      <PledgeYourSupport isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
};

export default Nss5ShowcaseZone3;
