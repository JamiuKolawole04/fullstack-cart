import styled from "styled-components";

export const Widget = () => {
  return <div>Widget</div>;
};

const StyledWidget = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 4px;
  font-size: 20px;
`;

const Text = styled.div`
  h3 {
    font-weight: 900;
  }
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Percentage = styled.div`
  margin-left: 0.5rem;
  font-size: 14px;
  color: ${({ isPositive }) =>
    isPositive ? "rgb(114, 244, 40)" : "rgb(255, 77, 73)"};
`;
