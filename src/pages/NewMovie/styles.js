import styled from "styled-components";


export const Container = styled.div`
  display: grid;
  grid-template-rows: max-content auto;
  grid-template-areas: 
    "header" 
    "main";
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  height: 100vh;
  width: 100%;

  > main {
    grid-area: main;
    margin: 0 auto;
    padding: 1.5rem clamp(2rem, 5vw, 7.75rem);
    overflow-y: scroll;
    width: 100%;

    a p {
      display: flex;
      align-items: center;
      gap: .625rem;

      color: ${({ theme }) => theme.COLORS.ACCENT};
    }
  }
  
  > div:nth-child(1) {
    grid-area: header;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-rows: auto;
  grid-template-areas: 
  "h2 h2"
  "title rating"
  "textarea textarea"
  "tags tags"
  "cancel save";
  gap: 2.5rem;

  @media (max-width: 500px) {
    grid-template-areas:
    "h2 h2"
    "title title"
    "rating rating"
    "textarea textarea"
    "tags tags"
    "save save"
    "cancel cancel";

    gap: 1.25rem;
  }

  > h2 {
    grid-area: h2;
    margin-top: 2.5rem;
  }

  > div:nth-child(2) {
    grid-area: title;
  }

  > div:nth-child(1) {
    grid-area: rating;
  }

  > textarea {
    grid-area: textarea;
  }

  > button {
    grid-area: save;
  }

  > button#cancel-btn {
    grid-area: cancel;
    color: ${({ theme }) => theme.COLORS.ACCENT};
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
`;

export const Section = styled.section`
  grid-area: tags;
  > span {
    color: ${({ theme }) => theme.COLORS.TEXT_LIGHT_900};
    font-size: 1.25rem;
  }
  
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    border-radius: .625rem;
    margin-top: 1.5rem;
    padding: 1rem;
  }
`;