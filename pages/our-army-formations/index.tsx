import React from "react";
import Layout from "@/components/Template/Layout";
import Pano from "@/components/Atoms/Pano";
import { usePano } from "@/hooks/krpano";
import { useRouter } from "next/router";
import BackButton from "@/components/Atoms/BackButton";
import { useOnClickTracking } from "@/hooks/trackings";

const ArmyFormations = () => {
  const router = useRouter();
  const changeScene = (scene: string) => {
    router.push(scene);
  };

  usePano("changePage", changeScene);

  useOnClickTracking({
    data: {
      slug: "/our-army-formations",
      title: "Our Army Formations",
    },
    isClicked: true,
    type: "zones",
  });

  return (
    <Layout title="Army Formation">
      <BackButton
        withLabel
        variant="cream"
        isFloating
        onClick={() => router.push("/")}
      />
      <Pano startscene="scene_formation" />
    </Layout>
  );
};

export default ArmyFormations;
