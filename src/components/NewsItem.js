import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
            <img src={!imageUrl?"https://media.istockphoto.com/id/1438235060/photo/global-communication.jpg?s=612x612&w=is&k=20&c=rEmIIM8GtXSKOyTlDdrajvXyTX3P8DEPmQVxxoONW3M=":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
            
      </div>
    )
  }
}

export default NewsItem
