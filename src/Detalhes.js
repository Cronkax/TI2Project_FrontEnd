import React, { Component } from 'react';
import './Detalhes.css'

class Detalhes extends Component{
	
  constructor(props){
    super(props);
    this.state = {NewComment : ''}
    this.imageClose = this.imageClose.bind(this);
    this.MyCommentSub = this.MyCommentSub.bind(this);
    this.MyComment = this.MyComment.bind(this);
  }
	
	imageClose(){
    this.props.imageClose();
	}
	
	// criar um novo comentário
	MyComment(evt){
    this.setState({NewComment: evt.target.value});
	}
	
	MyCommentSub(evt){
    evt.preventDefault();
    this.props.MyCommentSub(this.state.NewComment,this.props.idpost);
    this.setState({NewComment: ''})
	}
	
	render(){
    return(
      <div className="Image">
				<img src={this.props.image} />
				<h1> {"Nome: "}{this.props.subtitle}</h1>
				<h2>{"Utilizador: "} {this.props.user}</h2>
				<h2>{"Data: "} {this.props.date.substring(0, this.props.date.indexOf("T"))}</h2>
				<h2>{"Likes: "} {this.props.likes}</h2>
				<h2>{"Comentários: "}</h2>
				{
					this.props.comments.map(
					function(c){
						return([
								<table width="280" cellspacing="1" cellpadding="1" border="1" bgcolor="white">
									<td>
									  <h4>{c.text}</h4>
									  <h4>{c.user.name}</h4>
									  <h4>{c.postedAt.substring(0, this.props.date.indexOf("T"))}</h4>
									</td>
								</table>
						]);
					}.bind(this))
				}
				<form onSubmit={this.MyCommentSub}> 
					<input className="comment" type="text" value={this.state.NewComment} onChange={this.MyComment} placeholder="Novo Comentário"/>
				</form>
				<button onClick={this.imageClose}>Fechar Imagem</button>
		  </div>
		);
  }
}
export default Detalhes;