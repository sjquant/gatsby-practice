import React, { FunctionComponent, useMemo } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '@/components/common/GlobalStyle'
import Introduction from '@/components/main/Introduction'
import Footer from '@/components/common/Footer'
import CategoryList, { type CategoryListProps } from '@/components/main/CategoryList'
import PostList from '@/components/main/PostList'
import { graphql } from 'gatsby'
import type { PostListItemType } from '@/types/PostTypes'
import type { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { type ParsedQuery } from 'query-string'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData 
      }
    }
  }
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
    file: { 
      childImageSharp: { gatsbyImageData },
    },
  },
}) {
  const query: ParsedQuery = queryString.parse(search)
  const category: string = query.category as string || 'All'

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  )
  
  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      <PostList posts={edges} category={category} />
      <CategoryList selectedCategory={category} categoryList={categoryList} />
      <Footer />
    </Container>
  )
}

export default IndexPage


export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`