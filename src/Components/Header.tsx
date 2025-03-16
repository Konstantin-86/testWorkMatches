
import logo from "../assets/logo.png";
import refresh from "../assets/icons/refreshIcon.png";
import errorIcon from "../assets/icons/errorIcon.png";
import arrowSelect from "../assets/icons/arrowSelected.svg";

import styles from "../styles/Header.module.css";

interface HeaderProps {
    error: boolean;
    loading: boolean;
    refreshButton: () => void;
    onSelectChange: (value: string) => void

}
const Header: React.FC<HeaderProps> = ({ error, loading, refreshButton, onSelectChange }) => {

    return (
        <header className={styles.header}>
            <a href="#">
                <img src={logo} alt="" />
            </a>
            <div className={styles.wrapSelected}>
                <select className={styles.filterStatus} id="filterStatus" onChange={(e) => onSelectChange(e.target.value)}>
                    <option value="all" >Все статусы</option>
                    <option value="live" >Live</option>
                    <option value="finished">Finished</option>
                    <option value="preparing">Match Preparing</option>
                </select>
                <img className={styles.arrow} src={arrowSelect} alt="" />
            </div>

            <div className={styles.leftSideHeader}>
                {error && <span className={styles.errorText}>
                    <img className={styles.errorIcon} src={errorIcon} alt="" />
                    Ошибка: не удалось загрузить информацию</span>}
                <button className={styles.buttonReset} onClick={refreshButton}>Обновить
                    <img className={loading && !error ? styles.loadingIcon : styles.refreshIcon} src={refresh} alt="" />
                </button>

            </div>

        </header>
    )
}

export default Header