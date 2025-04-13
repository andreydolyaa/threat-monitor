import "./Logs.css";
import { useEffect, useState } from "react";
import { useLogsStore } from "../../store/logs";
import Pagination from "../../components/Pagination/Pagination";
import LogsTable from "./LogsTable";
import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import LogsToolbar from "./LogsToolbar";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getLogs, logs, loading } = useLogsStore();
  const limit = 20;

  useEffect(() => {
    getLogs({ currentPage, limit, search }).then((logs) =>
      setTotalPages(logs.data.totalPages)
    );
  }, [currentPage, search]);

  const fetching = () => {
    return <Loading isFullPage={true} />;
  };

  // TODO: handle
  const empty = () => {
    return <div>EMPTY (NO SEARCH RESULTS OR NO DATA FETCHED)</div>;
  };

  if (loading) return fetching();
  if (!loading && !logs.length) return empty();

  return (
    <Container>
      <div className="logs-wrapper">
        <LogsToolbar />
        
        <div className="logs">
          <LogsTable logs={logs} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  );
};

export default Logs;
