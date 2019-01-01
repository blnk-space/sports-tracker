import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h3 {
    text-align: center;
    font-weight: 200;
    margin-bottom: 0;
    color: ${props => props.theme.colors.gray};
  }
  
`;
