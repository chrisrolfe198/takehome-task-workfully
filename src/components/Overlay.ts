import styled from "styled-components";

export const Overlay = styled.div<{ color: string }>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ color }) => color};
  opacity: 0.5;
  padding: 5px;
  border: dashed white 5px;
  box-sizing: border-box;
`;
