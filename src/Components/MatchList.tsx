
import { useState } from "react";
import teamIcon from "../assets/icons/teamIcon.png";
import { Match } from "../types";
import styles from "../styles/MatchList.module.css";

import arrowDown from "../assets/icons/arrowDown.svg";
import arrowUp from "../assets/icons/arrowUp.svg";
import userIcon from "../assets/icons/userIcon.png";

interface MatchListProps {
    matches: Match[];
    getBackgroundColor: (status: Match["status"]) => string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, getBackgroundColor }) => {

    const [openMatches, setOpenMatches] = useState<Set<string>>(new Set());
    const toggleDetails = (matchId: string) => {
        setOpenMatches((prevOpenMatches) => {
            const newOpenMatches = new Set(prevOpenMatches);
            if (newOpenMatches.has(matchId)) {
                newOpenMatches.delete(matchId);
            } else {
                newOpenMatches.add(matchId);
            }
            return newOpenMatches;
        });
    };

    return (
        <ul className={styles.matchList}>
            {matches.map((match) => (
                <li className={styles.matchItem} key={match.title} onClick={() => toggleDetails(match.title)}>
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
                            <img
                                className={styles.arrow}
                                src={openMatches.has(match.title) ? arrowUp : arrowDown}
                                alt=""

                                style={{ cursor: "pointer" }}
                            />
                        </div>

                    </div>
                    <div className={openMatches.has(match.title) ? styles.wrap : styles.hidden}>
                        <div className={styles.teamList}>
                            <div className={styles.topStat}>
                                {match.homeTeam.players.map((player) => (
                                    <div className={styles.userItem} key={player.username}>
                                        <p className={styles.username}> <img src={userIcon} alt="userIcon" />{player.username}</p>
                                        <p className={styles.userKills}>Убийств: <span>{player.kills}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.bottomStat}>
                                <p>Points: <span>{match.homeTeam.points}</span></p>
                                <p >Место: <span>{match.homeTeam.place}</span></p>
                                <p>Всего убийств:<span>{match.homeTeam.total_kills}</span></p>
                            </div>
                        </div>
                        <p className={styles.vsText}>VS</p>
                        <div className={styles.teamList}>
                            <div className={styles.topStat}>
                                {match.awayTeam.players.map((player) => (
                                    <div className={styles.userItem} key={player.username}>
                                        <p className={styles.username}> <img src={userIcon} alt="userIcon" />{player.username}</p>
                                        <p className={styles.userKills}>Убийств: <span>{player.kills}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.bottomStat}>
                                <p>Points: <span>{match.awayTeam.points}</span></p>
                                <p >Место: <span>{match.awayTeam.place}</span></p>
                                <p>Всего убийств:<span>{match.awayTeam.total_kills}</span></p>
                            </div>
                        </div>

                    </div>
                </li>
            ))}
        </ul>
    )
}

export default MatchList