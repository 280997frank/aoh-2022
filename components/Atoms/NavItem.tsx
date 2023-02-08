import React, { FC, useRef, useEffect, useState } from "react";
import {
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import isNil from "lodash/isNil";
import { useRouter } from "next/router";
import NextLink from "next/link";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import { actions as slideAction } from "@/states/venue/slices";
import { useDispatch } from "react-redux";
import { actions as gameActions } from "@/states/game/slice";
import { useOnClickTracking } from "@/hooks/trackings";

interface TDropdown {
  label: string;
  value: string;
  sequence?: number;
  disabled?: boolean;
}
interface TpropsData {
  label: string;
  id: string;
  url: string;
  divider?: boolean;
  submenu?: TDropdown[];
}

const NavItem: FC<TpropsData> = ({ label, id, url, submenu, ...props }) => {
  const dispatch = useDispatch();
  // const { pathname, push } = useRouter();
  const MenuBtnRef = useRef<any>(null);
  const [dimensionsBtn, setDimensionsBtn] = useState({ width: 0, height: 0 });
  const [tracker, setTracker] = useState({
    slug: "",
    title: "",
    track: false,
  });

  useEffect(() => {
    if (MenuBtnRef.current) {
      setDimensionsBtn({
        width: MenuBtnRef.current.offsetWidth,
        height: MenuBtnRef.current.offsetHeight,
      });
    }

    return () => {
      setTracker({
        slug: "",
        title: "",
        track: false,
      });
    };
  }, []);

  const router = useRouter();

  const isMatch = (url: string | string[], path: string) => {
    // console.log(url, path);
    if (isArray(url)) {
      return !isEmpty(
        url.filter((item) => new RegExp(`^${item}`, "m").test(path))
      );
    } else {
      return new RegExp(`^${url}`, "m").test(path);
    }
  };

  const getUrlSubmenu = (subMenu: TDropdown[]) => {
    const itemMenu = subMenu.map((item) => {
      return item["value"];
    });
    return itemMenu;
  };

  // console.log("router", router);

  useOnClickTracking({
    data: {
      slug: tracker.slug,
      title: tracker.title,
    },
    page: tracker.slug,
    isClicked: tracker.track,
    type: "zones",
  });

  return !isNil(submenu) ? (
    <Menu gutter={0}>
      {({ isOpen }) => (
        <>
          <MenuButton
            ref={MenuBtnRef}
            id="btnMenu"
            as={Button}
            {...props}
            _hover={{
              textDecoration: "none",
              color: "#537542 !important",
              bgColor: "#FFFFFF !important",
            }}
            _focus={{
              color: isOpen ? "#537542 !important" : "transparant",
            }}
            color={
              isMatch(getUrlSubmenu(submenu), router.pathname)
                ? "#537542"
                : "#6BA43A"
            }
            bgColor={
              isMatch(getUrlSubmenu(submenu), router.pathname)
                ? "#FFFFFF "
                : "#f3f2e7"
            }
            borderRadius="none"
            _active={{
              outline: "0",
              // bgColor: isOpen ? "#FFFFFF" : "transparant",
              color: isOpen ? "#537542 !important" : "transparant",
            }}
            textDecoration="none"
            display="flex"
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            userSelect="none"
            fontWeight="bold"
            fontSize={{
              base: "smaller",
              lg: "12px",
              "2xl": "md",
            }}
            width={{
              base: "100%",
              md: "100%",
            }}
            p="0px"
            // className={active ? "is-active" : ""}
            textAlign={{
              base: "left",
              md: "center",
            }}
          >
            <Text
              as="span"
              dangerouslySetInnerHTML={{
                __html: label,
              }}
              mt="0"
              textTransform="uppercase"
              textAlign={{
                base: "left",
                md: "center",
              }}
            ></Text>
          </MenuButton>
          <MenuList
            bgColor="#FBFAE5"
            minW={`${dimensionsBtn.width}` + "px"}
            maxW={"100%"}
            p="0px"
            m="0px !important"
            borderRadius="none"
            border="none"
          >
            {submenu.map((item, index: number) => {
              return (
                // <NextLink passHref href={item.value} key={index}>
                <MenuItem
                  key={index}
                  color="#537542"
                  fontWeight="semibold"
                  _active={{
                    bgColor: isOpen ? "#537542" : "transparant",
                    color: "white",
                  }}
                  _hover={{
                    bgColor: isOpen ? "537542" : "transparant",
                    color: "white",
                  }}
                  _focus={{
                    bgColor: isOpen ? "#537542" : "transparant",
                    color: "white",
                  }}
                  onClick={() => {
                    if (id === "virtual-games") {
                      dispatch(gameActions.setGame(item.value));
                    } else if (item.value === "/experience-the-night") {
                      setTracker({
                        slug: "/experience-the-night",
                        title: "Experience The Night",
                        track: true,
                      });
                      router.push(item.value);
                    } else if (item.value === "/shows") {
                      setTracker({
                        slug: "/shows",
                        title: "Shows",
                        track: true,
                      });
                      router.push(item.value);
                    } else {
                      router.push(item.value);
                      dispatch(slideAction.setDefaultSlide(item.sequence));
                    }
                  }}
                  isDisabled={item.disabled}
                >
                  <Text
                    as="span"
                    dangerouslySetInnerHTML={{
                      __html: item.label,
                    }}
                    mt="0"
                    textTransform="uppercase"
                    textAlign={{
                      base: "left",
                      md: "center",
                    }}
                  ></Text>
                </MenuItem>
                // </NextLink>
              );
            })}
          </MenuList>
        </>
      )}
    </Menu>
  ) : (
    <NextLink passHref href={url}>
      <Link
        {...props}
        _hover={{
          textDecoration: "none",
          color: "#2E4924 !important",
          bgColor: "#FFFFFF !important",
        }}
        color={isMatch(url, router.pathname) ? "#2E4924" : "#6BA43A"}
        bgColor={isMatch(url, router.pathname) ? "#FFFFFF " : "none"}
        _focus={{ outline: "0" }}
        textDecoration="none"
        display="flex"
        alignItems={{
          base: "flex-start",
          md: "center",
        }}
        alignContent={{
          base: "flex-start",
          md: "center",
        }}
        justifyContent={{
          base: "flex-start",
          md: "center",
        }}
        userSelect="none"
        fontWeight="bold"
        fontSize={{
          base: "smaller",
          lg: "12px",
          "2xl": "md",
        }}
        width={{
          base: "100%",
          md: "100%",
        }}
        // href={type === "href" ? href : "#"}
        p={{
          base: "2",
          md: "2.5",
          "2xl": "2",
        }}
        // className={active ? "is-active" : ""}
        textAlign={{
          base: "left",
          md: "center",
        }}
      >
        <Text
          as="span"
          dangerouslySetInnerHTML={{
            __html: label,
          }}
          mt="0"
          textTransform="uppercase"
          textAlign={{
            base: "left",
            md: "center",
          }}
        ></Text>
      </Link>
    </NextLink>
  );
};

export default NavItem;
