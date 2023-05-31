"use client";

import { Button, Header, ToggleThemeButton } from "../components";
import Image from "next/image";
import captain from "../assets/captain/polygonal-captain.svg";
import backgroundedCaptain from "../assets/captain/polygonal-captain--backgrounded.svg";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Landing() {
  const [currentCaptain, setCurrentCaptain] = useState();
  const { theme } = useTheme();

  useEffect(() => {
    setCurrentCaptain(theme === "dark" ? backgroundedCaptain : captain);
  }, [theme]);

  return (
    <div className="p-landing">
      <Header bgColor="transparent" dropShadow={false}>
        <ToggleThemeButton />
      </Header>
      <main className="p-landing__main">
        <div className="p-landing__main-area">
          <h1 className="p-landing__headline">
            What do you want to <span>converse</span> about today?
          </h1>
          <Link href={"/chat"} passHref style={{ textDecoration: "none" }}>
            <div className="p-landing__buttons">
              <Button>Start chatting</Button>
            </div>
          </Link>
        </div>
        <div className="p-landing__captain">
          <Image
            priority
            src={currentCaptain ?? captain}
            alt="Captain"
            className="p-landing__captain-drawing"
          />
          <div className="p-landing__captain-hint">
            Don&#39;t forget to check out our rules to make this boat a better
            place!
          </div>
        </div>
      </main>
    </div>
  );
}
