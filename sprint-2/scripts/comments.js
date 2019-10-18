const comments = [
    {
      avatar: "./assets/images/avatar.jpg",
      name: "Micheal Lyons",
      date: "12/18/2018",
      comment:
        "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
    },
    {
      
      name: "Gary Wong",
      date: "12/12/2018",
      comment:
        "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
    },
    {
      name: "Theodore Duncan",
      date: "11/15/2018",
      comment:
        "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
    }
   ];


   const commentSection = document.getElementById("commentz");
   const form = document.getElementById("form-section");
   let d = new Date();
   let today = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(); 
   
   function clearComments()
   {
    let div = commentSection.getElementsByClassName('comment-box');
    
    for(var i = comments.length; i > 0;i--)
    {
        commentSection.removeChild(div[i -1]);
    }
     
   }
   
  

   form.addEventListener("submit", submitEvent => {
        submitEvent.preventDefault();
        clearComments();
        let comment = {};
        comment.name = submitEvent.target.firstName.value;
        comment.date = today;
        comment.comment = submitEvent.target.comment.value;
        comments.unshift(comment);
        fillCommentSection();
   });
  
   function addCommentClasses(name,date,comment,image,header,div)
   {
    name.classList.add("comment-box__name");
    date.classList.add("comment-box__date");
    comment.classList.add("comment-box__comment");
    image.classList.add("comment-box__avatar");
    header.classList.add("comment-box__header")
    div.classList.add("comment-box");

   }
   
   function addCommentInfo (section, data,index) {
        let divNode = document.createElement("div");
        let divHeaderNode = document.createElement("div");
        let nameNode = document.createElement("h5");
        let dateNode = document.createElement("h5");
        let commentNode = document.createElement("h5");
        let imgNode = document.createElement("img");
        
        //add content into nodes
        nameNode.innerText = data[index].name;
        dateNode.innerText  = data[index].date;

        commentNode.innerText = data[index].comment;
        imgNode.src = data[index].avatar;
   
    
   
        //add classes 
        addCommentClasses(nameNode,dateNode,commentNode,imgNode,divHeaderNode,divNode);


        //append into div
        //divNode.appendChild(imgNode);
        divHeaderNode.appendChild(nameNode);
        divHeaderNode.appendChild(dateNode);

        divNode.appendChild(divHeaderNode);
        divNode.appendChild(commentNode);
       

        //append to section
        section.appendChild(divNode);
        
   }
   function fillCommentSection() 
   {
        for(var i =0; i < comments.length; i++)
        {
            addCommentInfo(commentSection,comments,i);
        }
   }

   fillCommentSection();
   
   
   