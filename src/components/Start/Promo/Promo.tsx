import { Link, useNavigate } from 'react-router-dom';
import styles from './promo.module.sass';
import { Routes } from '../../../router/routes';

const Promo = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.promo}>
      <div>
        <h1 className="visually-hidden">Парсинг и рассылка</h1>
        <p className={styles.promoText}>
          Самый большой выбор парсеров
          <br />
          для поиска вашей
        </p>
        <p className={styles.accentPromoText}>горячей аудитории</p>
        <div className={styles.promo__wrapper}>
          <p className={styles.promoText}>в Телеграм</p>
          <button
            className={styles.parsingButton}
            onClick={() => navigate(Routes.Login)}
          >
            Найти аудиторию
          </button>
        </div>
      </div>
      <div className={styles.tariffsWrapper}>
        <p className={styles.tariffsText}>Тарифы</p>
        <div className={styles.tariffs__innerWrapper}>
          <p className={styles.tariffsText}>от</p>
          <p className={styles.accentTariffsText}>99₽</p>
        </div>
        <Link className={styles.infoLink} to={Routes.Tariffs}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};
export default Promo;
