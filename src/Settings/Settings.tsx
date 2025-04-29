// Settings component that allows users to customize the extension's appearance and functionality
// This component allows users to toggle dark mode and adjust the font size of the summary text
// Authored by Nayyir and Mark

import { FC } from "react";
import "./Settings.css";
//import React from "react";

interface SettingsProps {
  darkMode: boolean;
  onDarkModeChange: (v: boolean) => void;
  summaryFontSize: number;
  onSummaryFontSizeChange: (v: number) => void;
}

const Settings: FC<SettingsProps> = ({
  darkMode,
  onDarkModeChange,
  summaryFontSize,
  onSummaryFontSizeChange,
}) => (
  <div className="settings-container">
    <div className="setting-item">
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => onDarkModeChange(e.target.checked)}
        />
        Dark Mode
      </label>
    </div>
    <div className="setting-item">
      <label>
        Summary Font Size: {summaryFontSize}px
        <input
          type="range"
          min={12}
          max={24}
          value={summaryFontSize}
          onChange={(e) => onSummaryFontSizeChange(+e.target.value)}
        />
      </label>
    </div>
  </div>
);

export default Settings;