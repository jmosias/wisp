"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import LoginForm from "./LoginForm";

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="light" color="primary">
        Login
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
            <LoginForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
