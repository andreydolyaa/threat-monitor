import React, { useEffect } from "react";

import { LogProps } from "../../types";

export const LogDetails = ({ log }: LogProps) => {
  return <div className="log-details">{log?.logId!}</div>;
};
