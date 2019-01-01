import styled from 'styled-components';

export default styled.div`
  padding: 4px 8px;
  margin: 0 auto
  max-width: 300px;
  position: absolute;
  width: 100%;
  left: 50%!important;
  transform: translateX(-50%);

  @media screen and (min-width: 800px) {
    max-width: 640px;
  }

  .content {
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: ${props => props.theme.shadows.md};
    border-radius: 4px;
    
    .indicator {
      width: 3em;
      height: 5.5rem;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      background: ${props => (props.disconnected ? props.theme.colors.red : props.theme.colors.green)};


      @media screen and (min-width: 800px) {
        width: 5.5em;
        height: 5rem;
      }
    }

    .data {
      flex-grow: 1;
      padding: 0.8rem 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 1.2rem;
      line-height: 1.4rem;
      flex-direction: column;

      @media screen and (min-width: 800px) {
        flex-direction: row;
      }

      .connectionInfo {
        margin-bottom: 4px;
      }

      .time {
        display: flex;
        align-items: center;
        font-size: 1rem;
        line-height: 1.4rem;
      }
    }
  }
`;
