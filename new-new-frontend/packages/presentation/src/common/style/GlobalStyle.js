import {createGlobalStyle} from 'styled-components';
import variables from './variables';


const GlobalStyle = createGlobalStyle`
  ${variables};  
  
  html {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--light-bg);
  }
  
  #root {
    min-height: 90vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }
  
  .main {
    margin: 0 auto;
    width: 100%;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
