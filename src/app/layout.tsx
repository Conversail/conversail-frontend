import { cookies } from "next/dist/client/components/headers";
import ThemeProvider from "../context/ThemeContext";
import "../styles/main.scss";
import { Inter } from "next/font/google";
import SocketProvider from "../context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Conversail",
  description: "Let's talk!",
  themeColor: "#2b6be2"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <SocketProvider>
            {children}
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
