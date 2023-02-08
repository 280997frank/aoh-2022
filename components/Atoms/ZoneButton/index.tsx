import { Button, useMediaQuery } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useOnClickTracking } from "@/hooks/trackings";

interface ZoneButtonProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color: string;
  url: string;
  title: string;
}

const ZoneButton: FC<ZoneButtonProps> = ({
  top,
  bottom,
  left,
  right,
  color,
  url,
  title,
}) => {
  const router = useRouter();
  const [tracker, setTracker] = useState({
    slug: "",
    title: "",
    track: false,
  });
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  useEffect(() => {
    return () => {
      setTracker({
        slug: "",
        title: "",
        track: false,
      });
    };
  }, []);

  useOnClickTracking({
    data: {
      slug: tracker.slug,
      title: tracker.title,
    },
    page: tracker.slug,
    isClicked: tracker.track,
    type: "zones",
  });

  const handleClick = useCallback(
    (url) => {
      if (url === "/experience-the-night") {
        setTracker({
          slug: "/experience-the-night",
          title: "Experience The Night",
          track: true,
        });
      } else if (url === "/shows") {
        setTracker({
          slug: "/shows",
          title: "Shows",
          track: true,
        });
      }
      router.push(url);
    },
    [router]
  );

  return (
    <Button
      position="absolute"
      right={right && `${right}%`}
      bottom={bottom && `${bottom}%`}
      left={left && `${left}%`}
      top={top && `${top}%`}
      fontSize={11}
      height={isDesktop ? 30 : 30}
      backgroundColor={`${color}`}
      colorScheme={`${color}`}
      textTransform="uppercase"
      borderRadius="full"
      onClick={() => handleClick(url)}
    >
      {title}
    </Button>
  );
};

export default ZoneButton;
