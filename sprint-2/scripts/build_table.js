var shows = [
    {date: "Mon Dec 17 2018", venue: "Ronald Lane",location: "San Francisco, CA"},
    {date: "Tue Jul 18 2019", venue: "Pier 3 East",location: "San Francisco, CA"},
    {date: "Fri Jul 22 2019", venue: "View Loungue",location: "San Francisco, CA"},
    {date: "Sat Aug 22 2019", venue: "Hyatt Agency",location: "San Francisco, CA"},
    {date: "Fri Sept 05 2019", venue: "Moscow Center",location: "San Francisco, CA"},


]
table = document.querySelector("table");
function createTableHead (table,shows) {
    var tHead = table.createTHead();
    var row = tHead.insertRow();
    for(var show of shows)
    {
        var th = document.createElement('th');
        var text = document.createTextNode(show);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function createTable(table,data)
{
    for (var show of shows) {
        var row = table.insertRow();
        for(key in show) {
            var cell = row.insertCell();
            var text = document.createTextNode(show[key]);
            cell.appendChild(text);            
        }
    }
}
var showKeys = Object.keys(shows[0])

