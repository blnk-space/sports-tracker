import { injectGlobal } from 'styled-components';

export default injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 14px;
    @media (min-width: 1000px) {
      font-size: 15px;
    }
    @media (min-width: 1400px) {
      font-size: 16px;
    }
    @media (min-width: 1600px) {
      font-size: 18px;
    }
    @media (min-width: 2000px) {
      font-size: 20px;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
    margin: 0;
  }
`;
