import "./globals.css";
// Keep your other css imports if they are there (like svgmap)
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Providers";

export const metadata = {
  title: "ByteBack Shop",
  description: "Quality second-hand Apple gear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}