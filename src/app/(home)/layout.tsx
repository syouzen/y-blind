import Link from "next/link";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import Image from "@/components/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/logo.png"
            alt="YBLIND"
            width={0}
            height={0}
            style={{ width: "100px", height: "auto", objectFit: "cover" }}
            sizes="100vw"
          />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/login">로그인</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      {children}
    </div>
  );
}
