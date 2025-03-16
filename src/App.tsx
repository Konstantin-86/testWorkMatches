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
  const [filteredMatches, setFilteredMatches] = useState<ApiResponse>({
    ok: false,
    data: { matches: [] },
  });;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "live":
        const liveMatches = matchesData.data.matches.filter((match: Match) => match.status === "Ongoing");
        setFilteredMatches({ ok: true, data: { matches: liveMatches } });
        break;
      case "finished":
        const finishedMatches = matchesData.data.matches.filter((match: Match) => match.status === "Finished");
        setFilteredMatches({ ok: true, data: { matches: finishedMatches } });
        break;
      case "preparing":
        const preparingMatches = matchesData.data.matches.filter((match: Match) => match.status === "Scheduled");
        setFilteredMatches({ ok: true, data: { matches: preparingMatches } });
        break;
      default:
        setFilteredMatches({ ok: true, data: { matches: matchesData.data.matches } });
        break;
    }
  }


  const fetchData = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setMatchesData(response.data);
        setFilteredMatches(response.data);
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

  return (
    <>
      <div className={styles.container}>
        <Header
          error={error}
          loading={loading}
          refreshButton={refreshButton}
          onSelectChange={handleSelectChange}
        />
        {!loading &&
          <MatchList
            matches={filteredMatches.data.matches}
            getBackgroundColor={getBackgroundColor}
          />
        }
      </div>
    </>
  );
}

export default App;
