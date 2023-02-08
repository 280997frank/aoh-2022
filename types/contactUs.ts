export interface TCompanyIntro {
  image: string;
  link: string;
  labelCta: string;
  description: string;
}

export interface TSocialMedia {
  icon: string;
  url: string;
}
export interface TContactPerson {
  name: string;
  email: string;
  phone: string;
  feedback: {
    label: string;
    url: string;
  };
  emailUs: {
    label: string;
    url: string;
  };
  socialMedia: TSocialMedia[];
  contactDetail: TContactDetail;
}

export interface TContactDetail {
  emailUs: {
    label: string;
    value: string;
  };
  feedback: {
    label: string;
    value: string;
  };
}
