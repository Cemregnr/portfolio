import "./globals.css";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";


export const metadata = {
  title: "Cemre Güner",
  description: "Cemre's Portfolio and Blog For English Teachers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
      </head>
      <body className="antialised bg-linear-to-b from-primary/10 to-primary/60 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body> 
    </html>
  );
}
