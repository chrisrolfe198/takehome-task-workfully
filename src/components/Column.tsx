import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledColumn = styled.div`
  display: block;
  width: 100%;
`;

export const Column = ({
  name,
  children,
}: PropsWithChildren<{ name: string }>) => {
  return (
    <StyledColumn>
      {name}:<div>{children}</div>
    </StyledColumn>
  );
};
