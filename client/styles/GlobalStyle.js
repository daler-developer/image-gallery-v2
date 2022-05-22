import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  body {
    font-size: 16;
    color: black;
    font-family: "Poppins";
    background-color: #fafafa;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  input {
    outline: none;
    border: none;
    background-color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    white-space: nowrap;
  }

  img {
    object-fit: cover;
    object-position: center;
  }
`

export default GlobalStyle
