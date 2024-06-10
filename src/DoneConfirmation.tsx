import { Modal } from "./components/Modal";
import { useCardReducer } from "./domain/useCardReducer";

export const DoneConfirmation = () => {
  const { state, moveCardToDone, resetMovingCardToDone } = useCardReducer();

  const { cardToMoveToDone } = state.options;

  if (cardToMoveToDone) {
    return (
      <Modal>
        <p>Are you sure you want to move this card to done?</p>
        <button onClick={() => moveCardToDone(cardToMoveToDone)}>
          Yes
        </button>{" "}
        <button onClick={() => resetMovingCardToDone()}>No</button>
      </Modal>
    );
  }

  return null;
};
