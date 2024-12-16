import "../../globals.css"
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Montserrat } from "next/font/google";

const fontFamily = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Login with Haadu-Hub",
  description: "Login page to authenticate through Haadu-Hub",
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <NextAuthProvider>
        <div className={fontFamily.className}>
          <main>{children}</main>
        </div>
      </NextAuthProvider>
  );
}
