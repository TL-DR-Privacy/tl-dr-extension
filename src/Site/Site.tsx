// Site component that displays details for the site the user is currently visiting, along with the permissions it requests
// This component informs users about the nature of the permissions and clarifies that accepting them is optional
// Authored by Nayyir and Mark

import { FC, useEffect, useState } from "react";
import axios from "axios";
import "./Site.css";
//import React from "react";

interface SiteProps {
  siteName: string;
  summaryFontSize: number;
  darkMode: boolean;
}

const Site: FC<SiteProps> = ({ siteName, summaryFontSize, darkMode }) => {
  const [summary, setSummary] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.post(
          "https://tl-dr-privacy-production.up.railway.app/analyze",
          {
            url: `https://${siteName}`,
          }
        );
        setSummary(response.data.summary);
      } catch (err) {
        console.error(err);
        setError("Could not fetch summary.");
      }
    };
    if (siteName) {
      fetchSummary();
    }
  }, [siteName]);

  const formattedSummary = summary
    .split(/ \n{2,} | \*\* /g) // split on double newlines or markdown bold blocks
    .map((line) => line.trim())
    .filter((line) => line.length > 1 && line !== "*"); // remove empty lines and lone asterisks

  return (
    <div className={`site-container ${darkMode ? "dark-mode" : ""}`}>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul
          className="summary-list"
          style={{ paddingLeft: "1.2rem", fontSize: `${summaryFontSize}px` }}
        >
          {formattedSummary.map((section, idx) => (
            <li key={idx} style={{ marginBottom: "10px", lineHeight: "1.6" }}>
              {section}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Site;
