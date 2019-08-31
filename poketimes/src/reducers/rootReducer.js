if (localStorage.getItem("data")===null){
  localStorage.setItem("data",JSON.stringify({
    posts: [
      {id: '1', title: 'Room1','CountAdult':1,'CountChildren':0,'Checked':true},
      {id: '2', title: 'Room2','CountAdult':1,'CountChildren':0,'Checked':false },
      {id: '3', title: 'Room3','CountAdult':1,'CountChildren':0,'Checked':false},
      {id: '4', title: 'Room4','CountAdult':1,'CountChildren':0,'Checked':false}
    
    ]
  })
  );
}
const initState =JSON.parse(localStorage.getItem("data"));


const rootReducer = (state = initState, action) => {
  console.log(action);
  if(action.type === 'DELETE_POST'){
   let newPosts = state.posts.filter(post => {
     return post.id !== action.id
   });
   return {
     ...state,
     posts: newPosts
   }
  }
  else if(action.type==="ADD_CHECKS"){
    console.log(action);
    if(action.checked==="true"){
      let updatePost=state.posts.filter(post => {
        return post.id >= action.id
      })
      updatePost.map((post,i)=>{
        if(i!=0)
        post.Checked=false;
      });
      let keepPost=state.posts.filter(post => {
        return post.id < action.id
      })
      return{
        posts:[...keepPost,...updatePost]
      }
    }
    else{
    let updatePost=state.posts.filter(post => {
      return post.id <= action.id
    })
    updatePost.map((post,i)=>{
      if(i!=0)
      post.Checked=(action.checked==="false")?true:false;
    });
    let keepPost=state.posts.filter(post => {
      return post.id > action.id
    })
    return{
      posts:[...updatePost,...keepPost]
    }
  }
  }
  else if(action.type==="UPDATE_FORM"){
    console.log(action);
    let updatedState= state.posts.map((post)=>
    {
      if(post.id === action.id){
      return {...post,[action.name]:action.value}
      }
      else
      return post
    })
  return{
    posts:[...updatedState]
  }
  }
  else if(action.type==="SAVE_CHANGES"){
    localStorage.setItem("data",JSON.stringify(state));
    return state
  }
  else
  return state;
}

export default rootReducer