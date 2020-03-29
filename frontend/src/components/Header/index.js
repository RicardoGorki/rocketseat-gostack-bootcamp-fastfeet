import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';

import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="fastfeet" />
        </nav>
        <aside>
          <Menu />
        </aside>
        <aside>
          <Profile />
        </aside>
      </Content>
    </Container>
  );
}
