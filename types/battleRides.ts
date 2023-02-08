export interface IDetailBattleRides {
  information: {
    images: string[];
    description: string;
    key_feature: string;
    others: string;
  };
  name: string;
  specification: {
    images: string[];
    dimension: string;
    weight: string;
    capacity: {
      type: string;
      value: string;
    };
    others: string;
  };
}
