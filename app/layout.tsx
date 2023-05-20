import Header from "@/components/Header";
import "./globals.css";
import { Sen } from "next/font/google";

const sen = Sen({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Aell",
  description: "Jewellery by Anastasiia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sen.className} m-3`}>
        <Header />
        <main className="mt-6 flex justify-center">{children}</main>
      </body>
    </html>
  );
}
