import Logo from "@/components/logo";
import NavLink from "@/components/navigation/nav-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="ml-2 py-2">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center">
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Logo />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/test-suites">Test Suites</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/test-cases">Test Cases</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/test-runs">Test Runs</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/users">Users</NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      {children}
    </>
  );
}
