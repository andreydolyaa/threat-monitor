import React from "react";

const LogsTableThead = () => {
  const titles = [
    "ID",
    "alert rule",
    "severity",
    "source",
    "data",
    "agent",
    "endpoint IP",
  ];
  return (
    <thead>
      <tr>
        {/* <td>LOG ID</td>
        <td>ALERT RULE</td> */}
        {titles.map((title) => {
          return <td key={title}>{title}</td>;
        })}
      </tr>
    </thead>
  );
};

export default LogsTableThead;
