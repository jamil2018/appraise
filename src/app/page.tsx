import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
