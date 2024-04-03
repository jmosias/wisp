"use client";

import { userLogout } from "@/app/_lib/api";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      await userLogout();
      push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Button onClick={handleLogout} color="danger" variant="faded">
      Logout
    </Button>
  );
}
