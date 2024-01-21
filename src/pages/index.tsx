import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '@/components/common/GlobalStyle'
import Introduction from '@/components/main/Introduction'
import Footer from '@/components/common/Footer'
import CategoryList from '@/components/main/CategoryList'
import PostList from '@/components/main/PostList'
import { graphql } from 'gatsby'
import type { PostListItemType } from '@/types/PostTypes'

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <PostList posts={edges} />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <Footer />
    </Container>
  )
}

export default IndexPage

export const getPostList = graphql`
  query MyQuery {
  allMarkdownRemark {
    edges {
      node {
	id
        frontmatter {
          title
          date
          summary
          categories
          thumbnail
        }
      }
    }
  }
}
`