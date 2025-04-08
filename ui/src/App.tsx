
import { useEffect } from "react";
import Layout from "./layout/Layout";
import { useStore } from "./store/useStore";

function App() {
    // const user = useStore((state) => state.user);
    const fetchUser = useStore((state) => state.fetchUser);

    useEffect(() => {
      fetchUser();
    },[])
  return <Layout />;
}

export default App;
