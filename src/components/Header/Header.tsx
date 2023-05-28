import Image from "next/image";
import logo from "../../assets/logo/logo--transparent-bg.svg";
import { PropsWithChildren } from "react";
import Link from "next/link";

type Props = {
  bgColor?: "default" | "transparent";
};

function Header({ bgColor = "default", children }: Props & PropsWithChildren) {
  return (
    <div className={`c-header c-header--${bgColor}`}>
      <div className="c-header__logo">
        <Link href="/" className="c-header__logo__link">
          <Image
            className="c-header__svg"
            priority
            src={logo}
            alt="Conversail logo"
          />
          <span>Conversail</span>
        </Link>
      </div>

      <div className="c-header__children">{children}</div>
    </div>
  );
}

export default Header;