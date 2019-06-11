


playerlist ={}

createPlayer("amyL",0)
createPlayer("eddy",0)
createPlayer("achoo",0)
createPlayer("isaac",0)


function addscore(nme, amt){
    playerlist[nme].score = playerlist[nme].score + amt
    drawTable()

}

function createPlayer(nme, scr){
    thesekeys = Object.keys(playerlist)
    if(thesekeys.includes(nme)){
    }else{
        buttontext =  "<button onclick=setWinner('" +nme +"',1)>Winner</button>"
        buttontext2 =  "<button onclick=setWinner('" +nme +"',-1)>Loser</button>"
        buttonadd =  "<button onclick=addscore('" +nme +"',1)>+1</button>"
        buttonsub =  "<button onclick=addscore('" +nme +"',-1)>-1</button>"
        playerlist[nme] = {name:nme, score:scr, history: [0], winner:buttontext,loser:buttontext2, add1:buttonadd,sub1:buttonsub}
    }
    drawTable()
}

function addPlayer(){
    createPlayer($('#playerName').val(),0)
}

function removePlayer(){
    delete playerlist[$('#removeplayerName').val()]
    drawTable()
}

function setWinner(nme,scalar){
    thesekeys = Object.keys(playerlist)
    mapL = thesekeys.length
    winnings = mapL - 1
    if(mapL != 0 && thesekeys.includes(nme)){

        Object.keys(playerlist).forEach(function(key){
            if(nme === key){
                playerlist[key].score = playerlist[key].score + winnings*scalar
                playerlist[key].history.push(winnings*scalar)
            }else{
                playerlist[key].score = playerlist[key].score - 1*scalar
                playerlist[key].history.push(-1*scalar)

            }
        });

    }
    drawTable()
}

function drawTable(){


    $(".scorerun").html("")

    playerarray = []
    var item;

    for (var type in playerlist) {
        copy = $.extend({},playerlist[type])
        delete copy['history']
        playerarray.push(copy);
    }

    buildHtmlTable(playerarray, ".scorerun")


}


function buildHtmlTable(myList, selector) {
    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}

window.setTimeout(drawTable,200)
