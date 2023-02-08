import { Box, useMediaQuery } from "@chakra-ui/react";
import { FC, useState } from "react";
import PhotoboothLanding from "../Molecules/Photobooth/PhotoboothLanding";
import PhotoboothPreview from "../Molecules/Photobooth/PhotoboothPreview";
import PhotoboothSnap from "../Molecules/Photobooth/PhotoboothSnap";

enum ESection {
  LANDING = "LANDING",
  PREVIEW = "PREVIEW",
  SNAP = "SNAP",
}

const PhotoboothSection: FC = () => {
  const [section, setSection] = useState(ESection.LANDING);
  const [selectedImage, setSelectedImage] = useState({
    frame: "",
    imageCaptured: "",
  });
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  return (
    <Box minHeight={isDesktop ? "650px" : "100%"} height="100%">
      {/* Landing Section */}
      {section === ESection.LANDING && (
        <PhotoboothLanding onNextSection={() => setSection(ESection.SNAP)} />
      )}

      {/* Snappin Image from camera */}
      {section === ESection.SNAP && (
        <PhotoboothSnap
          onNextSection={(image) => {
            setSection(ESection.PREVIEW);
            setSelectedImage({
              imageCaptured: image.imageCaptured,
              frame: image.frame,
            });
          }}
        />
      )}

      {/* Preview Image Here */}
      {section === ESection.PREVIEW && (
        <PhotoboothPreview
          onPrevSection={() => setSection(ESection.SNAP)}
          imageToPreview={selectedImage}
          backToHome={() => setSection(ESection.LANDING)}
        />
      )}
    </Box>
  );
};

export default PhotoboothSection;
