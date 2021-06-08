import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

import User from '../interfaces/User';
import extendedLogo from '../assets/icons/extended-logo.svg';
import loading from '../assets/animations/loading.json';
import styles from '../styles/pages/CreateAccount.module.scss';

const CreateAccount: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    emailAgain: '',
    password: '',
    passwordAgain: '',
  });

  useEffect(() => {
    const isInputsEmpties = user.firstName === ''
      || user.lastName === ''
      || user.email === ''
      || user.emailAgain === ''
      || user.password === ''
      || user.passwordAgain === '';
    setIsDisabled(isInputsEmpties);
  }, [user]);

  function handleLoading() {
    setIsLoading(true);
  }

  return (
    <div className={styles.createAccount}>
      <section>
        <h1>Criar conta</h1>
        <form action="POST">
          <div>
            <label htmlFor="firstName">
              <span>Nome</span>
              <input
                type="text"
                id="firstName"
                placeholder="Digite seu nome aqui"
                value={user.firstName}
                onChange={(evt) => setUser({ ...user, firstName: evt.target.value })}
              />
            </label>
            <label htmlFor="lastName">
              <span>Sobrenome</span>
              <input
                type="text"
                id="lastName"
                placeholder="Digite seu sobrenome aqui"
                value={user.lastName}
                onChange={(evt) => setUser({ ...user, lastName: evt.target.value })}
              />
            </label>
          </div>
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email aqui"
              value={user.email}
              onChange={(evt) => setUser({ ...user, email: evt.target.value })}
            />
          </label>
          <label htmlFor="emailAgain">
            <span>Confirmar email</span>
            <input
              type="email"
              id="emailAgain"
              placeholder="Digite novamente seu email aqui"
              value={user.emailAgain}
              onChange={(evt) => setUser({ ...user, emailAgain: evt.target.value })}
            />
          </label>
          <label htmlFor="password">
            <span>Senha</span>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha aqui"
              value={user.password}
              onChange={(evt) => setUser({ ...user, password: evt.target.value })}
            />
          </label>
          <label htmlFor="passwordAgain">
            <span>Confirmar senha</span>
            <input
              type="password"
              id="passwordAgain"
              placeholder="Digite novamente sua senha aqui"
              value={user.passwordAgain}
              onChange={(evt) => setUser({ ...user, passwordAgain: evt.target.value })}
            />
          </label>
          <button type="submit" disabled={isDisabled} onClick={handleLoading}>
            {isLoading ? (
              <Lottie
                options={{
                  loop: true,
                  animationData: loading,
                }}
                width={100}
              />
            ) : (
              'Confirmar'
            )}
          </button>
        </form>
      </section>
      <section>
        <img src={extendedLogo} alt="Criar conta" />
      </section>
    </div>
  );
};

export default CreateAccount;
