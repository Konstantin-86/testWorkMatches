import { useEffect, useState } from "react";
import axios from "axios";
import MatchList from "./MatchList";
import { ApiResponse, Match } from "./types";
import teamIcon from "../public/icons/teamIcon.png";
import styles from "./styles/App.module.css";

const baseURL = "https://app.ftoyd.com/fronttemp-service/fronttemp";

function App() {
  const [matchesData, setMatchesData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(baseURL)
        .then((response) => {
          setMatchesData(response.data);
          if (response.data.ok) {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    };

    fetchData();
  }, []);
  console.log(matchesData?.data.matches);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>"Ошибка: не удалось загрузить информацию"</p>
          ) : (
            matchesData?.data.matches.map((match: Match) => (
              <div className={styles.matchWrap} key={match.title}>
                <div className={styles.homeTeam}>
                  <img src={teamIcon} alt="" />
                  {match.homeTeam.name}
                </div>
                <div className={styles.scoreWrap}>
                  <div className={styles.score}>
                    {match.homeScore}:{match.awayScore}
                  </div>
                  <div
                    className={styles.curStatus}
                    style={{
                      backgroundColor: getBackgroundColor(match.status),
                    }}
                  >
                    {match.status}
                  </div>
                </div>
                <div className={styles.awayTeam}>
                  <img src={teamIcon} alt="" /> {match.awayTeam.name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
