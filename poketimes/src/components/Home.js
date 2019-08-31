import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addChecks} from '../actions/addChecks'
import {updateForm} from '../actions/updateForm'

class Home extends Component {
  divClicked =(e)=>{
    console.log(e.target.value);
    if(e.target.name==="CountAdult" || e.target.name==="CountChildren"){
      this.props.updateForm(e.target.parentNode.id,e.target.name,parseInt(e.target.value));
    } 
    else
    this.props.addChecks(e.target.parentNode.id,e.target.value);
  }
  saveChanges=(e)=>{
    e.preventDefault();
    this.props.saveChanges();
  }
  render(){
    const { posts } = this.props
    const postList = posts.length ? (
      posts.map(post => {
        return (
              <form  className="col-2"disabled={!post.Checked} id={post.id}> 
              <p>{post.title}</p><span id={post.id}><input type="checkbox" value={post.Checked} name="test" checked={post.Checked} onClick={this.divClicked}/></span>

                {/* onChange={this.onValueChanges} */}
        <input type="text" disabled={!post.Checked} className="form-control" name="CountAdult" value={post.CountAdult} onChange={this.divClicked} >
            </input>
        <input type="text" disabled={!post.Checked} className="form-control" name="CountChildren" value={post.CountChildren} onChange={this.divClicked}>
            </input>
      </form>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div className="container">
        <div className="row">
          {postList}
        </div>
        <button type="submit" onClick={this.saveChanges}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addChecks: (id,checked) => dispatch(addChecks(id,checked)),
    updateForm:(id,name,value)=>dispatch(updateForm(id,name,value)),
    saveChanges:() =>dispatch({type:"SAVE_CHANGES"})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)