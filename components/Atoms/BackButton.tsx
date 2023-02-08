import backIconCream from "@/assets/icons/chevron-back-cream.svg";
import backIcon from "@/assets/icons/chevron-back-solid.svg";
import {
  Box,
  BoxProps,
  Button,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IBackButtonProps extends BoxProps {
  withLabel?: boolean;
  labelColor?: string;
  variant?: "green" | "cream";
  onClick?: () => void;
  isFloating?: boolean;
}

export type TBackButtonProps = React.FC<IBackButtonProps>;

const BackButton: TBackButtonProps = ({
  withLabel,
  labelColor = null,
  variant = "green",
  onClick,
  isFloating = false,
  ...props
}) => {
  const router = useRouter();
  const defaultLabelColor =
    variant === "green" ? "brand.green" : "brand.cream200";

  return (
    <Box
      position={isFloating ? "fixed" : "relative"}
      top={isFloating ? ["100px", "170px"] : 0}
      left="0"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      zIndex="docked"
      {...props}
    >
      <Box
        width={{
          base: "90%",
          lg: "95%",
          "2xl": "82%",
        }}
      >
        <Button
          padding="0"
          onClick={onClick ? onClick : () => onClick ?? router.back()}
          leftIcon={
            <Box height="35px" mr="2px">
              <Image
                src={variant === "green" ? backIcon.src : backIconCream.src}
                alt="back"
                width="35px"
              />
            </Box>
          }
          bgColor="transparent"
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
          zIndex={10}
        >
          {withLabel && (
            <Text
              color={labelColor || defaultLabelColor}
              fontSize="18px"
              mt="6px"
              display={{
                base: "none",
                lg: "block",
                xl: "block",
              }}
            >
              BACK
            </Text>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default BackButton;
