

import teamIcon from "../assets/icons/teamIcon.png";
import { Match } from "../types";
import ItemDetails from "./ItemDetails";
import styles from "../styles/MatchList.module.css";

interface MatchListProps {
    matches: Match[];
    getBackgroundColor: (status: Match["status"]) => string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, getBackgroundColor }) => {
    return (
        <ul className={styles.matchList}>
            {matches.map((match) => (
                <li className={styles.matchItem} key={match.title}>
                    <div className={styles.item}>
                        <div className={styles.homeTeam}>
                            <img className={styles.teamIcon} src={teamIcon} alt="Иконка команды" />
                            {match.homeTeam.name}
                        </div>
                        <div className={styles.scoreWrap}>
                            <div className={styles.score}>
                                {match.homeScore} : {match.awayScore}
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
                            <img className={styles.teamIcon} src={teamIcon} alt="Иконка команды" />
                            {match.awayTeam.name}
                        </div>

                    </div>

                    <ItemDetails
                        homeTeam={match.homeTeam}
                        awayTeam={match.awayTeam}
                    />
                </li>
            ))}
        </ul>
    )
}

export default MatchList