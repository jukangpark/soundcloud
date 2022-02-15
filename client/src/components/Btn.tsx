import styled from "styled-components";

export const Btn = styled.button`
  display: block;
  padding: 0;
  border: none;
  width: 210px;
  height: 50px;
  line-height: 50px;
  background-color: #f50;
  border-color: #f50;
  text-align: center;
  position: relative;
  margin-top: 30px;
  border-radius: 3px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  a {
    font-size: 18px;
    line-height: 50px;
    padding-top: 0;
    padding-bottom: 0;
    text-shadow: none;
    background-color: #f50;
    border-color: #f50;
    color: #fff;
  }
`;
