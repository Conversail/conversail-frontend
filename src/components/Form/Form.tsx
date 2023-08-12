import classNames from 'classnames';
import {
  FormHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef, useCallback, useImperativeHandle, useRef
} from 'react';

export type FormHandlers = {
  submit: () => Record<string, unknown> | null
}

function Form({
  children,
  className,
  ...props
}: PropsWithChildren & FormHTMLAttributes<HTMLFormElement>,
  ref: ForwardedRef<FormHandlers>) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((): Record<string, unknown> | null => {
    const inputs = formRef.current?.getElementsByTagName("input");

    if (!inputs) return null;

    const formValues: Record<string, unknown> = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required && ((inputs[i].value === undefined) || (inputs[i].value === ""))) {
        return null;
      }

      if (inputs[i].name) {
        formValues[inputs[i].name] = inputs[i].value;
      }
    }

    return formValues;
  }, []);

  useImperativeHandle(ref, () => ({ submit: handleSubmit }));

  return (
    <form onSubmit={() => handleSubmit()} className={classNames("c-form", className)} ref={formRef} noValidate {...props}>{children}</form>
  );
}

export default forwardRef(Form);