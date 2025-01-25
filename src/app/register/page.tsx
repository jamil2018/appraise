import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FlaskConical } from "lucide-react";
import Link from "next/link";
import RegisterForm from "./registerForm";

const Register = () => {
  return (
    <div className="grid place-items-center h-screen -mt-16">
      <div className="w-3/4 mx-auto mt-8 bg-gradient-to-r dark:from-white/5 dark:via-white/10 dark:to-white/5 backdrop-blur-lg rounded-lg p-4 border dark:border-white/10 border-slate-700/10 flex gap-4 justify-between items-center from-slate-500/5 via-slate-500/10 to-slate-500/5">
        <div className="flex-1 flex items-center justify-center">
          <FlaskConical size={50} className="mr-2 text-primary" />
          <span className="tracking-widest text-6xl underline dark:bg-primary dark:text-gray-700 rounded-l-lg pl-2 pb-4 bg-gray-800 text-white">
            app
          </span>
          <span className="tracking-widest text-6xl text-primary">raise</span>
        </div>
        <Card className="bg-transparent border-none shadow-none flex-1">
          <div className="w-fit">
            <CardHeader>
              <CardTitle className="text-4xl">Welcome to Appraise</CardTitle>
              <CardDescription className="text-md">
                Sign up to start managing your test cases
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <RegisterForm />
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground my-4 inline-block">
                  Already have an account?{" "}
                </span>
                <Button variant="link" className="font-semibold text-sm px-1">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
