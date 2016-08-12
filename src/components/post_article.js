import React from 'react';
import {connect} from 'react-redux'
import * as actions from 'actions'
class PostArticle extends React.Component {
	
	renderArticle() {
		return this.props.articles.map((article)=>{
				console.log(article);
				return (<article className="white-panel"><img src={article.img} alt=""/>
			        		<h4><a href="#">{article.title}</a></h4>
			        		<p>{article.body}</p>
			      		</article>);

			  });

	}

	render() {
		return(
			<article className="white-panel"><img src={this.props.data.img} alt="" ref={`article_${this.props.data.id}`}/>
			        		<h4><a href="#">{this.props.data.title}</a></h4>
			        		<p>{this.props.data.body}</p>
			      		</article>		
			);	
			
	}
}

function mapStateToProps(state, action) {	
	return {
		articles:state
	};
}
export default connect(mapStateToProps,actions)(PostArticle);