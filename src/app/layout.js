import "./globals.css";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";


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
      <body 
        className="antialised bg-linear-to-b from-primary/10 to-primary/60 min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            expand={true}
            richColors
            toastOptions={{
              duration: 4000,
            }}
          />
        </AuthProvider>
      </body> 
    </html>
  );
}
