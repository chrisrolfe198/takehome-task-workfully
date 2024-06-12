import { useState } from "react";
import { useCardReducer } from "./domain/useCardReducer";
import { Modal } from "./components/Modal";
import { ButtonContainer } from "./components/ButtonContainer";

// This component is very simplistic, it's here to make testing easier
// I'd improve this with proper form validation/error handling etc
export const AddCard = ({ cancel }: { cancel: () => void }) => {
  const { addCard } = useCardReducer();
  const [state, setState] = useState("");

  return (
    <Modal>
      <label htmlFor="card">Card </label>
      <input
        value={state}
        name="card"
        id="card"
        autoFocus
        onChange={(e) => setState(e.target.value)}
      />
      <ButtonContainer>
        <button
          onClick={() => {
            if (state.length) {
              addCard(state);
              cancel();
            }
          }}
        >
          Add
        </button>
        <button onClick={cancel}>Cancel</button>
      </ButtonContainer>
    </Modal>
  );
};
