import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import RegisterModal from "../_components/auth/RegisterModal";
import LoginModal from "../_components/auth/LoginModal";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar maxWidth="full">
        <NavbarBrand>
          <p className="text-2xl font-bold">Wisp</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <LoginModal />
          <RegisterModal />
        </NavbarContent>
      </Navbar>
      <div className="h-screen flex justify-center items-center">
        <p>add landing page here</p>
      </div>
    </main>
  );
}
