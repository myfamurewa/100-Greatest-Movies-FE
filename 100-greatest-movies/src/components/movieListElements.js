import styled from "styled-components"


export const MovieList = styled.div`
  width: 100% ;
  height: 100% ;
  border: 10px solid goldenrod;
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  background-color: gray;
  background-size: 200%;  
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`


export const Movie = styled.div`
    height: 10%;
    width: 33%;
    border: black 1px;
    color: goldenrod;
    background-color: black;
    margin: 2%;
    padding: 3%;
    border-radius: 2.5%;
   
`
export const MovieChars = styled.ul`
    display: inline;
`



export const MovieChar = styled.li`
    display: inline;
    text-decoration: none;
    margin: .25%;
`

export const TitleCard = styled.h1`
  text-decoration: none;
  color: silver;
  margin: 2% 0;
`