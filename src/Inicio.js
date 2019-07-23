import React, { Component } from 'react';
import axios from 'axios';
import Imagem from './Imagem';
import Detalhes from './Detalhes';
import './Inicio.css';

class Inicio extends Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      ShowPopup: false,
      ShowImage: {},
      text: '',
      Username: '',
      Password: '',
      isauthenticated: false
		}
    this.Click = this.Click.bind(this);
    this.imageClose = this.imageClose.bind(this);
    this.searchBy = this.searchBy.bind(this);
    this.Change = this.Change.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.MyCommentSub = this.MyCommentSub.bind(this);
    this.PutLike= this.PutLike.bind(this);
  }
	
  async componentDidMount(){
    this.getPosts();
  }
  async searchBy(evt){
    evt.preventDefault()
    let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts?query=' + this.state.text);
		let postArray = response.data;
    this.setState({
      posts: postArray,
      text: ''
    });
	}
  async getPosts(){
    let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
    let postArray = response.data;
    this.setState({
      posts: postArray
    });
	}
  async Click(id){
    let srt = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id
    let response = await axios.get(srt);
		let obj = {
      idpost: id,
      image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/image",
      user: response.data.user.name,
      date: response.data.postedAt,
      subtitle: response.data.caption,
      likes: response.data.likes,
		};
		let commentsResponse = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id + '/comments')
		obj.comments = commentsResponse.data;
		this.setState({
			ShowImage: obj,
      ShowPopup: true
		});
  }
  imageClose(){
    this.setState({ShowPopup: false})
	}
  Change(evt){
    this.setState({[evt.target.name]: evt.target.value})
  }
  async login(evt){
    evt.preventDefault();
    let obj = {
      "userName": this.state.Username,
      "password": this.state.Password,
		}
    let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/login', obj, {
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(response.status === 200){
			this.setState({
        Username: '',
        Password: '',
        isauthenticated: true
			})
    }
		console.log(response);
	}
	async logout(evt){
    evt.preventDefault();
    let obj = {
      "userName": this.state.Username,
      "password": this.state.Password,
		}
    let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/logout', obj, {
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setState({isauthenticated : false })
  }
	
	async MyCommentSub(comment,idpost){
    let obj = {
      "postId" : idpost,
      "text" : comment
    };
		let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/comments',obj,{
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.Click(idpost);
	}
  async PutLike(idpost){
		let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/'+idpost+'/like',null,{
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/json"
			}
		});
    this.getPosts();
	}
	
  render(){
		return(
      <div className="Inicio">
			  {
          (this.state.isauthenticated) ?
					<form className="Inicio-Logout" onSubmit={this.logout}>
              <button className="btn-logout" type="submit" >Logout</button>
          </form> :
					<center>
            <form className="Inicio-Login" onSubmit={this.login}>
              <input type="text" name="Username" onChange={this.Change} value={this.state.Username} />
              <input type="password" name="Password" onChange={this.Change} value={this.state.Password} />
              <button type="submit">Login</button>
					  </form>
            <h2>Henrique Simões 20469 </h2>
					</center>
				}
				{
					this.state.posts.map(function(p){
						if(this.state.isauthenticated){
              return(
							  <div className="Inicio-show">
                  <form className="SearchBox" onSubmit={this.searchBy}>
                    <div className="BoxForSearch">
                        <input placeholder="Search..." name="text" onChange={this.Change} value={this.state.text} />
												<button type="submit">🔍</button>
                    </div>
									</form>
									<h3>{p.caption}</h3>
                  <Imagem id={p.id} Click={this.Click} />
									<h2>{"Utilizador: "}{p.user.name}</h2>
                  <h3>{"Data: "}{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h3>
                  <button onClick={()=>this.PutLike(p.id)}>{"Likes: " +p.likes}</button>
                </div>
							)
            };
					}.bind(this))
				}
        {
          (this.state.isauthenticated) &&
          this.state.ShowPopup && 
					<Detalhes image={this.state.ShowImage.image}
            user={this.state.ShowImage.user}
            date={this.state.ShowImage.date}
            subtitle={this.state.ShowImage.subtitle}
            likes={this.state.ShowImage.likes}
            comments={this.state.ShowImage.comments}
            imageClose={this.imageClose}
            MyCommentSub={this.MyCommentSub}
            idpost ={this.state.ShowImage.idpost}
          />
        }
			</div>
		);
  }
}
export default Inicio;