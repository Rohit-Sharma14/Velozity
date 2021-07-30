import React from 'react'
import './Home.css'
import M from 'materialize-css'
class Home extends React.Component {
  state = {
    data: null,
    newItem: '',
    value: 't'
  };
  //https://api.themoviedb.org/3/movie/550?api_key=e13216b1d38d24d95e463f26515ad387
  // eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTMyMTZiMWQzOGQyNGQ5NWU0NjNmMjY1MTVhZDM4NyIsInN1YiI6IjYxMDQxNTI1NjUxN2Q2MDA3ZWE1ZTdlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TQYmm2f4B-BVOnyIa9x7qlEbGHoYjemu9cJ3DqG641Q
  inputHandler = event => {
    this.setState({ newItem: event.target.value });
    setTimeout(() => this.fetch(), 2000)
  }
  fetch = () => {

    fetch(`http://www.omdbapi.com/?${this.state.value}=${this.state.newItem}&apikey=4c1bcb0a`).then(res => res.json())
      .then(data => {

        if (data.Response == 'True') {
          this.setState({ data: data })
          console.log(this.state.data);

        }
      })
  }

  like = (data) => {
    console.log(data);
    fetch('/add', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        like: data
      })
    }).then(res => res.json())
      .then(data => {
        M.toast({ html: 'success', classes: "#c62828 green darken-3" })
      })
  }
  render() {
    return (
      <div className='container'>

        <div className='input-container'>

          {/* <select id="lang" id="lang" onChange={(e) => {
            this.setState({ value: e.target.value }); console.log(this.state.value);
          }} value={this.state.value}>
            <option value="t">Select</option>
            <option value="t">Title</option>
            <option value="y">Year</option>
          </select> */}

          <input value={this.state.newItem} onChange={this.inputHandler} placeholder='add a new item...' />

          {/* setTimeout(() => { }, 2000) */}
        </div>
        <div id='list-container'>
          {this.state.data ?
            (
              <div class="card movie_card">
                <img src={this.state.data.Poster} class="card-img-top" alt="..." />
                <div class="card-body">
                  <i class="fas fa-heart play_button" onClick={() => { this.like(this.state.data) }} data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                  </i>
                  <h5 class="card-title" style={{ color: 'black' }}>{this.state.data.Title}</h5>
                  <span class="movie_info">{this.state.data.Released}</span>
                  <span class="movie_info float-right"><i class="fas fa-star"></i> {this.state.data.imdbRating}</span>
                </div>
              </div>
            )
            : (<div>
              <h1>Search any movie by title</h1>
            </div>)

          }

        </div>
      </div>
    );
  }
}

export default Home
