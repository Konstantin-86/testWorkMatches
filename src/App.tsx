import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse, Match } from "./types";
import styles from "./styles/App.module.css";
import Header from "./Components/Header";
import MatchList from "./Components/MatchList";

const baseURL = "https://app.ftoyd.com/fronttemp-service/fronttemp";

const getBackgroundColor = (status: Match["status"]): string => {
  switch (status) {
    case "Finished":
      return "#eb0237";
    case "Ongoing":
      return "#43ad28";
    case "Scheduled":
      return "#eb6402";
    default:
      return "#FFFFFF";
  }
};

function App() {
  const [matchesData, setMatchesData] = useState<ApiResponse>({
    ok: false,
    data: { matches: [] },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setMatchesData(response.data);
        if (response.data.ok) {
          setLoading(false);
          setError(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const refreshButton = () => {
    setLoading(true);
    fetchData();
  }
  console.log(matchesData);


  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <Header
            error={error}
            loading={loading}
            refreshButton={refreshButton}
          />
          {!loading &&
            <MatchList
              matches={matchesData.data.matches}
              getBackgroundColor={getBackgroundColor}
            />
          }
        </div>
      </div>
    </>
  );
}

export default App;
