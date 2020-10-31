import styled from "styled-components"


export const MovieList = styled.div`
  width: 100% ;
  height: 100% ;
/*   border: 10px solid goldenrod; */
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  background-size: 200%;  
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`


export const Movie = styled.div`
    height: 10%;
    width: 10%;
    border: black 1px;
`
export const MovieChars = styled.ul`
    display: inline;
`



export const MovieChar = styled.li`
    display: inline;
    text-decoration: none;
`