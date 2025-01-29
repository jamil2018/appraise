"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        active={pathname === href}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
};

export default NavLink;
