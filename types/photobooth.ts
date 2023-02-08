export interface IPhotoboothLanding {
  btnSnap: string;
  description: string;
  title: string;
  image: string;
  tnc: string;
  tncFile: string;
}

export interface IPhotoboothPlatforms {
  platforms: {
    frame: string;
    avatar: string;
  }[];
}

interface IPhotoboothSnapProps {
  onNextSection: ({
    imageCaptured,
    frame,
  }: {
    imageCaptured: string;
    frame: string;
  }) => void;
}

interface IPhotoboothPreviewProps {
  onPrevSection: () => void;
  imageToPreview: { frame: string; imageCaptured: string };
  backToHome: () => void;
}

export type TPhotoboothLandingProps = React.FC<{ onNextSection: () => void }>;
export type TPhotoboothSnapProps = React.FC<IPhotoboothSnapProps>;
export type TPhotoboothPreviewProps = React.FC<IPhotoboothPreviewProps>;
