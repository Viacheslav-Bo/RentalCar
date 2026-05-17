import { ReactNode } from "react";

const CalendarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          border: "1px solid #3470ff",
          borderRadius: "12px",
          overflow: "visible",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
          width="20"
          height="16"
          viewBox="0 0 20 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10L10 0L20 10"
            fill="white"
            stroke="#3470ff"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <rect x="0" y="7" width="20" height="5" fill="white" />
        </svg>
        {children}
      </div>
    </div>
  );
};

export default CalendarContainer;
