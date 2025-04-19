import "./Logs.css";
import { useEffect, useState } from "react";
import { useLogsStore } from "../../store/logs";
import Pagination from "../../components/Pagination/Pagination";
import Container from "../../components/Container/Container";
import LogsToolbar from "./LogsToolbar";
import LogsTable from "./LogsTable";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getLogs, logs, loading, error } = useLogsStore();
  const limit = 12;

  useEffect(() => {
    getLogs({ currentPage, limit, search }).then((logs) =>
      setTotalPages(logs.data.totalPages)
    );
  }, [currentPage, search]);

  const handleOnSearch = (data: any) => {
    setSearch(data);
  };

  return (
    <Container column>
      <LogsToolbar onSearch={handleOnSearch} />
      <LogsTable logs={logs} loading={loading} error={error} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Logs;
