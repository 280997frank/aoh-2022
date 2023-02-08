import { FC } from "react";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {
  template: string;
  emoji: string;
}

const PledgeCard: FC<Props> = ({ template, emoji, ...props }) => {
  return (
    <Image
      src={
        require(`@/assets/images/pledgeYourSupport/${template}-${emoji}.png`)
          .default.src
      }
      alt={props.alt}
      {...props}
    />
  );
};

export default PledgeCard;
