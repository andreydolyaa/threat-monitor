import dayjs from "dayjs";
import { LogProps } from "../../types";
import Badge from "../../components/Badge/Badge";

const LogsItem = ({ log, onClick }: LogProps) => {
  const setSeverity = (severity: number) => {
    return severity <= 5
      ? { severity: "low", color: "rgba(8, 255, 139, 0.1)" }
      : severity <= 7
      ? { severity: "medium", color: "rgba(255, 111, 0, 0.1)" }
      : { severity: "high", color: "rgba(255, 0, 98, 0.1)" };
  };

  const { severity, color } = setSeverity(log.data.processed.severity);

  return (
    <div className="log-row" onClick={onClick}>
      <div className="log-item center">
        <input type="checkbox" />
      </div>
      <div className="log-item">{log.logId}</div>
      <div className="log-item">{<Badge color={color} text={severity} />}</div>
      <div className="log-item">
        {dayjs(log.timestamp).format("DD/MM/YY hh:mm:ss")}
      </div>
      <div className="log-item">{log.data.processed.summary}</div>
      <div className="log-item">{log.path}</div>
      <div className="log-item">{log.endpointIp}</div>
      <div className="log-item">{log.agentName}</div>
    </div>
  );
};

export default LogsItem;
