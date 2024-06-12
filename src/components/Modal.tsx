import { PropsWithChildren } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: absolute;
  background: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  margin: 0;
`;

const ModalContent = styled.div`
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 50%;
  padding: 1rem;
`;

export const Modal = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ModalBackground />
      <ModalContent>{children}</ModalContent>
    </>
  );
};
