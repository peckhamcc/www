import styled from 'styled-components'

export const PageWrapper = styled.div`
padding-top: ${(props) => props.isHomePage ? '0px' : '67px'};
background-color: white;
font-size: 16px;
`

export const Hero = styled.div`
padding: 120px 0;
background-image: url(${props => props.background});
background-size: cover;
background-position: center center;
background-color: #dcdcdc;
font-size: 35px;
text-align: center;
h1{
  background-color: rgba(0,0,0,.5);
  padding: 0.3rem 2.5rem;
  font-size: 2rem;
  color: white;
  display: inline-block;
  border-radius: 6px;
  margin: 20px;
}

@media (max-width: 640px) {
  padding: 80px 0;
    h1{
      font-size: 1.5rem;
    }
  }
`

export const Article = styled.div`
 max-width: 750px;
 margin: 0 auto;
 padding: 40px 0;

 line-height: 1.6;
 a{
  color: #2e6dcb;
 }

 hr{
  border: solid 1px #f1f1f1;
  margin: 30px 0;
 }

 @media (max-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`
