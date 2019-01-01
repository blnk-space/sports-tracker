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

    .number {
      width: 3em;
      height: 5.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: monospace;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: ${props => (props.isRunning ? props.theme.colors.cream : props.theme.colors.red)};
      background: ${props => (props.isRunning ? props.theme.colors.black : props.theme.colors.green)};


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

      .personInfo {
        &.loading {
          margin-top: -1rem;
          display: block;
          height: 1.2rem;
          background: ${props => props.theme.colors.loading};
          width: 65%;
          span {
            margin-top: 1.5rem;
            height: 1rem;
            display: block;
            width: 40%;
            background: ${props => props.theme.colors.loading};
          }
        }
        span {
          display: block;
          font-size: 0.8rem;
        }
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

  .loader-bar{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.99;
  }
  .loader-bar .bar{
    position: absolute;
    bottom: 0;
    width: 2.5rem;
    height: 2.5px;
    background: ${props => props.theme.colors.green};
    animation: loader-small 2.25s ease infinite;
    border-radius: 3px;
    transform-origin: 50% 50%;

    @media screen and (min-width: 800px) {
      animation: loader-large 2.25s ease infinite;
    }
  }
  @keyframes loader-small {
    0%  {
      transform: translateX(0);
    }
    50% {
      transform: translateX(280px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes loader-large {
    0%  {
      transform: translateX(0);
    }
    50% {
      transform: translateX(600px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
