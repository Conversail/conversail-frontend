import { ChattingSettings } from "../types";

export const getChattingSettings = (): ChattingSettings => {
  const settings: Record<string, unknown> = JSON.parse(localStorage.getItem("chattingSettings") ?? "{}");
  const parsedSettings: ChattingSettings = {
    pairingLanguage: !settings.pairingLanguage || settings.pairingLanguage === "undefined" ? "en" : String(settings.pairingLanguage),
    allowImages: Boolean(settings.allowImages) ?? false,
    allowVoiceMessages: Boolean(settings.allowVoiceMessages) ?? false
  };

  if (!settings.pairingLanguage || !settings.allowImages || !settings.allowVoiceMessages) {
    localStorage.setItem("chattingSettings", JSON.stringify(parsedSettings));
  }

  return parsedSettings;
};