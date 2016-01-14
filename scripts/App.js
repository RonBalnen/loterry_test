import React, {Component} from 'react';
import Slider from 'react-slick';
import ReactPaginate from 'react-paginate';
import data from "./data.json";
import '../styles/style.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("lotteryData")) {
      localStorage.setItem("lotteryData", JSON.stringify(data));
    }
    this.data = JSON.parse(localStorage.getItem("lotteryData"));
    this.state = {
      data: this.data.slice(10,49),
      offset: 10,
      limit: 40
    };

  }

  loadsLottery() {
    const { offset, limit } = this.state;
    this.setState({data: this.data.slice(offset, offset+limit), pageNum: Math.ceil(this.data.length / limit)});
  }

  handlePageClick = (data) =>  {
    console.log("handle", data);
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);

    this.setState({offset: offset}, () => {
      this.loadsLottery();
    });
  };

  render() {
    const {data} = this.state;
    console.log("state", this.state);
    const sliderData = this.data.slice(0, 9).map(item => (<div><h3>Winning number: {item.winning_numbers}</h3></div>));
    console.log(sliderData);
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="container">
        <div className="slider-container">
          <Slider {...settings}>
            {sliderData}
          </Slider>
        </div>
        <div className="react-paginate">
          <ReactPaginate  previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={<li className="break"><a href="">...</a></li>}
                          pageNum={this.state.pageNum}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          clickCallback={this.handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"} />
        </div>
        {data.map(i => (
          <div className="list">
            <p>Draw date: {i.draw_date}</p><p>Winning number: {i.winning_numbers}</p>
            <hr />
          </div>
        ))}
        <div className="react-paginate">
          <ReactPaginate  previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      </div>

    );
  }
}

