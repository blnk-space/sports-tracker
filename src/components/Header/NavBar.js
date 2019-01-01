import styled from 'styled-components';

export default styled.div`
  height: 60px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.general.secondaryBg};
  border-bottom-left-radius: ${props => props.theme.general.borderRadius};
  border-bottom-right-radius: ${props => props.theme.general.borderRadius};
  box-shadow: ${props => props.theme.shadows.lg};
`;
