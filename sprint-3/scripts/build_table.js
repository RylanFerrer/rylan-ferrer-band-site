var shows = [
    { date: "Mon Dec 17 2018", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "Tue Jul 18 2019", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "Fri Jul 22 2019", venue: "View Loungue", location: "San Francisco, CA" },
    { date: "Sat Aug 22 2019", venue: "Hyatt Agency", location: "San Francisco, CA" },
    { date: "Fri Sept 05 2019", venue: "Moscow Center", location: "San Francisco, CA" },
]
//get show data


//table variables
const table = document.getElementById("main-table");
const showKeys = Object.keys(shows[0]);
const headerDiv = document.getElementById("table-head");
//Initialize Tables
//createMobileTable(table,shows); 
//createTable(table,shows);

const showURL = axios.get(`${url}showdates${api_key}`);

showURL.then(result =>{
 console.log(result);
 const shows = result.data;
 let showKeys = Object.keys(result.data[0]);
 createTable(table,shows);
 createTableHead(table,showKeys);
 createMobileTable(table,shows);
});

function changeTable(mobile) {
    let desktopRow = table.getElementsByClassName("shows__info-row-desktop");
    let mobileRow = table.getElementsByClassName("shows__info-row-mobile");

    if(mobile.matches) {
        changeRowDisplay("remove", desktopRow);
        changeRowDisplay("add", mobileRow);
    }
    else 
    {
        changeRowDisplay("remove", mobileRow);
        changeRowDisplay("add", desktopRow);
    }
}
let mobileScreen = window.matchMedia("(max-width:767px)");
changeTable(mobileScreen);
mobileScreen.addListener(changeTable);

function createTableHead(table, shows) {
    
    
    var tHead = table.createTHead();
    var row = tHead.insertRow();
    row.classList.add( "shows__info-row-desktop");
    for (var show of shows) {
       
        var th = document.createElement('th');
        var text = document.createTextNode( show.toUpperCase());
        if (show === 'id')
        {
            th.classList.add('hide');
        }
        th.classList.add("shows__info-header");
        th.appendChild(text);
        row.appendChild(th);
    }

}
function createTable(table, shows) {
    for (let show of shows) {
        let row = table.insertRow();
        row.classList.add("shows__info-row--border", "shows__info-row-desktop");

        for (key in show) {
            
            let cell = row.insertCell();
            if(key !== 'id')
            {
                let text = document.createTextNode(show[key]);
                cell.appendChild(text);
            }
         
        }
        let buttonCell = row.insertCell();
        let buttonNode = document.createElement("button");
        buttonNode.innerText = "Buy Your Tickets";
        buttonCell.classList.add("shows__info-btn-container");
        buttonNode.classList.add("shows__info-btn");
        buttonCell.appendChild(buttonNode);  
    }
    
}
function createMobileTable(table,data)
{
    for (var show of data)
    {
        for (key in show )
        {    
                    let header = key.toUpperCase();
                    let row = table.insertRow();
                    row.classList.add("shows__info-row-mobile");
                    let cell = row.insertCell();
        
                    //data
                 
                    if (key !== "id")
                    {
                        let text = document.createTextNode(show[key]);
                        let textNode = document.createElement("h4");
                        textNode.appendChild(text);
                
                        if(textNode.innerText === data.date)
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
                  
                }
                createButton(table);
                }     
    }



function createButton(table) {
    let row = table.insertRow();
    row.classList.add("shows__info-row-mobile");
    let buttonCell = row.insertCell();
    let buttonNode = document.createElement("button");
    buttonCell.classList.add("shows__info-border");
    buttonNode.innerText = "Buy Your Tickets";
    buttonNode.classList.add("shows__info-btn");
    buttonCell.appendChild(buttonNode);
}
function changeRowDisplay(type, rowClass)
{
    if (type === "remove")
    {
        for(let i = 0; i < rowClass.length; i++)
        {
            rowClass[i].style.display = 'none';
        }
    }
    else if (type === "add")
    {
        for(let i = 0; i < rowClass.length; i++)
        {
            rowClass[i].style.display = 'table-row';
        }
    } 
   
}
//Media Query for tables 
