import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import GlobalStyle from '@/components/common/GlobalStyle'
import Footer from '@/components/common/Footer'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

type MainLayoutProps = {
  title: string
  description: string
  url: string
  image: string
  children: React.ReactNode
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const PostTemplate: FunctionComponent<MainLayoutProps> = function ({
  title,
  description,
  url,
  image,
  children,
}) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@solaqua" />
        <meta name="twitter:creator" content="@solaqua" />
        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  )
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
