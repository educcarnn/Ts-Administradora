import styled from "styled-components";

export const SidebarContainer = styled.div`
  background-color: #06064b;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SidebarItem = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
`;

export const SidebarInfo = styled.div`
  background-color: #06064b;
  color: white;
  width: 100%;
  height: 15vh;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
