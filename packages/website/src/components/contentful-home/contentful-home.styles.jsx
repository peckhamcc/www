import styled from 'styled-components'

export const PageWrapper = styled.div`
padding-top: 67px;
background-color: white;

font-size: 16px;
`
export const Hero = styled.div`
padding: 70px 0;
background-image: url(${props => props.background});
background-size: cover;
background-position: center center;
background-color: #000;
font-size: 35px;
text-align: center;
position: relative;
h1{
  background-color: rgba(0,0,0,.5);
  padding: 0.3rem 2.5rem;
  font-size: 2rem;
  color: white;
  display: inline-block;
  border-radius: 6px;
  margin: 20px;
}
svg{
  width: 500px;
}
&:after{
  content: '';
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(transparent, black);
}

@media (max-width: 640px) {
  padding: 40px 0;
    h1{
      font-size: 1.5rem;
    }
    svg{
      width: 70vw;
    }
  }
`
export const Breadcrumb = styled.div`
    background-color: #f9f9fa;
    padding: 30px 20px;
    border-bottom: solid 1px #ddd;
    .content{
      max-width: 750px;
      margin: 0 auto;
    }
    a, span{
      color: #9da0b6;
    }
`

export const BlogSection = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 640px) {
    padding: 20px 20px;
  }
`

export const Blogs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Blog = styled.div`
  border: 1px #dcdcdc; solid;
  border-radius: 6px; 
  h2{
    font-size: 18px;
  }
  .text{
    padding: 5px;
    p{
      color: #9c9c9c;
      font-size:12px;
    }
  }
  .button{
    background-color: #2e6dcb;
    border: none;
    color: white;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 6px;

    &:hover{
      background-color: #2459a8;
    }
  }
`

export const BlogImage = styled.div`
background-color: #dcdcdc;
height: 150px;
background-image: url(${props => props.background});
background-size: cover;
background-position: center center;
background-color: #dcdcdc;
border-radius: 5px;
`
export const TextStrip = styled.div`
.text{
  max-width: 750px;
  margin: 0 auto;
  color: #fff;
  font-size: 30px;
  line-height: 1.5;
}
  background-color: #000;
  padding: 50px 0;

  @media (max-width: 640px) {
    padding: 40px 20px;
    .text{
      font-size: 24px;
    }
  }
`

export const BlogTitle = styled.div`
  display: flex;
  align-items: center;
  & > * {
   flex: 1; 
  }
  .column-right{
    text-align: right;
  }
`
