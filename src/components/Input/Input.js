import styles from './Input.module.css';
export const Input = ({ type, name, value, placeholder, onChange }) => {
	return (
		<input
			className={styles.input}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};
