import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Astronaut Robot Simulator",
  description: "Web-based space robotics simulation with cinematic visuals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-space-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
