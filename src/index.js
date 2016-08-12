import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';



import PostArticle from './components/post_article'
//imports from actions/index.js file
import * as actions from 'actions'

//imports from actions/index.js file
import reducers from 'reducers'

class InnerCover extends Component {
	componentWillMount() {
		this.props.fetchArticles();
	}

	componentWillUpdate() {

	}

	componentDidUpdate() {
		this.alignArticle();
		window.addEventListener("resize",this.alignArticle.bind(this));
	}

	alignArticle() {
		const section = this.refs.section;				
		console.log("Align Article called");
		const articles = section.childNodes;

		const noOfArticles = articles.length;
		const sectionWidth = section.offsetWidth;
		var articleWidth = 0;
		var sectionHeight = 0;
		var tallestArticle = 0;

		console.log(noOfArticles);
		function getTop(i) {
			var getMatrixPosition = i - noOfColumn;
			if (getMatrixPosition >= 0) {
				console.log(getMatrixPosition);
				var article = articles[getMatrixPosition];
				console.log(parseInt(article.style.top) + article.offsetHeight);
				return parseInt(article.style.top) + article.offsetHeight;
			}
			return 0;
		}

		if (noOfArticles) {
			articleWidth = articles[0].offsetWidth;
		} else {
			return;
		}



		const noOfColumn = Math.floor(sectionWidth/articleWidth);
		let left = 0;
		let padding = 10;
		for (var i=0; i < noOfArticles; i++) {
			var top = getTop(i);
			articles[i].style.left = `${left}px`;
			articles[i].style.top = `${top+padding}px`;


			left += (articleWidth+padding);

			if (tallestArticle < (top + articles[i].offsetHeight)) {
				tallestArticle = top + articles[i].offsetHeight;
				sectionHeight = tallestArticle ;	
			}

			

			if ((i+1) % noOfColumn === 0) {
				left = 0;
				tallestArticle = 0;
			} 
		}
		console.log('sectionHeight' + sectionHeight);
		section.style.height = `${sectionHeight}px`
	}

	renderPostArticle() {
		return(
				this.props.articles.map((article)=>{
					return (<PostArticle data={article} key={article.id} />);

				})
			);
	}

	render() {
		return( 
			<section id="pinBoot" ref="section">
				{this.renderPostArticle()}
			</section>					
			);
	}
}

function mapStateToProps(state, action) {	
	return {
		articles:state
	};
}

//Connects the React component and Redux Reducer and Actions and returns a Component object
const ConnectedInnerCover = connect(mapStateToProps,actions)(InnerCover);

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
					<ConnectedInnerCover />
				</Provider>, document.getElementById('innerCover'));