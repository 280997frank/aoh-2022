export interface SoldierShowcaseProps {
  data: [
    {
      title: string;
      description: string;
      thumbnail: string;
      url: string;
      type: string;
    }
  ];
  firstPrototype: [
    {
      title: string;
      description: string;
      thumbnail: string;
      url: string;
      type: string;
    }
  ];
  finalProduct: [
    {
      title: string;
      description: string;
      thumbnail: string;
      url: string;
      type: string;
    }
  ];
  preDesign: {
    title: string;
    description: string;
    url: string;
    type: string;
  };
}

export interface SoldierShowcaseEvolutionProps {
  title: string;
  image: string;
  description: string;
  thumbnail: string;
}
