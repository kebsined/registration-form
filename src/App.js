import { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import { Input } from './components/Input/Input';
import { Info } from './components/Info/Info';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [name, setName] = useState('Регистрация');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmedPasswordError, setConfirmedPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password, confirmedPassword });
		setName('Вы успешно зарегестрировались!');
		setEmail('');
		setPassword('');
		setConfirmedPassword('');
	};

	const onEmailChange = ({ target }) => {
		setName('Регистрация');
		setEmail(target.value);
		let error = null;
		if (!/^[\w_@.]*$/.test(target.value)) {
			error =
				'Неверный адрес электронной почты! Допустимые символы - буквы, цифры, нижнее подчеркивание и знак @';
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setName('Регистрация');
		setPassword(target.value);
		let passwordError = null;
		if (!/^(((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).{8,})*$/.test(target.value)) {
			passwordError =
				'В пароле должно быть минимум 8 символов: из них должна быть хотя бы одна строчная буква, одна заглавная буква и одна цифра';
		}
		setPasswordError(passwordError);
	};

	const onConfirmChange = ({ target }) => {
		setName('Регистрация');
		setConfirmedPassword(target.value);
		let confirmedPasswordError = null;
		if (target.value !== password) {
			confirmedPasswordError = 'Введенные пароли не совпадают!';
			setConfirmedPasswordError(confirmedPasswordError);
		}
		setConfirmedPasswordError(confirmedPasswordError);
	};

	useEffect(() => {
		if (confirmedPasswordError === null) {
			submitButtonRef.current.focus();
		}
	}, [confirmedPasswordError]);

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<Info name={name} />
				{setEmailError && <span className={styles.error}>{emailError}</span>}
				<Input
					type="email"
					name="email"
					value={email}
					placeholder="Введите Ваш адрес электронной почты..."
					onChange={onEmailChange}
				/>
				{setPasswordError && (
					<span className={styles.error}>{passwordError}</span>
				)}
				<Input
					type="password"
					name="password"
					value={password}
					placeholder="Введите Ваш пароль..."
					onChange={onPasswordChange}
				/>
				{setConfirmedPasswordError && (
					<span className={styles.error}>{confirmedPasswordError}</span>
				)}
				<Input
					type="password"
					name="password"
					value={confirmedPassword}
					placeholder="Подтвердите Ваш пароль..."
					onChange={onConfirmChange}
				/>
				<button
					ref={submitButtonRef}
					className={styles.button}
					type="submit"
					disabled={
						emailError !== null ||
						passwordError !== null ||
						confirmedPasswordError !== null ||
						email === '' ||
						password === '' ||
						confirmedPassword === ''
					}
				>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
