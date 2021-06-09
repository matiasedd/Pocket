import React from 'react';
import { MdAdd, MdDashboard } from 'react-icons/md';

import style from '../styles/components/Sidebar.module.scss';
import logo from '../assets/icons/logo.svg';

const Dashboard: React.FC = () => (
  <div className={style.sidebarContainer}>
    <header>
      <img src={logo} alt="Pocket" />
      <nav>
        <ul>
          <li>
            <button type="button" title="Adicionar transação">
              <MdAdd color="#fbc02d" size={32} />
            </button>
          </li>
          <li>
            <a href="/" title="Ir para Home">
              <MdDashboard size={32} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
);

export default Dashboard;
