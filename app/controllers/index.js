
var Viewer = React.createClass({
  getInitialState() {
    return {
      search: "",
      pages: []
    };
  },
　　processData(data){
    var p = [];
    var pages = data.data.query.pages;
    var keys = Object.keys(pages);
    for(var i = 0; i < keys.length; i++){
	p.push(pages[keys[i]]);
    }
    pages = p;
    pages = pages.map(function(p){
	var page = {};
	page.title = p.title;
	page.description = p.extract;
	page.index = p.index;
        return page;
    });

    this.setState({pages:pages});
  },
  search() {
    var url = "/pages/" + this.state.search;
    axios.get(url)
    .then(data => {this.processData(data)});
  },
  handleChange(e){
    this.setState({search: e.target.value})
  },
  render() {
    console.log(this.state.pages);
　　　　var pages = this.state.pages;
    pages.sort(function(r){
	return r.index;
    });
    pages = pages.map(function(p){
	return <Page key={p.index} title={p.title} description={p.description}/>
    })
    
    
    //These plastic pieces will have gradients to make them seem more real
    return (
    <div className="row">
      <div id="search" className="input-group col-md-6 col-md-offset-3">
		    <input type="text" id="search-bar" onChange={this.handleChange} value={this.state.search} className="form-control" aria-describedby="basic-addon1"  placeholder="Search For a Term..." />
		    <span id="orange-button" className="input-group-addon" onClick={this.search} id="basic-addon1">Go</span>
      </div>
      <div id="page-container" className="col-md-12">
	{pages}
      </div>
    </div>
    );
  }
});

var Page = React.createClass({
  getInitialState(){
    return {}
  },
  render(){return(
    <div className="page-box col-md-6">
      <h3　className="col-md-4">{this.props.title}:</h3>
      <p className="col-md-8">{this.props.description}</p>
    </div>)
  }
});

ReactDOM.render(
  <Viewer  />,
  document.getElementById('content')
)
