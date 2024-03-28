import { RegisterForm } from "@/components/auth/register-form";
import { cookies } from "next/headers";

export default function Register() {
  const cookieStore = cookies();

  const username = cookieStore.get("visitor")?.value;
  return (
    <div className="sm:px-44 w-full xl:px-80 lg:flex justify-center items-center">
      <RegisterForm visitorUsername={username} />
    </div>
  );
}
