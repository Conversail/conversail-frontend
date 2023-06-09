"use client";

import Image from "next/image";
import logo from "../../assets/logo/logo--transparent-bg.svg";
import { PropsWithChildren, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  bgColor?: "default" | "transparent";
  dropShadow?: boolean;
  onBeforeExitPage?: () => boolean;
};

function Header({
  bgColor = "default",
  dropShadow = true,
  children,
  onBeforeExitPage,
}: Props & PropsWithChildren) {
  const router = useRouter();

  const handleExitPage = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();

      if (onBeforeExitPage) {
        const result = onBeforeExitPage();

        if (result) router.push(e.currentTarget.href);
      } else {
        router.push(e.currentTarget.href);
      }
    },
    [onBeforeExitPage, router]
  );

  return (
    <div
      className={`c-header c-header--${bgColor} ${
        dropShadow ? "" : "c-header--no-shadow"
      }`}
    >
      <div className="c-header__logo">
        <Link
          href="/"
          className="c-header__logo__link"
          onClick={handleExitPage}
        >
          <Image
            className="c-header__svg"
            priority
            src={logo}
            alt="Conversail logo"
          />
          <span className="notranslate">Conversail</span>
        </Link>
      </div>

      <div className="c-header__children">{children}</div>
    </div>
  );
}

export default Header;
