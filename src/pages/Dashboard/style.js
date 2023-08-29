import styled from "styled-components";

export const DashboarDiv = styled.div`
  max-width: 100%;
  background: linear-gradient(135deg, #06064b, #4747d1);
  color: white;
  margin: 0;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  align-items: center;
  font-size: 1.2rem;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);


  .resetH1 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);



    display: inline-block;
    position: relative;

    &:before {
      content: url('/path/to/dashboard-icon.png');
      position: absolute;
      left: -40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;




export const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto; /* Isso centraliza o contêiner se ele for menor que a largura da viewport */
  padding: 20px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* Para telas maiores que 800px */
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;


export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%; 
  width: 90%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

