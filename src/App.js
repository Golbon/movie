import React, { Component } from 'react';
import axios from 'axios';
import './App.css';




const Year = (props) => {
  return (
          <div>
            <div>Year:</div>
            <div>
              {props.year}
            </div>
          </div>
            )
}
const Director = (props) => {
  return (
          <div>
          <div>Director:</div>
          <div>{props.director}
          </div>
        </div>
  )
}
const Plot = (props) => {
  return (
          <div>
          <div>Plot:</div>
          <div>{props.plot}</div>
        </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      inputBox: '',
      Movie: null

    }
    this.InputBox = this.InputBox.bind(this)
    this.searchMovie = this.searchMovie.bind(this)

  }
  InputBox(event) {
    this.setState({inputBox: event.target.value})
  }
  searchMovie (event) {
    let movieName = this.state.inputBox;
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=448ed1ee").then( data => {
      this.setState({Movie: {year: data.data.Year, director: data.data.Director, plot: data.data.Plot}})
      }
    )
  }

render() {

  let outputMovie = null;

  if (this.state.Movie && this.state.Movie.year) {

    outputMovie = (

          <div>
            <Year year={this.state.Movie.year}/>
            <br />
            <Director director={this.state.Movie.director}/>
            <br />
            <Plot plot={this.state.Movie.plot}/>
          </div>
    )
  }



  return (
    <div>
      <div>Movie Data</div>
      <div>
        <div>
          <div>
            <div className="search">
              <span></span>
              <input onChange={this.InputBox} placeholder="Enter a movie"></input>
              <button onClick={this.searchMovie} >Submit</button>
            </div>
          </div>
          <br />
          <div>
            {outputMovie}
          </div>
        </div>
      </div>
    </div>
  )
}
}



export default App;
