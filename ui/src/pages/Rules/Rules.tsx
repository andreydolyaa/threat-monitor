import "./Rules.css";
import { useEffect } from "react";
import { useRulesStore } from "../../store/rules";
import Container from "../../components/Container/Container";
import Toolbar from "../../components/Toolbar/Toolbar";
import Loading from "../../components/Loading/Loading";
import Empty from "../../components/Empty/Empty";

const Alerts = () => {
  const { getRules, rules, loading, error } = useRulesStore();

  useEffect(() => {
    getRules()
  }, []);

  if (loading && !rules.length) {
    return <Loading isFullPage={true} />;
  }

  if (!rules.length || error) {
    return <Empty message={error ? error : "no log data found"} />;
  }

  return (
    <Container column>
      <Toolbar>
        <div>x</div>
      </Toolbar>
      <div>
        {rules.map((rule) => {
          return <div key={rule._id}>
            <div>Pattern: {rule.pattern}</div>
            <div>Severity: {rule.severity}</div>
            <div>Summary: {rule.summary}</div>
            <div>Suspicious: {rule.suspicious}</div>
          </div>;
        })}
      </div>
    </Container>
  );
};

export default Alerts;
