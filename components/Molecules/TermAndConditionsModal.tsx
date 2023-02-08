import {
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";
import Button from "../Atoms/Button";

export interface ICaptureYourNSMomentsTermProps {
  title: string;
  subtitle: string;
  terms: any;
}

interface ITermAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: ICaptureYourNSMomentsTermProps;
}

export default function TermAndConditionsModal({
  isOpen,
  onClose,
  terms,
}: ITermAndConditionsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="brand.cream" p="2rem">
        <ModalHeader color="brand.green" fontWeight="bold" fontSize="2xl">
          {terms.title}
        </ModalHeader>
        <ModalBody>
          <Text fontWeight="bold" fontSize="sm" color="brand.green" mb="1rem">
            {terms.subtitle}
          </Text>

          <OrderedList fontSize="sm" paddingLeft="0.5rem">
            {(terms.terms as string[]).map((item: any, index) => {
              if (item.term) {
                return (
                  <Fragment key={index}>
                    <ListItem key={index}>{item.term}</ListItem>
                    <ol type="a" style={{ paddingLeft: "1rem" }} key={index}>
                      {item.sub.map((subData: any, j: number) => {
                        return <li key={j}>{subData}</li>;
                      })}
                    </ol>
                  </Fragment>
                );
              } else {
                return <ListItem key={index}>{item}</ListItem>;
              }
            })}
          </OrderedList>
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Button bgColor="brand.orange" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
