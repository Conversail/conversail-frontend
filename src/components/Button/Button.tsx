import { ButtonHTMLAttributes } from "react";

type Props = {
  appearance?: "solid" | "outline";
  color?: "primary" | "neutral";
};

function Button({
  children,
  appearance = "solid",
  color = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      className={`c-button c-button--${appearance} c-button--${color}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
