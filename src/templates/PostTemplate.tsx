import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import MainLayout from '@/components/common/MainLayout'
import PostHead from '@/components/post/PostHead'
import type { PostFrontmatterType } from '@/types/post'
import PostContent from '@/components/post/PostContent'

export type PostPageItemType = {
  node: {
    html: string
    frontmatter: PostFrontmatterType
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: { href: string }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0]

  return (
    <MainLayout title={title} description={summary} url={href} image={publicURL}>
      <PostHead title={title} date={date} categories={categories} thumbnail={gatsbyImageData} />
      <PostContent html={html} />
    </MainLayout>
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
              publicURL
            }
          }
        }
      }
    }
  }
`
