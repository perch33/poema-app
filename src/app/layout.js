import { Love_Light } from "next/font/google";
import "stellarstyles.css";
import './global.css'

const love_Light = Love_Light({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Poemas Románticos",
  description:
    "Poemas Románticos generados de manera aleatoria por el dia de san Valentin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={love_Light.className}>{children}</body>
    </html>
  );
}
