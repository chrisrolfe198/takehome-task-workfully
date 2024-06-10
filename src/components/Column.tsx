import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { Card, State } from "../domain/types";
import { useCardReducer } from "../domain/useCardReducer";
import { Overlay } from "./Overlay";

const StyledColumn = styled.div`
  display: block;
  width: 100%;
  position: relative;
  background: grey;
  padding: 1rem 0;
  margin: 0 1rem;
`;

export const Column = ({
  name,
  children,
}: PropsWithChildren<{ name: string }>) => {
  const { moveCard } = useCardReducer();
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "CARD",
    // TODO: tie this into the reducer validation so it's all done in one place
    canDrop: (card: Card) => card.state !== name,
    drop: (card: Card) => moveCard(card, name as State),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <StyledColumn ref={drop}>
      {name}:<div>{children}</div>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </StyledColumn>
  );
};
