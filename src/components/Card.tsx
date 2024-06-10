import { PropsWithChildren, Ref } from "react";
import { useDrag } from "react-dnd";
import { styled } from "styled-components";
import { Card as CardType } from "../domain/types";
import { useCardReducer } from "../domain/useCardReducer";
import { canMoveCard } from "../domain/canMoveCard";

const CardComponent = styled.div<{ $canDrag: boolean; $isDragging: boolean }>`
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  user-select: none;
  cursor: ${({ $canDrag }) => ($canDrag ? "grab" : "inherit")};
  padding: 0.5rem;
`;

export const Card = ({ card }: PropsWithChildren<{ card: CardType }>) => {
  const { id, content } = card;
  const { state } = useCardReducer();
  const [{ isDragging, canDrag }, drag] = useDrag(() => ({
    type: "CARD",
    item: card,
    canDrag: () => canMoveCard(card, state),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
  }));

  return (
    <CardComponent $canDrag={canDrag} $isDragging={isDragging} ref={drag}>
      {id}: {content}
    </CardComponent>
  );
};
