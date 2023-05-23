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
      <body className={`${sen.className} mx-3 mb-3 bg-stone-50 md:mx-6`}>
        <Header />
        <main className="mt-6 flex justify-center">{children}</main>
      </body>
    </html>
  );
}
