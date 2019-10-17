var shows = [
    { date: "Mon Dec 17 2018", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "Tue Jul 18 2019", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "Fri Jul 22 2019", venue: "View Loungue", location: "San Francisco, CA" },
    { date: "Sat Aug 22 2019", venue: "Hyatt Agency", location: "San Francisco, CA" },
    { date: "Fri Sept 05 2019", venue: "Moscow Center", location: "San Francisco, CA" },


]
const mobileTable = document.getElementById("mobile-table");
const desktopTable = document.getElementById("desktop-table");

function createTableHead(table, shows) {
    var tHead = table.createTHead();
    var row = tHead.insertRow();
    for (var show of shows) {
      
        var th = document.createElement('th');
        var text = document.createTextNode( show.toUpperCase());
        th.classList.add("shows__info-header");
        th.appendChild(text);
        row.appendChild(th);
    }
}


function createTable(table, shows) {
    for (var show of shows) {
        var row = table.insertRow();
        row.classList.add("shows__info-row--border");

        for (key in show) {
        
            var cell = row.insertCell();
            var text = document.createTextNode(show[key]);
            cell.appendChild(text);
            
        }

        let buttonCell = row.insertCell();
        let buttonNode = document.createElement("button");
        buttonNode.innerText = "Buy Your Tickets";
        buttonCell.classList.add("shows__info-btn-container");
        buttonNode.classList.add("shows__info-btn");
        buttonCell.appendChild(buttonNode);  
      
        
    }
    
}

var showKeys = Object.keys(shows[0]);


function createMobileTable(table,data)
{
    for (var show of shows)
    {
        for (key in show )
        {
            let header = key.toUpperCase();
            let row = table.insertRow();
            let cell = row.insertCell();
           
            let text = document.createTextNode(show[key]);
            let textNode = document.createElement("h4");
            textNode.appendChild(text);
    
            if(textNode.innerText === show.date)
            {
                textNode.classList.add("shows__info-text","shows__info-text--date");
            }
            else
            {   
                textNode.classList.add("shows__info-text");
            }
   
            cell.innerHTML = "<h4 class = 'shows__info-header'>"+ header + "</h4>";
            cell.appendChild(textNode);
        }
        createButton(table, "mobile");
    }

}

function createButton(table,type) {
    let row = table.insertRow();
    let buttonCell = row.insertCell();
    let buttonNode = document.createElement("button");
    buttonCell.classList.add("shows__info-border");
    buttonNode.innerText = "Buy Your Tickets";
    buttonNode.classList.add("shows__info-btn");
    buttonCell.appendChild(buttonNode);
}


//Media Query for tables 

//Initialize Tables
createTable(desktopTable,shows);
createTableHead(desktopTable,showKeys);

createMobileTable(mobileTable,shows); 


function changeTable(mobile) {
    
    if(mobile.matches) {
            mobileTable.style.display = 'table';
            desktopTable.style.display = 'none';
         
    }
    else 
    {
            desktopTable.style.display = 'table';
            mobileTable.style.display = 'none';
           
    }
}
var mobileScreen = window.matchMedia("(max-width:767px)");

changeTable(mobileScreen);

mobileScreen.addListener(changeTable);