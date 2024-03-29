import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politigram",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
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
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
