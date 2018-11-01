import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { withRouter, SingletonRouter } from 'next/router'
import axios from 'axios'

interface State {
  photoId: string
}

interface Props {
  router: SingletonRouter,
  href: string,
  photos: {
    id, title, url, thumbnailUrl: string
  }[]
}

class Index extends React.Component<Props, State> {
  state: Readonly<State> = {
    photoId: this.props.router.query.id as string
  }

  static async getInitialProps() {
    console.log('getInitialProps')
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=10"
    const resp = await axios.get(url)
    return { photos: resp.data }
  }

  render() {
    const { photoId } = this.props.router.query
    let photo
    if (photoId) {
      photo = this.props.photos.find(p => p.id === Number(photoId))
    }

    return (
      <Layout>
        {photo ? (
          <section>
            <h1>Photo: {photoId}</h1>
            <img src={photo.url} alt={photo.title} />
          </section>
        ) : null}
        <h1>Photos</h1>
        <ul>
          {this.props.photos.map(p => (
            <li key={p.id}>
              <Link href={`/?photoId=${p.id}`} as={`/photo?id=${p.id}`}>
                <a>
                  <img src={p.thumbnailUrl} alt={p.title} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default withRouter(Index)