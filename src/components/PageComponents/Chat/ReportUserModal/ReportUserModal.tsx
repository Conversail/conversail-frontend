import { ForwardedRef, forwardRef, useCallback, useRef, useState } from "react";

import { useSocket } from "@/src/context/SocketContext";
import { EventsToServer } from "@/src/types";

import { Form, Select, TextArea } from "../../../Form";
import { FormHandlers } from "../../../Form/Form";
import { Modal } from "../../../Modal";
import { ModalHandlers } from "../../../Modal/Modal";

type Props = {
  pairingStatus: "lazy" | "pairing" | "paired",
}

function ReportUserModal({ pairingStatus }: Props, ref: ForwardedRef<ModalHandlers>) {
  const { socket } = useSocket();
  const [isOtherReasonSelected, setIsOtherReasonSelected] = useState<boolean>(false);
  const reportUserFormRef = useRef<FormHandlers>(null);

  const handleReportSubmit = useCallback((): boolean => {
    const values = reportUserFormRef.current?.submit();

    if (!values) return false;

    if (!values.reason) return false;

    socket?.emit(EventsToServer.reportMate, { reason: values.reason });
    return true;
  }, [socket]);

  const handleSelectReportReason = useCallback((selectedOption: { label: string, value: string }) => {
    if (selectedOption.value === "0") {
      setIsOtherReasonSelected(true);
    } else {
      setIsOtherReasonSelected(false);
    }
  }, []);

  return (
    <Modal title="Report user" submitLabel="Report" ref={ref} onSubmit={handleReportSubmit}>
      <div className="p-chat__report-modal-content">
        {pairingStatus === "paired" ? <p className="p-chat__report-modal-content__warning">This action will end up this chat!</p> : null}
        <Form ref={reportUserFormRef}>
          <Select
            name="reason"
            id="reason-select"
            label="Reason"
            handleChange={handleSelectReportReason}
            required
            options={
              [
                {
                  label: "Spam",
                  value: "1"
                },
                {
                  label: "Underage",
                  value: "2"
                },
                {
                  label: "Sexual harassment",
                  value: "3"
                },
                {
                  label: "Discrimination",
                  value: "4"
                },
                {
                  label: "Just annoying",
                  value: "5"
                },
                {
                  label: "Other",
                  value: "0"
                }
              ]
            }
          />
          {isOtherReasonSelected ? <TextArea name="other-reason" id="other-reason-select" /> : null}
        </Form>
      </div>
    </Modal >
  );
}

export default forwardRef(ReportUserModal);