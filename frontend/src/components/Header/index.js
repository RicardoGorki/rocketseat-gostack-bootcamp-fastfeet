import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';

import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="fastfeet" />
        <Menu>
          <aside>
            <Link to="/delivery">ENCOMENDAS</Link>
            <Link to="/delivery">ENTREGADORES</Link>
            <Link to="/delivery">DESTINATÁRIOS</Link>
            <Link to="/delivery">PROBLEMAS</Link>
          </aside>
        </Menu>
        <Profile>
          <span className="login">Admin Fastfeet</span>
          <span className="logout">sair do sistema</span>
        </Profile>
      </Content>
    </Container>
  );
}
