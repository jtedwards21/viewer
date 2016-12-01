import React from "react";
import axios from "axios";

export default class Viewer extends React.Component {
  constructor() {
    super();

    this.state = {
      articleText : ""
    };
  }
  processData(){
    
  }
  getData(){
    axios({
	method: 'post',
	url: 'https://en.wikipedia.org/w/api.php',
        data: {
	  action: "query",
          list: "random",
          rnlimit: "5",
          format: "json"
        }

     })
    .then(data => {this.processData(data)});
  }
  componentDidRender() {
    getData(); //?
  }
  render() {
    //These plastic pieces will have gradients to make them seem more real
    return (
    <div>
      <div className="plastic"></div>
      <div className="outerPlastic"></div>
      <div className="innerPlastic">
        <div className="inner-container">
	  <div className="brandName">Wikipedia Viewer</div>
	  <div className="screen"></div>
 	</div>
        <div className="bottomBlocks">
	    <div className="controls">
	      <div className="leftButton"></div>
	      <div className="centerButton"></div>
	      <div className="rightButton"></div>
	    </div>
	</div>
      </div>
    </div>
    );
  }
}
