import {FC} from "react";
import styles from './style.module.css';


const Hints: FC = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <article>
                    Игра "Змейка"
                </article>
            </div>
        </section>
    );
};

export default Hints;
