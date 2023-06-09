"use client";

import React, {
  ForwardedRef,
  MouseEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "../Button";

type Props = {
  title: string;
  content: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => boolean;
};

export type ModalHandlers = {
  open: () => void;
  close: () => void;
};

function Modal(
  {
    title,
    content,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    onSubmit,
  }: Props,
  ref: ForwardedRef<ModalHandlers>
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (e.target == e.currentTarget) close();
    },
    [close]
  );

  const handleSubmit = useCallback(() => {
    if (!onSubmit) {
      close();
    } else {
      const response = onSubmit();

      if (response) close();
    }
  }, [close, onSubmit]);

  useImperativeHandle(ref, () => ({ open, close }));

  if (!isOpen) return null;

  return (
    <div className="c-modal__background" onClick={(e) => handleClickOutside(e)}>
      <div className="c-modal">
        <div className="c-modal__title">{title}</div>
        <div className="c-modal__content">{content}</div>
        <div className="c-modal__footer">
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
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Modal);
