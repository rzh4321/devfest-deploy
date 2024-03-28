import { LoginForm } from "@/components/auth/login-form";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Login() {
  const cookieStore = cookies();

  const username = cookieStore.get("visitor")?.value;
  return (
    <div className="lg:flex justify-between items-center sm:px-44 w-full xl:px-80">
      <div className="hidden lg:block">
        <Image alt="logo" width={400} height={400} src={"/logo.png"} />
      </div>
      <LoginForm visitorUsername={username} />
    </div>
  );
}
