import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list"
import VideoDetail from "./components/video_detail";
import _ from "lodash";

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

		return (
			<div>
				<h1>React Youtuber</h1>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(
  <App />
  ,document.getElementById('root'));
registerServiceWorker();
