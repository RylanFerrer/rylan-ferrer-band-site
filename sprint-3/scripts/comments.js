//array of random avatar arrays
const avatars = ["./assets/images/avatars/avatar-1.png","./assets/images/avatars/avatar-2.png","./assets/images/avatars/avatar-3.png",
"./assets/images/avatars/avatar-3.png", "./assets/images/avatars/avatar-4.png","./assets/images/avatars/avatar-5.png","./assets/images/avatars/avatar-6.png",
"./assets/images/avatars/avatar-7.png","./assets/images/avatars/avatar-8.png","./assets/images/avatars/avatar-9.png"];

   const commentsGetURL = axios.get(`${url}comments${api_key}`);
   const commentsURL = (`${url}comments${api_key}`);
   commentsGetURL.then(result => {
    fillCommentSection(result.data);
    addDeleteEvent(result.data);
   });

   //constant variables 
   const commentSection = document.getElementById("comments-display");
   const form = document.getElementById("form-section");
   let deleteBtn = document.getElementsByClassName("deleteBtn");
   
  
   //comment section initialization
   //fillCommentSection(comments);   

   function makeNewAvatar(avatars)
   {
     let random = Math.floor(Math.random() * avatars.length);
      return avatars[random];
   }
   
    
   

   form.addEventListener("submit", submitEvent => {
   axios.post(commentsURL,{
    name:submitEvent.target.firstName.value,
    comment:submitEvent.target.comment.value
    }).then(response => {
      addCommentInfo(commentSection,response.data);
      addOneDeleteEvent(response.data);
      submitEvent.target.reset();
    });

    event.preventDefault();
  });
  
   function clearComments(section)
   {
      //get all the elements with the class of comment-box
      let div = section.getElementsByClassName('comment-box');
      console.log(div);
      //loop at the end of the array and remove each child with the class of comment-box in the section
      for(var i = div.length; i > 0;i--)
      {
          section.removeChild(div[i -1]);
      }
   }  
   function addCommentClasses(name,date,comment,image,header,div,content)
   {
    name.classList.add("comment-box__name");
    date.classList.add("comment-box__date");
    comment.classList.add("comment-box__comment");
    image.classList.add("comment-box__avatar");
    header.classList.add("comment-box__header")
    div.classList.add("comment-box");
    content.classList.add("comment-box__main-content");
   }
   function fillCommentSection(data) 
   {
        for(var i =0; i < data.length; i++)
        { 
            //add the data into the comments
            addCommentInfo(commentSection,data[i]);
        }
    }
   function addCommentInfo (section, data) {
        if(data.avatar === undefined)
        {
          data.avatar = makeNewAvatar(avatars);
        }
        //create elements to store the data into
       // <i class="fas fa-trash"></i>
        let divNode = document.createElement("div");
        let divHeaderNode = document.createElement("div");
        let divContentNode = document.createElement('div');
        let deleteNode = document.createElement('i');
        deleteNode.classList.add("fas", "fa-trash" , "deleteBtn");
       // deleteNode.id = data.id;
        let likeNode = document.createElement('h5');
        let nameNode = document.createElement("h5");
        let dateNode = document.createElement("h5");
        let commentNode = document.createElement("h5");
        let imgNode = document.createElement("img");  

        //add content into nodes
        let days = 1000 * 60 * 60 * 24;
        let time = new Date();
        let today = time.getTime();
        nameNode.innerText = data.name;
        likeNode.innerText = `${data.likes} Likes`
        dateNode.innerText  = `${Math.ceil((today - data.timestamp)/days)} Day(s) Ago`;
        commentNode.innerText = data.comment;
        imgNode.src = data.avatar;
        //add classes 
        addCommentClasses(nameNode,dateNode,commentNode,imgNode,divHeaderNode,divNode,divContentNode);

        //append into div
        divNode.appendChild(imgNode);
        divHeaderNode.appendChild(nameNode);
        divHeaderNode.appendChild(dateNode);
        
        
        divContentNode.appendChild(divHeaderNode);
        //divContentNode.appendChild(likeNode);
        divContentNode.appendChild(commentNode);
        divContentNode.appendChild(deleteNode);
        divNode.appendChild(divContentNode);
      
        divNode.id = data.id;

        //append to the section
        section.insertBefore(divNode,section.childNodes[0]);
      
   }
  

function addOneDeleteEvent(data) {
  let commentBox = document.getElementById(data.id);
  let button = commentBox.querySelector("i");
  
  button.addEventListener("click", event => {
  
    axios.delete(`${url}comments/${commentBox.id}${api_key}`).then(response => {
      commentBox.remove();
      
    });
  });
}
function addDeleteEvent(data) {
  setTimeout(function() {

  for(let i = 0; i < data.length; i++)
  {
    let commentBox = document.getElementById(data[i].id);
    let button = commentBox.querySelector('i');
    button.addEventListener("click", event => {
      axios.delete(`${url}comments/${commentBox.id}${api_key}`).then(response => {
        
        commentBox.remove();
        
      });
     });
  }
}, 200);

}