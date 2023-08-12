import classNames from "classnames";
import {
  TextareaHTMLAttributes, useCallback, useState
} from "react";

type Props = {
  label?: string
}

function TextArea({
  className,
  required,
  name,
  id,
  label,
  ...props
}: Props & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [value, setValue] = useState<string>("");

  const getLabel = useCallback(() => {
    if (label && required) {
      return <span className="c-textarea__label">{label}<span className="c-textarea__required-indicator">*</span></span>;
    } else if (label) {
      return <span className="c-textarea__label">{label}</span>;
    } else if (required) {
      return <span className="c-textarea__label"><span className="c-textarea__required-indicator">*</span></span>;
    } else {
      return null;
    }
  }, [label, required]);

  return (
    <div className={classNames("c-textarea", className)}>
      {getLabel()}
      <textarea name={name} id={id} onChange={e => setValue(e.currentTarget.value)} {...props}></textarea>
      <input data-c-type="select" readOnly={true} required={required} value={value} name={name} id={id} />
    </div >
  );
}

export default TextArea;