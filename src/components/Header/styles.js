import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
  margin-bottom: 1.5rem;
  padding: 1.5rem clamp(2rem, 5vw, 7.75rem);

  span {
    color: ${({ theme }) => theme.COLORS.ACCENT};
    font-size: ${({ theme }) => theme.FONTSIZE.LARGE};
    font-weight: 700;
  }

  @media (max-width: 768px) {
    display: grid;
    max-width: 400px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    'logo profile'
    'search search';

    gap: 1.5rem;

    > div:nth-of-type(1) {
      grid-area: search;

      max-width: 18.75rem;
    }

    > div:nth-of-type(2) {
      grid-area: profile;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: .7rem;

  min-width: 12.375rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: end;
    
    color: ${({ theme }) => theme.COLORS.WHITE};

    > a {
      color: ${({ theme }) => theme.COLORS.GRAY};
    }
  }

  img {
    border-radius: 50%;
    cursor: pointer;
    height: 4rem;
    width: 4rem;
  }
`;
