import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulArticle
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    
    console.error('Emeric::blog-post::render::this.props.pageContext =>', this.props.pageContext)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.content}
        />
        <h1>{post.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
{/*
          {post.frontmatter.date}
*/}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.childContentfulArticleContentRichTextNode.childContentfulRichText.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ContentFulArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulArticle(slug: {eq: $slug}) {
      author
      title
      childContentfulArticleContentRichTextNode {
        childContentfulRichText {
          html
        }
      }
      slug
      image {
        fluid {
          src
        }
      }
    }
  }
`
