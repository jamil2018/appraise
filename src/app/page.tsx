import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button>
        <Link href="/login">Login</Link>
      </Button>
    </>
  );
};

export default Home;
