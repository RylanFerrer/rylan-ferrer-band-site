const comments = [
    {
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


   const commentSection = document.getElementById("comments");
   const form = document.getElementById("comment__form");
   let d = new Date();
   let today = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(); 
   
   function clearComments()
   {
    let div = commentSection.getElementsByTagName('div');
    for(var i = comments.length; i > 0;i--)
    {
    
        commentSection.removeChild(div[i -1]);
    }
     
   }
   
   fillCommentSection();

   

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
  
   function addCommentClasses(name,date,comment)
   {
    name.classList.add("comment-box__name");
    date.classList.add("comment-box__date");
    comment.classList.add("comment-box__comment");
   }
   
   function addCommentInfo (section, data,index) {
        let divNode = document.createElement("div");
        let nameNode = document.createElement("h5");
        let dateNode = document.createElement("h5");
        let commentNode = document.createElement("h5");
        
        //add text into div
        nameNode.innerText = data[index].name;
        dateNode.innerText  = data[index].date;
        commentNode.innerText = data[index].comment;
    
   
        //add classes 
        addCommentClasses(nameNode,dateNode,commentNode);


        //append into div
        divNode.appendChild(nameNode);
        divNode.appendChild(dateNode);
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

   
   
   