import styles from './ErrorIndicator.module.css';

export default function ErrorIndicator({error}: {error: string}) {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
}
