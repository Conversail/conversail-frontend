"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

import captain from "../assets/captain/polygonal-captain.svg";
import backgroundedCaptain from "../assets/captain/polygonal-captain--backgrounded.svg";
import { Button, Header, ToggleThemeButton } from "../components";
import Modal, { ModalHandlers } from "../components/Modal/Modal";
import { PreferencesMenu } from "../components/PageComponents";
import { useTheme } from "../context/ThemeContext";

export default function Landing() {
  const { theme } = useTheme();
  const modalRef = useRef<ModalHandlers>(null);

  const handleOpenPreferences = useCallback(() => {
    modalRef.current?.open();
  }, []);

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
          <div className="p-landing__buttons">
            <Link href={"/chat"} passHref style={{ textDecoration: "none" }}>
              <Button>Start chatting</Button>
            </Link>
            <Button appearance="outline" onClick={() => handleOpenPreferences()}>Preferences</Button>
          </div>
        </div>
        <div className="p-landing__captain">
          <Image
            priority
            src={theme === "dark" ? backgroundedCaptain : captain}
            alt="Captain"
            className="p-landing__captain-drawing"
            blurDataURL={theme === "dark" ? backgroundedCaptain : captain}
          />
          <div className="p-landing__captain-hint">
            Don&#39;t forget to check out our rules to make this boat a better
            place!
          </div>
        </div>
      </main>
      <Modal className="p-landing__preferences-modal" title="Preferences" ref={modalRef} noSubmit >
        <PreferencesMenu />
      </Modal>
    </div>
  );
}
