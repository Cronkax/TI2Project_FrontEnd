import React, { Component } from 'react';
import axios from 'axios';
import './Imagem.css';

class Imagem extends Component{
	
  constructor(props){
    super(props);
    this.Click = this.Click.bind(this);
  }
	
  Click(){
    this.props.Click(this.props.id);
  }
	
	render(){
		return(
      <div className="imagem">
        <img 
				  src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.id + '/image'}
					onClick={this.Click}
				/>
      </div>
    );
  }
}
export default Imagem;