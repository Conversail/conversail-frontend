"use client";

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { BsChatText, BsImage, BsMic, BsMoon } from "react-icons/bs";

import { useSocket } from "@/src/context/SocketContext";
import { useTheme } from "@/src/context/ThemeContext";
import { ChattingSettings, EventsToServer } from "@/src/types";
import { getChattingSettings } from "@/src/utils";

import languages from "../../../../static/languages.json";
import { Select, ToggleSwitch } from "../../../Form";

function PreferencesMenu() {
  const { socket } = useSocket();
  const { toggleTheme, theme } = useTheme();
  const [chattingSettings, setChattingSettings] = useState<ChattingSettings>();

  const handleChange = useCallback((name: string, value: boolean | string) => {
    const settings = getChattingSettings();

    const json: Record<string, string | boolean> = {
      pairingLanguage: String(settings.pairingLanguage),
      allowImages: Boolean(settings.allowImages),
      allowVoiceMessages: Boolean(settings.allowVoiceMessages)
    };

    json[name] = value;

    localStorage.setItem("chattingSettings", JSON.stringify(json));
    setChattingSettings(json as ChattingSettings);
    socket?.emit(EventsToServer.updateChatPreferences, json);
  }, [socket]);

  useEffect(() => {
    const settings = getChattingSettings();
    setChattingSettings(settings);
  }, []);

  return (
    <div className="c-preferences-menu">
      <div className="c-preferences-menu__options-container">
        <div className="c-preferences-menu__option-label">
          <BsChatText className="c-preferences-menu__icon" />
          <span>Pairing language</span>
        </div>
        <Select
          className="c-preferences-menu__select-pairing-lang"
          handleChange={(v) => handleChange("pairingLanguage", v.value)}
          options={languages.map(lang => ({ label: lang.name, value: lang.code }))}
          initialValue={chattingSettings?.pairingLanguage ?? "en"} />
      </div>
      <div className="c-preferences-menu__options-container" >
        <span>Let people send you:</span>
        <label className={classNames("c-preferences-menu__option", "c-preferences-menu__receive-option")}>
          <div className="c-preferences-menu__option-label">
            <BsImage className="c-preferences-menu__icon" />
            <span>Images</span>
          </div>
          <ToggleSwitch onChange={(v) => handleChange("allowImages", v)} initialValue={chattingSettings?.allowImages ?? false} />
        </label>
        <label className={classNames("c-preferences-menu__option", "c-preferences-menu__receive-option")}>
          <div className="c-preferences-menu__option-label">
            <BsMic className="c-preferences-menu__icon" />
            <span>Voice messages</span>
          </div>
          <ToggleSwitch onChange={(v) => handleChange("allowVoiceMessages", v)} initialValue={chattingSettings?.allowVoiceMessages ?? false} />
        </label>
      </div>
      <label className="c-preferences-menu__option">
        <div className="c-preferences-menu__option-label">
          <BsMoon className="c-preferences-menu__icon" />
          <span>Dark theme</span>
        </div>
        <ToggleSwitch onChange={(v) => toggleTheme(v ? "dark" : "light")} initialValue={theme == "dark"} />
      </label>
    </div>
  );
}

export default PreferencesMenu;