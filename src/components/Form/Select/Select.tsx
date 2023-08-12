import classNames from "classnames";
import {
  ForwardedRef, InputHTMLAttributes, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState
} from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type SelectOption = {
  value: string
  label: string
}

type Props = {
  options: SelectOption[]
  startUnselected?: boolean
  label?: string,
  handleChange?: (selectedOption: SelectOption) => void
}

export type SelectHandlers = {
  getValue: () => string | null;
};

function Select({
  options,
  startUnselected,
  label,
  required,
  className,
  handleChange,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>,
  ref?: ForwardedRef<SelectHandlers>) {
  const [selectedOption, setSelectedOption] = useState<SelectOption>();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startUnselected) {
      setSelectedOption(options[0]);
    }
  }, [options, startUnselected]);

  const getSelectedOptionLabel = useCallback(() => {
    if (!selectedOption) return <span>Select an option</span>;

    return <span>{selectedOption.label}</span>;
  }, [selectedOption]);

  const handleSelect = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.dataset.value) {
      const opt = options.find((o) => o.value == e.currentTarget.dataset.value);
      if (opt) {
        setSelectedOption(opt);
        handleChange?.(opt);
      }
    }
    setIsCollapsed(false);
  }, [options, handleChange]);

  const getOptions = useCallback(() => {
    if (!isCollapsed) return null;

    const rect = selectedOptionRef.current?.getBoundingClientRect();

    if (!rect) return null;

    const top = rect.y + rect.height;
    const left = rect.x;
    const width = rect.width;

    return <div className="c-select__options" style={{ top, left, width }}>
      {options.map((option, key) => {
        return <div className="c-select__option" key={key} onClick={(e) => handleSelect(e)} data-value={option.value}>
          {option.label}
        </div>;
      })}
    </div>;
  }, [isCollapsed, options, handleSelect]);

  const getLabel = useCallback(() => {
    if (label && required) {
      return <span className="c-select__label">{label}<span className="c-select__required-indicator">*</span></span>;
    } else if (label) {
      return <span className="c-select__label">{label}</span>;
    } else if (required) {
      return <span className="c-select__label"><span className="c-select__required-indicator">*</span></span>;
    } else {
      return null;
    }
  }, [label, required]);

  const getValue = useCallback((): string | null => {
    const value = inputRef.current?.value;

    if (value !== undefined) return value;

    return null;
  }, []);

  useImperativeHandle(ref, () => ({ getValue }));

  return (
    <div
      className={classNames(
        `c-select`, `${isCollapsed ? "c-select--collapsed" : null}`, className
      )}>
      {getLabel()}
      <div className="c-select__all-options-container">
        <div className="c-select__selected-option" onClick={() => setIsCollapsed(!isCollapsed)} ref={selectedOptionRef}>
          {getSelectedOptionLabel()}
          {isCollapsed ? <BsChevronUp /> : <BsChevronDown />}
        </div>
        {getOptions()}
      </div>
      <input
        data-c-type="select"
        data-start-unselected={startUnselected}
        value={selectedOption?.value ?? ""}
        readOnly={true}
        required={required}
        ref={inputRef}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Select);