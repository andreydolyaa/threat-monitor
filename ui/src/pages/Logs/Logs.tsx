import "./Logs.css";
import { useEffect, useState } from "react";
import { useLogsStore } from "../../store/logs";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import LogsToolbar from "./LogsToolbar";
import LogsTable from "./LogsTable";
import LogsTableHeader from "./LogsTableHeader";
import Empty from "../../components/Empty/Empty";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getLogs, logs, loading, error } = useLogsStore();
  const limit = 20;

  useEffect(() => {
    getLogs({ currentPage, limit, search }).then((logs) =>
      setTotalPages(logs.data.totalPages)
    );
  }, [currentPage, search]);

  if (loading) {
    return <Loading isFullPage={true} />;
  }
  
  if (!logs.length || error) {
    return <Empty message={error ? error : "no log data found"} />;
  }

  return (
    <Container column>
      <LogsToolbar />
      <LogsTableHeader />
      <LogsTable logs={logs} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Logs;
