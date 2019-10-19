const comments = [
    {
      avatar: "./assets/images/avatar.jpg",
      name: "Micheal Lyons",
      date: "12/18/2018",
      comment:
        "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
    },
    {
      avatar: "./assets/images/avatar.jpg",
      name: "Gary Wong",
      date: "12/12/2018",
      comment:
        "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
    },
    {
      avatar: "./assets/images/avatar.jpg",
      name: "Theodore Duncan",
      date: "11/15/2018",
      comment:
        "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
    }
   ];


   const commentSection = document.getElementById("comments-display");
   const form = document.getElementById("form-section");
   
   //comment section initialization
   fillCommentSection(comments);   
   
   form.addEventListener("submit", submitEvent => {

    submitEvent.preventDefault();
     //Get the date for today
    let d = new Date();
    let today = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(); 

    //create a new comment to push into the front of the comments array
    let comment = {};
    comment.name = submitEvent.target.firstName.value;
    comment.date = today;
    comment.comment = submitEvent.target.comment.value;
    comments.unshift(comment);

    //Clear the comment section of all comments and then fill them back up with the comment
    clearComments(commentSection);
    fillCommentSection(comments);
  });

   function clearComments(section)
   {
      //get all the elements with the class of comment-box
      let div = section.getElementsByClassName('comment-box');
      console.log(div);
      //loop at the top of the array and remove each child in the section
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
            addCommentInfo(commentSection,comments[i]);
        }
    }
   function addCommentInfo (section, data,index) {
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
        dateNode.innerText  = data.date;
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
        
       
        //append to section
        section.appendChild(divNode);
        
   }
  
   