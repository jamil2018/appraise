import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Logo />
      <Button className="mr-2">
        <Link href="/login">Login</Link>
      </Button>
      <Button>
        <Link href="/register">Register</Link>
      </Button>
    </>
  );
};

export default Home;
