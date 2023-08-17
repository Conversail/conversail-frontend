import { useCallback, useEffect, useState } from "react";

type Props = {
  onChange?: (value: boolean) => void
  initialValue?: boolean
}

function ToggleSwitch({ onChange, initialValue = false }: Props) {
  const [isToggled, setIsToggled] = useState<boolean>(initialValue);

  const handleChange = useCallback(() => {
    setIsToggled(!isToggled);
    onChange?.(!isToggled);
  }, [isToggled, onChange]);

  useEffect(() => {
    setIsToggled(initialValue);
  }, [initialValue]);

  return (
    <label className="c-toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={() => handleChange()} />
      <span className="c-toggle-switch__switch" />
    </label>
  );
}
export default ToggleSwitch;