import type { Metadata } from "next";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import ModeToggle from "@/components/mode-toggle";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/home");
      }

  return (
    <html lang="en">
      <Provider>
          <body className="font-primary flex flex-col h-screen justify-between items-center">
            <NavBar atLogin={true} />
            {children}
            <div>footer placeholder</div>
          </body>
      </Provider>
    </html>
  );
}