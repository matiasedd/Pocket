import React from "react";
import styles from "../styles/pages/Landing.module.scss";
import extendedLogo from "../assets/icons/extended-logo.svg";
import landingImage from "../assets/images/landing-image.svg";

const Landing: React.FC = () => (
  <div className={styles.landingContainer}>
    <div>
      <img src={extendedLogo} alt="Logo do Pocket" />
      <div>
        <img src={landingImage} alt="Imagem de fundo" />
        <div>
          <h1>Planejamento Financeiro sem complicações.</h1>
          <p>
            Com Pocket, seu planejamento financeiro fica muito mais fácil. Deixe
            as planihas de lado e planeja-se com Pocket!
          </p>
          <a href="/">Entrar</a>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
