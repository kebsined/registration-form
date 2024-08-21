import styles from './Info.module.css';
export const Info = ({ name }) => {
	return <h1 className={styles.info}>{name}</h1>;
};
