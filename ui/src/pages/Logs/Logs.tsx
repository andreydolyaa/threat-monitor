import "./Logs.css";
import { useEffect, useState } from "react";
import { useLogsStore } from "../../store/logs";
import Container from "../../components/Container/Container";
import LogsToolbar from "./LogsToolbar";
import LogsTable from "./LogsTable";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getLogs, logs, loading, error } = useLogsStore();
  const limit = 12;

  useEffect(() => {
    getLogs({ currentPage, limit, search, severity }).then((logs) => {
      setTotalPages(logs.data.totalPages);
    });
  }, [currentPage, search, severity]);

  return (
    <Container column>
      <LogsToolbar
        onSearch={setSearch}
        setSeverity={setSeverity}
        setCurrentPage={setCurrentPage}
      />
      <LogsTable
        logs={logs}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default Logs;
