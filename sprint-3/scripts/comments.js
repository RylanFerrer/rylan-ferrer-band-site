//array of random avatar arrays
const avatars = ["./assets/images/avatars/avatar-1.png","./assets/images/avatars/avatar-2.png","./assets/images/avatars/avatar-3.png",
"./assets/images/avatars/avatar-3.png", "./assets/images/avatars/avatar-4.png","./assets/images/avatars/avatar-5.png","./assets/images/avatars/avatar-6.png",
"./assets/images/avatars/avatar-7.png","./assets/images/avatars/avatar-8.png","./assets/images/avatars/avatar-9.png"];

   const commentsGetURL = axios.get(`${url}comments${api_key}`);
   const commentsURL = (`${url}comments${api_key}`);
   commentsGetURL.then(result => {
    fillCommentSection(result.data);
   });
   //constant variables 
   const commentSection = document.getElementById("comments-display");
   const form = document.getElementById("form-section");
   let deleteBtn = document.getElementsByClassName("deleteBtn");
   
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
      reload();
      submitEvent.target.reset();
    });
   
    event.preventDefault();
  });
  
   function clearComments(section)
   {
      //get all the elements with the class of comment-box
      let div = section.getElementsByClassName('comment-box');
      //loop at the end of the array and remove each child with the class of comment-box in the section
      for(var i = div.length; i > 0;i--)
      {
          section.removeChild(div[i -1]);
      }
   }  
   function fillCommentSection(data) 
   {
        for(var i =0; i < data.length; i++)
        { 
            //add the data into the comments
            addCommentInfo(commentSection,data[i]);
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
    function convertTimeStamp(data)
    {
        let days = 1000 * 60 * 60 * 24;
        let time = new Date();
        let today = time.getTime();
        let timeStamp = Math.ceil((today - data)/days);
        return timeStamp === 1 ? `${timeStamp} Day ago`: `${timeStamp} Days ago`
    }
   function addCommentInfo (section, data) {
        let divNode = document.createElement("div");
        let divHeaderNode = document.createElement("div");
        let divContentNode = document.createElement('div');
        let divFunctionNode = document.createElement("div");
        let deleteNode = document.createElement('i');
        deleteNode.classList.add("fas", "fa-trash" , "deleteBtn");
        let likeNode = document.createElement('h5');
        let likeButton = document.createElement('i');
        likeButton.classList.add('fas', 'fa-heart','comment-box__like-btn');
        likeNode.classList.add('comments__like-number')
        let nameNode = document.createElement("h5");
        let dateNode = document.createElement("h5");
        let commentNode = document.createElement("h5");
        let imgNode = document.createElement("img");  
        nameNode.innerText = data.name;
        likeNode.innerText = `${data.likes}`
        dateNode.innerText  = convertTimeStamp(data.timestamp);
        commentNode.innerText = data.comment;
        imgNode.src =  data.name === "James Charles" ? "./assets/images/avatars/sister.jpg":makeNewAvatar(avatars);
        //add classes 
        addCommentClasses(nameNode,dateNode,commentNode,imgNode,divHeaderNode,divNode,divContentNode);

        //append into div
        divNode.appendChild(imgNode);
        divHeaderNode.appendChild(nameNode);
        divHeaderNode.appendChild(dateNode);
        divContentNode.appendChild(divHeaderNode);
        divContentNode.appendChild(commentNode);
        divFunctionNode.appendChild(likeNode);
        divFunctionNode.appendChild(likeButton);
        divFunctionNode.appendChild(deleteNode);
        divContentNode.appendChild(divFunctionNode);
        divNode.appendChild(divContentNode);
        divNode.id = data.id;
        //append to the section
        section.insertBefore(divNode,section.childNodes[0]);
        addOneDeleteEvent(data);
        addLikeEvent(data);
   }
function addOneDeleteEvent(data) {
  let commentBox = document.getElementById(data.id);
  let button = commentBox.querySelector(".deleteBtn");
  button.addEventListener("click", event => {
    axios.delete(`${url}comments/${commentBox.id}${api_key}`).then(response => {
      commentBox.remove();
    });
  });
}
function addLikeEvent(data) {
  setTimeout(() => {
      let commentBox = document.getElementById(data.id);
      let likeBtn = commentBox.querySelector('.comment-box__like-btn');
      likeBtn.addEventListener("click", event => {
        axios.put(`${url}comments/${commentBox.id}/like${api_key}`).then(response => {
          updateLikes(response.data);
        });
      });
  }, 200)
}
function reload() {

   axios.get(commentsURL).then(result => {
     console.log(result.data);
     clearComments(commentSection);
    fillCommentSection(result.data);
   });
}
function updateLikes(data) {
  let commentBox = document.getElementById(data.id);
  let numString = commentBox.querySelector(".comments__like-number");
  numString.innerText = data.likes;
}

