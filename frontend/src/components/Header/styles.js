import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
`;

export const Content = styled.div`
  max-width: 1440px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  img {
    width: 135px;
    height: 26px;
    margin-left: 20px;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: left;
  margin-right: auto;

  a {
    margin-right: 10px;
    color: #999999;
    font-weight: bold;
    color: #999999;

    :focus {
      color: #444444;
    }
  }
`;

export const Link = styled.div`
  margin-right: 10px;
`;

export const Profile = styled.div`
  display: flex;
  margin-right: 0 auto;
  flex-direction: column;

  span.login {
    font-weight: bold;
    color: #666666;
    margin-bottom: 5px;
  }

  span.logout {
    color: #de3b3b;
    margin: auto;
  }
`;
