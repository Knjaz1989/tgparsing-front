import { CSSProperties, FC, ReactNode, useEffect } from 'react';
import styles from './modal-window.module.sass';

type ModalWindowProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
  style?: CSSProperties;
  children: ReactNode;
  clickByOut?: boolean;
};

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  isActive,
  setActive,
  style,
  clickByOut = true,
}) => {
  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        setActive(false);
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setActive]);

  useEffect(() => {
    document.body.style.overflowY = isActive ? 'hidden' : 'auto';
  }, [isActive]);

  return (
    <div
      className={`${styles.modal} ${isActive ? styles.modal__active : ''}`}
      {...(clickByOut ? { onClick: () => setActive(false) } : {})}
    >
      <div
        className={`${styles.content} ${
          isActive ? styles.content__active : ''
        }`}
        style={style}
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => setActive(false)}
        >
          <span className="visually-hidden">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
