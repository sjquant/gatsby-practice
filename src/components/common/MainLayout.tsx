import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import GlobalStyle from '@/components/common/GlobalStyle'
import Footer from '@/components/common/Footer'
import styled from '@emotion/styled'


type MainLayoutProps = {
  children: React.ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const PostTemplate: FunctionComponent<MainLayoutProps> = function ({ children }) {

  return (<Container>
      <GlobalStyle />
      { children }
      <Footer />
    </Container>)
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`