import React from 'react'
import axios from 'axios'  // AJAX client

import Header from './header.js'

const { shape, string } = React.PropTypes

const Details = React.createClass({
  propTypes: {
    show: shape({
      title: string,
      description: string,
      year: string,
      poster: string,
      trailer: string,
      imdbID: string
    })
  },
  getInitialState () {
    return {
      omdbData: {}
    }
  },
  componentDidMount () {
    axios.get(`http://www.omdbapi.com/?i=${this.props.show.imdbID}`)
      .then((response) => {  // you need arrow function here for "this" to work, because we're not creating new context, otherwise we'd need to .bind(this)
        this.setState({omdbData: response.data})
      })
      .catch((error) => console.error('axios error', error))
  },
  render () {
    const { title, description, year, poster, trailer } = this.props.show
    let rating
    if (this.state.omdbData.imdbRating) {
      // if the API call has loaded
      rating = <h3>{this.state.omdbData.imdbRating}</h3>
    } else {
      rating = <img src='/public/img/loading.png' alt='loading indicaton' />
    }
    return (
      <div className='details'>
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
          <img src={`/public/img/posters/${poster}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0;showinfo=0`}
            frameBorder='0'
            allowFullScreen />
        </div>
      </div>
    )
  }
})

// stateless component, nice practice when applicable
// const Details = (props) => {
//   return <h1>{props.params.id}</h1>
// }

export default Details
