import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  height: 425px;
  text-align: center;
  padding: 30px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000033;
  border-radius: 4px;

  img {
    width: 181px;
    height: 33px;
    margin-top: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      width: 300px;
      height: 45px;
      font-size: 16px;
      line-height: 19px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #dddddd;
      border-radius: 4px;
      color: #999999;
      padding: 0 15px;
      margin: 0 0 10px;

      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }
    }
    button {
      width: 300px;
      height: 45px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 5px;
      color: #ffffff;
      background: #7d40e7 0% 0% no-repeat padding-box;
      border: 0;
      border-radius: 4px;
      transition: 0.5s;

      &:hover {
        background: ${darken(0.04, '#7d40e7')};
      }
    }

    span {
      align-self: flex-start;
      font-weight: bold;
      font-size: 14px;
      color: #444444;
      margin: 0 0 10px;
    }
  }
`;
