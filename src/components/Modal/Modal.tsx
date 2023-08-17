"use client";

import {
  ForwardedRef,
  MouseEvent,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "../Button";
import classNames from "classnames";

type Props = {
  title: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => boolean;
  className?: string;
  noSubmit?: boolean;
};

export type ModalHandlers = {
  open: () => void;
  close: () => void;
};

function Modal({
  title,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  className,
  onSubmit,
  noSubmit
}: Props & PropsWithChildren,
  ref: ForwardedRef<ModalHandlers>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (e.target == e.currentTarget) close();
  }, [close]);

  const handleSubmit = useCallback(() => {
    if (!onSubmit) {
      close();
    } else {
      const response = onSubmit();

      if (response) close();
    }
  }, [close, onSubmit]);

  const getFooter = useCallback(() => {
    return <div className="c-modal__footer">
      {noSubmit ?
        <Button
          appearance="solid"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Close
        </Button> :
        <>
          <Button appearance="outline" color="neutral" onClick={() => close()}>
            {cancelLabel}
          </Button>
          <Button
            appearance="solid"
            color="primary"
            onClick={() => handleSubmit()}
          >
            {submitLabel}
          </Button>
        </>}
    </div>;
  }, [noSubmit, cancelLabel, close, handleSubmit, submitLabel]);

  useImperativeHandle(ref, () => ({ open, close }));

  if (!isOpen) return null;

  return (
    <div className="c-modal__background" onClick={(e) => handleClickOutside(e)}>
      <div className={classNames("c-modal", className)}>
        <div className="c-modal__title">{title}</div>
        <div className="c-modal__content">{children}</div>
        {getFooter()}
      </div>
    </div>
  );
}

export default forwardRef(Modal);
