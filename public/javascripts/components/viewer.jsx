import React from "react";
import axios from "axios";
import JQuery from "jquery";

export default class Viewer extends React.Component {
  constructor() {
    super();

    this.state = {
      articleText : ""
    };
    
    this.getData.bind(this);
    this.processData.bind(this);
  }
  processData(data){
    var pages = data.data.query.pages;
    var keys = Object.keys(pages);
    var untreatedHtml = pages[keys[0]].revisions['0']['*'];
    var text = untreatedHtml;
    text = this.rB(text);
    text = this.processCitations(text);
    this.setState({articleText: text});
    JQuery(".wiki-text").html(text);
  }
  getData(title){
    var url = "/pages/" + title;
    axios(url)
    .then(data => {this.processData(data)});
  }
  componentDidMount() {
    this.getData("cat"); 
  }
  rB(text) {
  var r = text.split('[[');
  var r = r.join('<span class="ln">');
  var r = r.split(']]');
  var r = r.join('</span>');
  return r;
  }
  processCitations(text) {
  var html = text.split('{{');
  html = html.join('<span class="cite">');
  html = html.split('}}');
  html = html.join('</span>');
  return html;
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
	  <div className="screen">
	    <div className="wiki-page">
		<div className="wiki-title"></div>
		<img className="wiki-img" />
		<div className="wiki-text"></div>
	    </div>
	  </div>
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
