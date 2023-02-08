import { FC, ReactNode } from "react";
import { Box, BoxProps, Image, Text } from "@chakra-ui/react";
import hotspot from "@/assets/images/hotspot.gif";

interface Props extends BoxProps {
  children?: ReactNode;
  label?: string;
  onClick?: () => void;
}

const Hotspot: FC<Props> = ({
  children,
  label = "",
  onClick = () => {},
  ...props
}) => (
  <>
    {children ? (
      <Box position="absolute" cursor="pointer" onClick={onClick} {...props}>
        {children}
      </Box>
    ) : (
      <Box position="absolute" {...props}>
        <Image
          onClick={onClick}
          cursor="pointer"
          w="70px"
          h="70px"
          src={hotspot.src}
          alt="Hotspot"
          transform="translateY(-35px) translateX(-35px)"
        />
        {label !== "" && (
          <Text
            rounded="full"
            fontSize={{ base: "xs", md: "md" }}
            color="#fff"
            textAlign="center"
            bgColor="#B5242D"
            fontWeight="700"
            py="1"
            px={{ base: "2", md: "6" }}
            transform="translateY(calc(-50% - 35px))"
            top="50%"
            left="35px"
            position="absolute"
            whiteSpace="nowrap"
          >
            {label}
          </Text>
        )}
      </Box>
    )}
  </>
);

export default Hotspot;
