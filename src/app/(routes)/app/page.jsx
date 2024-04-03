"use client";

import LogoutButton from "@/app/_components/auth/LogoutButton";
import { useCollections, useProductItems, useTemplates } from "@/app/_lib/api";
import { Navbar, NavbarBrand, NavbarContent, Spinner } from "@nextui-org/react";

export default function App() {
  const { collections, isCollectionsLoading } = useCollections();
  const { templates, isTemplatesLoading } = useTemplates();
  const { productItems, isProductItemsLoading } = useProductItems();

  return (
    <>
      {isCollectionsLoading || isTemplatesLoading || isProductItemsLoading ? (
        <main className="h-screen flex justify-center items-center">
          <Spinner
            label={
              isCollectionsLoading
                ? "Organizing Collections"
                : "Transporting Products"
            }
          />
        </main>
      ) : (
        <main className="h-screen flex flex-col">
          <Navbar maxWidth="full">
            <NavbarBrand>
              <p className="text-2xl font-bold">Wisp</p>
            </NavbarBrand>
            <NavbarContent justify="end">
              <LogoutButton />
            </NavbarContent>
          </Navbar>
          <div className="h-full flex">
            <section className="flex-1 bg-background-500"></section>
            <section className="flex-3 bg-background-600"></section>
          </div>
        </main>
      )}
    </>
  );
}
