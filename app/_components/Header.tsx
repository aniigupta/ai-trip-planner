"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuOptions = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

function Header() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded) return null;

  return (
    <div className="flex justify-between items-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>

      {/* Menu */}
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.href}>
            <h2
              className={`text-lg transition-all ${
                pathname === menu.href
                  ? "font-bold text-black-900"
                  : "hover:scale-105"
              }`}
            >
              {menu.label}
            </h2>
          </Link>
        ))}
      </div>

      {/* Auth Button */}
      <div>
        {!user ? (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <Link href={"/create-new-trip"}>
            <Button>Create New Trip</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
