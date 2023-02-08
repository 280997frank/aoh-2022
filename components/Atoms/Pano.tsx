import React, { FC, ReactElement, useEffect } from "react";
import { Box } from "@chakra-ui/react";
interface TProps {
  startscene: string;
}
declare const window: any;

const Pano: FC<TProps> = ({ startscene }): ReactElement => {
  useEffect(() => {
    function appHeight() {
      const doc = document.documentElement;
      doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
    }

    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  useEffect(() => {
    if (startscene) {
      window.embedpano({
        swf: "/Krpano_AOH_Web/tour.swf",
        id: "krpanoSWFObject",
        xml: "/Krpano_AOH_Web/tour.xml",
        target: "pano",
        vars: { startscene: startscene },
        passQueryParameters: true,
        onready: (krpanoInterface: any) => {
          window.krpano = krpanoInterface;
        },
      });
    }
  }, [startscene]);

  return startscene ? (
    <Box
      id="pano"
      as="div"
      h={{ base: "calc(calc(var(--vh, 1vh) * 100) - 85px)", md: "100%" }}
      w="100%"
    ></Box>
  ) : (
    <div></div>
  );
};

export default Pano;
