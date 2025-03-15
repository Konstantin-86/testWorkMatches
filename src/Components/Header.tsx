
import logo from "../assets/logo.png";
import refresh from "../assets/icons/refreshIcon.png";
import errorIcon from "../assets/icons/errorIcon.png";

import styles from "../styles/Header.module.css";

interface HeaderProps {
    error: boolean;
    loading: boolean;
    refreshButton: () => void;
}
const Header: React.FC<HeaderProps> = ({ error, loading, refreshButton }) => {
    return (
        <header className={styles.header}>
            <a href="#">
                <img src={logo} alt="" />
            </a>
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