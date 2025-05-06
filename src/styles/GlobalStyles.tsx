import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: var(--font-satoshi);
  }
  
  body {
    font-family: var(--font-satoshi);
    background-color: #F8F9FA;
  }
  
  button {
    font-family: var(--font-satoshi);
  }
`;

export default GlobalStyles; 