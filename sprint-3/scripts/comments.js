//array of random avatar arrays
const avatars = ["./assets/images/avatars/avatar-1.png","./assets/images/avatars/avatar-2.png","./assets/images/avatars/avatar-3.png",
"./assets/images/avatars/avatar-3.png", "./assets/images/avatars/avatar-4.png","./assets/images/avatars/avatar-5.png","./assets/images/avatars/avatar-6.png",
"./assets/images/avatars/avatar-7.png","./assets/images/avatars/avatar-8.png","./assets/images/avatars/avatar-9.png"];
const comments = [
  {
      avatar: "",
      name: "Micheal Lyons",
      date: "12/18/2018",
      comment:
        "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
    },
    {
      avatar: "",
      name: "Gary Wong",
      date: "12/12/2018",
      comment:
        "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
    },
    {
      avatar: "./assets/images/avatars/guy.jpg",
      name: "Theodore Duncan",
      date: "11/15/2018",
      comment:
        "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
    }
   ];
   
  
   const commentsGetURL = axios.get(`${url}comments${api_key}`);
   const commentsURL = (`${url}comments${api_key}`);
   commentsGetURL.then(result => {
     console.log(result.data);
    fillCommentSection(result.data);
   });

   //constant variables 
   const commentSection = document.getElementById("comments-display");
   const form = document.getElementById("form-section");

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
      console.log(response.data);
      addCommentInfo(commentSection,response.data);
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
     console.log("I got used");
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
        let divNode = document.createElement("div");
        let divHeaderNode = document.createElement("div");
        let divContentNode = document.createElement('div');
        let nameNode = document.createElement("h5");
        let dateNode = document.createElement("h5");
        let commentNode = document.createElement("h5");
        let imgNode = document.createElement("img");  

        //add content into nodes
        nameNode.innerText = data.name;
        dateNode.innerText  = `${data.likes} Likes`;
        commentNode.innerText = data.comment;
        imgNode.src = data.avatar;
        //add classes 
        addCommentClasses(nameNode,dateNode,commentNode,imgNode,divHeaderNode,divNode,divContentNode);

        //append into div
        divNode.appendChild(imgNode);
        divHeaderNode.appendChild(nameNode);
        divHeaderNode.appendChild(dateNode);
        divContentNode.appendChild(divHeaderNode);
        divContentNode.appendChild(commentNode);
        divNode.appendChild(divContentNode);

        //append to the section
        section.insertBefore(divNode,section.childNodes[0]);
   }
  
   