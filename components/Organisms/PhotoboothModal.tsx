import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import PhotoboothSection from "./PhotoboothSection";

interface IPhotoboothModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

const PhotoboothModal: FC<IPhotoboothModalProps> = ({
  isOpen,
  onModalClose,
}) => {
  const { onClose } = useDisclosure();

  const handleModalClose = () => {
    onModalClose();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          right="-16px"
          top="-16px"
          border="1px solid transparent"
          backgroundColor="#2E4924"
          color="white"
          borderRadius="50%"
          _active={{
            boxShadow: "none",
            bg: "#2E4924",
          }}
          _hover={{
            bg: "#2E4924",
          }}
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody bgColor="#E7E6D0">
          <PhotoboothSection />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhotoboothModal;
