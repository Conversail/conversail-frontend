import Image from "next/image";
import logo from "../../assets/logo/logo--transparent-bg.svg";
import { PropsWithChildren } from "react";
import Link from "next/link";

type Props = {
  bgColor?: "default" | "transparent";
  dropShadow?: boolean;
};

function Header({
  bgColor = "default",
  dropShadow = true,
  children,
}: Props & PropsWithChildren) {
  return (
    <div
      className={`c-header c-header--${bgColor} ${
        dropShadow ? "" : "c-header--no-shadow"
      }`}
    >
      <div className="c-header__logo">
        <Link href="/" className="c-header__logo__link">
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
