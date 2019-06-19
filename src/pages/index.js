import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulArticle.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          console.error('Emeric::index::render::node =>', node)

          const title = node.title
          return (
            <div
              key={node.slug}
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }}
                      to={node.slug}

                >
                  {title}
                </Link>
              </h3>
              <small>{node.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.childContentfulArticleContentRichTextNode.childContentfulRichText.html,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle {
      edges {
        node {
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
    }
  }
`
