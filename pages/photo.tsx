import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { withRouter, SingletonRouter } from 'next/router'
import axios from 'axios'

interface State {}

interface Props {
  router: SingletonRouter,
  href: string,
  photo: {
    id, title, url, thumbnailUrl: string
  }
}

class Photo extends React.Component<Props, State> {
    static async getInitialProps({ query }) {
        const url = `https://jsonplaceholder.typicode.com/photos?id=${query.id}`
        const resp = await axios.get(url)
        
        return {
            photo: resp.data[0]
        }
    }

    render() {
        return (
            <Layout>
                <h1>Photo: {this.props.photo.title}</h1>
                <img src={this.props.photo.url} alt={this.props.photo.title}/>
            </Layout>
        )
    }
}

export default withRouter(Photo)