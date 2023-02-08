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
    isClicked: true,
    type: "zones",
    data: {
      slug: "/technology-zone",
      title: "Technology Zone",
    },
  });

  return (
    <Layout title="Army Formation">
      <BackButton
        withLabel
        isFloating
        onClick={() => router.push("/")}
        variant="cream"
      />
      <Pano startscene="scene_Technology" />
    </Layout>
  );
};

export default ArmyFormations;
