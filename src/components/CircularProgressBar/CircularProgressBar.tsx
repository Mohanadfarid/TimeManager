import { type ReactNode, type FunctionComponent } from "react";
import "./CircularProgressBar.scss";

interface CircularProgressBarProps {
  children: ReactNode;
  totalSeconds: number;
  passedSeconds: number;
}

const CircularProgressBar: FunctionComponent<CircularProgressBarProps> = ({
  children,
  passedSeconds,
  totalSeconds,
}) => {
  const progress: number = (passedSeconds / totalSeconds) * 580;
  return (
    <div className="progress-container">
      <div className="circular-progress-bar">
        <div className="inner">{children}</div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={"217px"}
        height={"217px"}
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset={"0%"} stopColor="#DA22FF" />
            <stop offset={"100%"} stopColor="#9733EE" />
          </linearGradient>
        </defs>
        <circle
          cx={"50%"}
          cy={"50%"}
          r={"42%"}
          strokeLinecap="round"
          style={{ strokeDashoffset: 580 - progress }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
