import React, { Component } from 'react';
import SearchBar from "./search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./video_list"
import VideoDetail from "./video_detail";
import _ from "lodash";
import '../style/style.css';


const API_KEY = "AIzaSyBy8s85VocirJP2Aw2VBa9qbuKUwG3Qn0c";

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch("cheese");
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
    const style = {
      marginLeft: '1em',
      marginBottom: '3em',
      marginTop: '.5em'
    }

		return (
			<div>
				<h4 className="brand" style={style}>React YouTuber</h4>
				<SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />


			</div>
		);
	}
}
export default App;
