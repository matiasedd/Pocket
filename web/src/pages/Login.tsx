import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import extendedLogo from '../assets/icons/extended-logo.svg';
import rightArow from '../assets/icons/right-arrow.svg';
import loading from '../assets/animations/loading.json';
import styles from '../styles/pages/Login.module.scss';

const Landing: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  function handleLoading() {
    setIsLoading(true);
  }

  return (
    <div className={styles.loginContainer}>
      <section>
        <div>
          <a href="/">
            <img src={rightArow} alt="Voltar" />
          </a>
          <img src={extendedLogo} alt="Entrar com conta" height="80px" />
        </div>
      </section>
      <section>
        <h1>Entre com sua conta</h1>
        <form action="#" method="post">
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email aqui"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </label>
          <label htmlFor="pass">
            <span>Senha</span>
            <input
              type="password"
              id="pass"
              placeholder="Digite sua senha aqui"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </label>
          <a href="/login">Esqueceu sua senha?</a>
          {
            errorMessage && (
              <div className={styles.toast}>
                <span>{`${errorMessage}!`}</span>
              </div>
            )
          }
          <button
            type="button"
            disabled={isDisabled}
            onClick={handleLoading}
          >
            {
              isLoading ? (
                <Lottie
                  options={{
                    loop: true,
                    animationData: loading,
                  }}
                  width={100}
                />
              ) : 'Entrar'
            }
          </button>
        </form>
        <span>
          Não possui conta?
          <a href="/signin">clique aqui!</a>
        </span>
      </section>
    </div>
  );
};

export default Landing;
