export const itemsZones = [
  {
    label: "OUR ARMY FORMATIONS",
    value: "/our-army-formations",
  },
  {
    label: "Our Army Platforms",
    value: "/our-army-platforms",
  },
  {
    label: "Kids Zone",
    value: "/kids-zone",
  },
  {
    label: "Technology Zone",
    value: "/technology-zone",
  },
  {
    label: "Experience the Night",
    value: "/experience-the-night",
  },
  {
    label: "Be a Marksman",
    value: "/be-a-marksman",
  },
  {
    label: "Battle Rides",
    value: "/battle-rides",
  },
  {
    label: "Soldier Strong",
    value: "/soldier-strong",
  },
  {
    label: "NS55 Showcase",
    value: "/ns55-showcase",
  },
  {
    label: "Shows",
    value: "/shows",
  },
  {
    label: "Drone Arena",
    value: "/drone-arena",
  },
];
export const itemsGames = [
  {
    label: "DRONE RACER",
    value: "droneFlying",
  },
  {
    label: "BATTLE DRIVER",
    value: "obstacleSpeedRacer",
  },
  {
    label: "SPOT THE SOLDIERS",
    value: "spotSoldier",
  },
  {
    label: "WATCH YOUR FRONT!",
    value: "sar21Shooting",
  },
  {
    label: "OBSTACLE RUNNER",
    value: "obstacleCourse",
  },
];

export const itemsVenue = [
  {
    label: "AOH22@F1 PIT",
    value: "/#venue-info",
    sequence: 0,
    disabled: true,
  },
  {
    label: "AOH22@PUNGGOL",
    value: "/#venue-info",
    sequence: 1,
    disabled: true,
  },
  {
    label: "AOH22@BISHAN",
    value: "/#venue-info",
    sequence: 2,
    disabled: false,
  },
];
export const itemsHappening = [
  {
    label: "Dropdown 1",
    value: "#",
  },
  {
    label: "Dropdown 2",
    value: "#",
  },
];

export const menuScroll = [
  {
    label: "VENUE INFO",
    id: "venue-info",
    url: "/",
    submenu: itemsVenue,
  },
  {
    label: "WHAT'S HAPPENING",
    id: "whats-happening",
    url: "/whats-happening",
  },
  {
    label: "ZONES",
    id: "zones",
    url: "",
    submenu: itemsZones,
  },
  {
    label: "VIRTUAL GAMES",
    id: "virtual-games",
    url: "",
    submenu: itemsGames,
  },
  {
    label: "CONTACT US",
    id: "contact-us",
    url: "/contact-us",
  },
];

//type ={"url", "href", "submenu"}
