import Button from "@/components/Atoms/Button";
import DrawingPalette from "@/components/Atoms/DrawingPalette";
import SwiperDrawing from "@/components/Molecules/SwiperDrawing";
import { useOnClickTracking } from "@/hooks/trackings";
import { TKidsZone, TVirtualBook } from "@/types/kids-zone";
import { Box, Divider, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";

const ColouringBookSection: TKidsZone<TVirtualBook> = ({ data }) => {
  const [nameValue, setNameValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImg, setSelectedImg] = useState(data.images[0]);
  const [selectedSwiperIndex, setSelectedSwiperIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const drawingCanvas = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const fillSpeed = 0.15;
  const [isDownloaded, setIsDownloaded] = useState(false);

  useOnClickTracking({
    data: {
      slug: "/kids-zone/colouring-book",
      title: nameValue,
    },
    isClicked: isDownloaded,
    type: "download",
  });

  const handleSwiperClick = (index: number) => {
    setSelectedSwiperIndex(index);
    setSelectedImg(data.images[index]);
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  };

  const getBase64FromUrl = async (url: string) => {
    const urlData = await fetch(url);
    const blob = await urlData.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const handleDownloadClick = async () => {
    if (drawingCanvas.current) {
      const drawingOutput = drawingCanvas.current?.querySelector("svg#drawing");
      if (drawingOutput) {
        const data = new XMLSerializer().serializeToString(drawingOutput);
        const svgBlob = new Blob([data], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        const base64: any = await getBase64FromUrl(svgUrl);

        const img = document.createElement("img");
        img.setAttribute("src", base64);

        if (photoRef.current) {
          setIsDownloaded(true);
          const { width, height } = photoRef.current;
          let photo = photoRef.current;
          let ctx = photo.getContext("2d");

          setTimeout(() => {
            if (ctx) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(
                img,
                width / 2 - 1484 / 2,
                height / 2 - 1050 / 2,
                1484,
                1050
              );
              ctx.font = "500 24px Avenir Next";
              ctx.fillStyle = "#2E4924";
              ctx.fillText("Done By : ", 300, height - 140);
              ctx.font = "700 38px Avenir Next";
              ctx.fillStyle = "#2E4924";
              ctx.fillText(nameValue, 300, height - 100);

              photoRef.current?.toBlob((blob: any) => {
                setIsDownloaded(false);
                const date = new Date().toISOString();
                const day = date.slice(0, 10);
                const time = date.substr(11, 8);
                saveAs(blob, `AOH ${day} at ${time}.jpg`);
              });
            }
          }, 100);
        }
      }
    }
  };

  const colorMe = useCallback(
    (targetElement: any) => {
      gsap.to(targetElement, { fill: selectedColor, duration: fillSpeed });
    },
    [selectedColor]
  );

  useEffect(() => {
    if (drawingCanvas.current) {
      const svgColor =
        drawingCanvas.current?.querySelector("g#Color")?.children;
      if (svgColor) {
        Array.from(svgColor).forEach((element) => {
          element.addEventListener("click", (e) => {
            colorMe(e.target);
          });
        });
      }
    }
  }, [colorMe, drawingCanvas]);

  return (
    <Box width="100%" height="100%" overflowY="scroll" ref={boxRef}>
      <Box
        className="content"
        width={{ base: "1000px", "2xl": "75%" }}
        height="100%"
        margin="0 auto"
      >
        <Heading
          fontWeight="bold"
          fontSize="38px"
          color="brand.green"
          w="full"
          lineHeight="4.125rem"
          as="h1"
          textAlign="center"
        >
          VIRTUAL COLOURING BOOK
        </Heading>
        <Box
          backgroundColor="rgba(251, 250, 229, 0.3);"
          borderRadius="16px"
          marginTop={10}
          p={4}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text
                fontSize="16px"
                fontWeight={500}
                lineHeight="22px"
                color="#2E4924"
              >
                Done by:
              </Text>
              <Input
                type="text"
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="Enter your name"
                border="none"
                borderBottom="1px solid #2E4924"
                borderRadius="none"
                fontWeight="700"
                fontSize="20px"
                lineHeight="27px"
                color="brand.green"
                paddingInlineStart={0}
                _placeholder={{
                  color: "brand.green",
                }}
                sx={{
                  '&[aria-invalid="true"]': {
                    boxShadow: "none",
                  },
                }}
                _active={{
                  boxShadow: "none",
                  bg: "transparent",
                }}
                _hover={{
                  bg: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
              />
            </Box>
            <Button bgColor="brand.pink" onClick={handleDownloadClick}>
              Download
            </Button>
          </Flex>
          <Flex gridGap={3} marginTop="8">
            <Flex
              flex="1"
              bg="white"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              height="550px"
              id="drawing-canvas"
              ref={drawingCanvas}
            >
              <ReactSVG src={selectedImg} id="drawing-image" />
            </Flex>
            <DrawingPalette
              onSelectColor={setSelectedColor}
              palettes={data.palettes}
            />
          </Flex>
          <canvas
            id="virtual-book"
            ref={photoRef}
            width="1920"
            height="1080"
            style={{ display: "none" }}
          />
          <Divider my={8} borderColor="#C0BE9A" />
          <Box px={2}>
            <SwiperDrawing
              images={data.images}
              onClick={handleSwiperClick}
              slidesPerView={5}
              selectedIndex={selectedSwiperIndex}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ColouringBookSection;
