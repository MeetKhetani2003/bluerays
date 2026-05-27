import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blueraysgoa.com"),
  title: "Bluerays Goa | Luxury Resort & Spa",
  description: "Experience luxury stays, curated dining, breathtaking coastal views, and unforgettable moments in the heart of Goa at Bluerays Goa. Book your stay today.",
  keywords: "Goa, Luxury Resort, Bluerays Goa, Spa, Coastal, Dining, Hotel, Resort in Goa, Luxury Stays",
  openGraph: {
    title: "Bluerays Goa | Luxury Resort & Spa",
    description: "Experience luxury stays, curated dining, breathtaking coastal views, and unforgettable moments in the heart of Goa at Bluerays.",
    url: "https://blueraysgoa.com",
    siteName: "Bluerays Goa",
    images: [
      {
        url: "/exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Bluerays Goa Resort",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluerays Goa | Luxury Resort & Spa",
    description: "Experience luxury stays, curated dining, breathtaking coastal views, and unforgettable moments in the heart of Goa at Bluerays.",
    images: ["/exterior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Canela:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
