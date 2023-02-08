import { FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  List,
  ListItem,
  Link,
  Divider,
  Text,
  Button,
  Box,
  LinkProps,
} from "@chakra-ui/react";
// import s from "shortid";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { actions as slideAction } from "@/states/venue/slices";
import { useDispatch } from "react-redux";
import { actions as gameActions } from "@/states/game/slice";

export type TNavItem = {
  label: string;
  id: string;
  url: string;
  divider?: boolean;
};

interface TDropdown {
  label: string;
  value: string;
  sequence?: string;
  disabled?: boolean;
}

export type NavItemProps = TNavItem & {
  submenu?: TDropdown[];
  isTabsNow: string;
  setTabNow: (i: string) => void;
  onClose: (i: boolean) => void;
};

type NavLinkProps = LinkProps & {
  label: string;
  url: string;
  isActive: boolean;
  isDisabled?: boolean;
};
const NavLink: FC<NavLinkProps> = ({
  label,
  url,
  isActive,
  isDisabled,
  ...props
}) => {
  if (isDisabled) {
    return (
      <Link
        {...props}
        _hover={{ textDecoration: "none" }}
        _focus={{ outline: "0" }}
        textDecoration="none"
        display="flex"
        alignItems="center"
        userSelect="none"
        pointerEvents="none"
        cursor="not-allowed"
      >
        <Text as="span" textTransform="uppercase">
          {label}
        </Text>
      </Link>
    );
  }

  return (
    <NextLink passHref href={url}>
      <Link
        {...props}
        _hover={{ textDecoration: "none" }}
        _focus={{ outline: "0" }}
        textDecoration="none"
        display="flex"
        alignItems="center"
        userSelect="none"
      >
        <Text as="span" textTransform="uppercase">
          {label}
        </Text>
      </Link>
    </NextLink>
  );
};

const NavItemMobile: FC<NavItemProps> = ({
  id,
  url,
  label,
  submenu,
  divider,
  onClose,
  isTabsNow,
  setTabNow,
}) => {
  // const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  /* const listTabs = [
    "venue-info",
    "whats-happening",
    "zones",
    "virtual-games",
    "contact-us",
  ]; */

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

  /* const isActiveParent = useMemo(() => {
    if (id === isTabsNow) return true;

    if (submenu) {
      const urls = submenu.map((item) => item.value);
      return isMatch(urls, router.pathname);
    }

    return false;
  }, [id, isTabsNow, submenu, router.pathname]); */

  return (
    <ListItem w="100%">
      {!isNil(submenu) ? (
        <>
          <Link
            position="relative"
            display="flex"
            alignItems="center"
            color={
              isMatch(getUrlSubmenu(submenu), router.pathname)
                ? "white"
                : "#2e4924"
            }
            bgColor={
              isMatch(getUrlSubmenu(submenu), router.pathname)
                ? "#537542"
                : "transparant"
            }
            userSelect="none"
            // marginBottom="4"
            onClick={() => {
              if (isTabsNow === id) {
                setTabNow("");
              } else {
                setTabNow(id);
              }
              // setTabNow(id);
            }}
            _hover={{ textDecoration: "none" }}
            fontWeight="bold"
            fontSize="lg"
            p="4"
          >
            <>
              <Text as="span" textTransform="uppercase">
                {label}
              </Text>
            </>
          </Link>
          <List
            // marginLeft="3"
            hidden={id !== isTabsNow}
            marginBottom={divider ? "4" : "0"}
          >
            {submenu.map((submenuItem, index: number) => (
              <ListItem key={index}>
                {id === "virtual-games" ? (
                  <Button
                    w="full"
                    justifyContent="flex-start"
                    color="#537542"
                    bgColor={
                      isMatch(submenuItem.value, router.pathname)
                        ? "#FBFAE5"
                        : "#E7E6D0"
                    }
                    onClick={async () => {
                      onClose(false);
                      dispatch(gameActions.setGame(submenuItem.value));
                    }}
                    fontWeight="normal"
                    fontSize="md"
                    p="2"
                    pl="6"
                    borderRadius="none"
                  >
                    {submenuItem.label}
                  </Button>
                ) : (
                  <NavLink
                    isActive={isMatch(submenuItem.value, router.pathname)}
                    isDisabled={submenuItem.disabled}
                    color={submenuItem.disabled ? "grey" : "#537542"}
                    bgColor={
                      isMatch(submenuItem.value, router.pathname)
                        ? "#FBFAE5"
                        : "#E7E6D0"
                    }
                    url={submenuItem.value}
                    label={submenuItem.label}
                    onClick={async () => {
                      if (label === "VENUE INFO") {
                        onClose(false);
                        await router.push(submenuItem.value);
                        dispatch(
                          slideAction.setDefaultSlide(submenuItem.sequence)
                        );
                      }
                    }}
                    fontWeight={
                      isMatch(submenuItem.value, router.pathname)
                        ? "bold"
                        : "normal"
                    }
                    fontSize="md"
                    p="2"
                    pl="6"
                  />
                )}
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <NavLink
          marginBottom={divider ? "4" : "0"}
          isActive={isMatch(url, router.pathname)}
          color={isMatch(url, router.pathname) ? "white" : "#2E4924"}
          bgColor={isMatch(url, router.pathname) ? "#537542" : "transparant"}
          url={url}
          label={label}
          fontWeight="bold"
          fontSize="lg"
          p="4"
        />
      )}
      {divider && <Divider borderColor="#D7D7D7" />}
    </ListItem>
  );
};

export default NavItemMobile;
