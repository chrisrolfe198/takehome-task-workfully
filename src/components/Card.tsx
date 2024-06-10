import { PropsWithChildren, Ref } from "react";
import { useDrag } from "react-dnd";
import { styled } from "styled-components";
import { Card as CardType } from "../domain/types";

const CardComponent = styled.div<{ isDragging: boolean }>`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  user-select: none;
  cursor: grab;
  padding: 0.5rem;
`;

export const Card = ({
  card,
  children,
}: PropsWithChildren<{ card: CardType }>) => {
  const { id, content } = card;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: card,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <CardComponent isDragging={isDragging} ref={drag}>
      {id}: {content}
    </CardComponent>
  );
};
