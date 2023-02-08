import Button from "@/components/Atoms/Button";
import { useOnClickTracking } from "@/hooks/trackings";
import { TPhotoboothPreviewProps } from "@/types/photobooth";
import { Flex, Heading } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const PhotoboothPreview: TPhotoboothPreviewProps = ({
  onPrevSection,
  imageToPreview,
  backToHome,
}) => {
  const [section, setSection] = useState<"preview" | "download">("preview");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { frame, imageCaptured } = imageToPreview;
  const photoRef = useRef<any>(null);

  const loadImage = (src: string) => {
    var img = new window.Image();
    img.crossOrigin = "*";
    img.src = src;
    return img;
  };

  const handleCanvas = useCallback(async () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    const newImageCaptured = loadImage(imageCaptured);
    const newImageFrame = loadImage(frame);
    newImageCaptured.width = 500;
    newImageCaptured.height = 500;

    setTimeout(() => {
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      roundedImage(ctx, 0, 0, 1920, 1920, 158);
      ctx.clip();
      ctx.drawImage(newImageCaptured, 0, 0, 1948, 1948);
      ctx.drawImage(newImageFrame, 0, 0, 1921, 1921);
      ctx.scale(3, 3);
      ctx.restore();
    }, 1000);
  }, [imageCaptured, frame]);

  const roundedImage = (
    ctx: any,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const resetCanvas = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
  };

  const downloadImage = () => {
    const date = new Date().toISOString();
    const day = date.slice(0, 10);
    const time = date.substr(11, 8);
    photoRef.current.toBlob((blob: any) => {
      setIsDownloaded(true);
      saveAs(blob, `AOH ${day} at ${time}.png`);
    });
  };

  useEffect(() => {
    resetCanvas();
    handleCanvas();
  }, [imageCaptured, handleCanvas]);

  useEffect(() => {
    if (isDownloaded) {
      setIsDownloaded(false);
    }
  }, [isDownloaded]);

  useOnClickTracking({
    data: {
      slug: "/our-army-platforms",
      title: "Download Selfie",
    },
    isClicked: isDownloaded,
    type: "download",
  });

  return (
    <Fragment>
      <Flex
        marginTop="40px"
        flexDir="column"
        gridGap={6}
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          color="brand.green"
          as="h2"
          fontSize="24px"
          lineHeight="23px"
          textAlign="center"
        >
          {section === "preview" && "GREAT SHOT!"}
        </Heading>
        <Flex width="300px" flexDir="column" gridGap={8}>
          <canvas
            ref={photoRef}
            id="canvas"
            width="1948"
            height="1948"
          ></canvas>

          {section === "preview" ? (
            <Flex width="100%" flexDir="column" gridGap={3}>
              <Button
                bgColor="transparent"
                variant="outline"
                border="1px solid"
                borderColor="brand.jaffa"
                color="brand.jaffa"
                onClick={() => onPrevSection()}
              >
                RETAKE
              </Button>
              <Button
                bgColor="brand.jaffa"
                onClick={() => setSection("download")}
              >
                NEXT
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" flexDir="column" gridGap={3}>
              <Button
                bgColor="transparent"
                variant="outline"
                border="1px solid"
                borderColor="brand.jaffa"
                color="brand.jaffa"
                onClick={() => {
                  downloadImage();
                }}
              >
                DOWNLOAD IMAGE
              </Button>
              <Button bgColor="brand.jaffa" onClick={() => backToHome()}>
                BACK TO HOME
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default PhotoboothPreview;
