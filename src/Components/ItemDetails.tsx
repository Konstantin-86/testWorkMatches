import styles from "../styles/ItemDetails.module.css"
import { Team } from "../types";
import userIcon from "../../public/icons/userIcon.png"

interface ItemDetailsProps {
    homeTeam: Team;
    awayTeam: Team;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ homeTeam, awayTeam }) => {
    console.log(homeTeam);

    return (
        <div className={styles.wrap}>
            <ul className={styles.teamList}>
                {homeTeam.players.map((player) => (
                    <li className={styles.userItem} key={player.username}>

                        <p className={styles.username}> <img src={userIcon} alt="userIcon" />{player.username}</p>
                        <p className={styles.userKills}>Убийств: <span>{player.kills}</span></p>
                    </li>
                ))}
                <div className={styles.bottomStat}>
                    <p>Points: <span>{homeTeam.points}</span></p>
                    <p>Место: <span>{homeTeam.place}</span></p>
                    <p>Всего убийств:<span>{homeTeam.total_kills}</span></p>
                </div>
            </ul>

            <ul className={styles.teamList}>
                {awayTeam.players.map((player) => (
                    <li className={styles.userItem} key={player.username}>

                        <p className={styles.username}><img src={userIcon} alt="userIcon" /> {player.username}</p>
                        <p className={styles.userKills}>Убийств: <span>{player.kills}</span></p>

                    </li>
                ))}
                <div className={styles.bottomStat}>
                    <p>Points: <span>{homeTeam.points}</span></p>
                    <p>Место: <span>{homeTeam.place}</span></p>
                    <p>Всего убийств:<span>{homeTeam.total_kills}</span></p>
                </div>
            </ul>

        </div>
    )
}

export default ItemDetails