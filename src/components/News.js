import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6 ,
    category : "general",
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category :PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    // console.log("Hello I am a constructor from news component");
    this.state = {articles: [],
      loading : false,
      page:1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=939f3476036f4c88b16b6511fc3769d3&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({loading: false});
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    })

  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=939f3476036f4c88b16b6511fc3769d3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({loading: true});
    let parsedData = await data.json()
    this.setState({loading: false});
   
    this.setState({
      page : this.state.page - 1,
      articles: parsedData.articles,
    })
  }
  handleNextClick = async () =>{
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=939f3476036f4c88b16b6511fc3769d3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading: true});
          let data = await fetch(url);
          let parsedData = await data.json()
          this.setState({loading: false});
          this.setState({
            page : this.state.page + 1,
            articles: parsedData.articles,
          })    
        }
   }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: "35px 0px", marginTop:"90px"}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}   
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
           return (<div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl ={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt}/>
      </div>)
        })}      
      </div>
      <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
    )
  }
}

export default News
