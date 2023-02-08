import { Button as ChakraButton } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import type { As, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  bgColor: string;
  border?: string;
  color?: string;
  as?: As;
  href?: string;
  form?: string;
  isLoading?: boolean;
  children?: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  padding?: string;
  variant?: ChakraButtonProps["variant"];
}

const Button: FC<ButtonProps> = ({
  bgColor,
  border = "",
  color = "white",
  as,
  href,
  form,
  isLoading,
  children = null,
  type = "button",
  disabled = false,
  variant = "solid",
  padding = "24px 40px",
  ...props
}) => {
  return (
    <ChakraButton
      {...props}
      as={as}
      border={border}
      href={href}
      bgColor={bgColor}
      color={color}
      w="inherit"
      type={as ? undefined : type}
      form={form}
      borderRadius="5rem"
      padding={padding}
      boxShadow="none"
      _active={{
        boxShadow: "none",
        bg: bgColor,
      }}
      _hover={{
        bg: bgColor,
      }}
      _focus={{
        boxShadow: "none",
      }}
      isLoading={isLoading}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </ChakraButton>
  );
};

Button.defaultProps = {
  width: "inherit",
};

export default Button;
