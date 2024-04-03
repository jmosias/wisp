"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import RegisterForm from "./RegisterForm";

export default function RegisterModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Get Started
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: ["px-2 py-8", "bg-background"],
        }}
      >
        <ModalContent className="flex justify-center">
          <ModalBody>
            <RegisterForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
