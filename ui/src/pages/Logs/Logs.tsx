import React, { useEffect, useState } from "react";
import { useLogsStore } from "../../store/logs";
import Pagination from "../../components/Pagination/Pagination";
import LogsTable from "./LogsTable";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getLogs } = useLogsStore();
  const limit = 6;

  useEffect(() => {
    getLogs({ currentPage, limit, search }).then((logs) =>
      setTotalPages(logs.data.totalPages)
    );
    
  }, [currentPage, search]);

  return (
    <div className="logs">
      <LogsTable />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Logs;
