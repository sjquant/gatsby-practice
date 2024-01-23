import React, { FunctionComponent, useMemo, MutableRefObject, useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'

import type { PostListItemType } from '@/types/post'

type PostListProps = {
  category: string
  posts: PostListItemType[]
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }

`

const PostList: FunctionComponent<PostListProps> = function ({ category, posts }) {

  const  { postList, containerRef } = useInfinitePosts(category, posts)

  return <PostListWrapper ref={containerRef}>
    {postList.map(
        ({
          node: { id, frontmatter },
        }: PostListItemType) => (
          <PostItem
            {...frontmatter}
            link="https://www.google.co.kr/"
            key={id}
          />
        ),
      )}
  </PostListWrapper>
}

export default PostList


const NUMBER_OF_ITEMS_PER_PAGE = 10

// 강의를 따라하는 거지만, 실제 Query를 동적으로 호출하지 않는다면 큰 효용은 없을 것 같음
function useInfinitePosts(category: string, posts: PostListItemType[]) {
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
    null,
  )
  const [page, setPage] = useState<number>(1)

  const postListByCategory = useMemo<PostListItemType[]>(
    () =>
      posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
        category !== 'All'
          ? categories.includes(category)
          : true,
      ),
    [category],
  )

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setPage(value => value + 1);
      observer.disconnect();
    },
  )

  useEffect(() => setPage(1), [category])

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * page >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    )
  }, [page, category])

  return {
    containerRef,
    postList: postListByCategory.slice(0, page * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

