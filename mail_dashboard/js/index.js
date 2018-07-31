var arrow=document.getElementsByClassName("arrow")[0];
arrow.addEventListener("click",function(event){
    var currClass=event.target.classList;
    var elem=document.getElementsByTagName("li");
    
if(currClass.contains("down")){
    currClass.remove("down");
    currClass.add("up");
    for(var i=0;i<elem.length;i++){
        elem[i].style.height='0px';
        (function(i){window.setTimeout(function(){
            elem[i].style.display='none';
            
        },100)})(i);
        
    }
}
else{
    currClass.remove("up");
    currClass.add("down");
    for(var i=0;i<elem.length;i++){
        elem[i].style.display='block';
        
        
        (function(i){window.setTimeout(function(){
            elem[i].style.height='30px';  
            
        },100)})(i);
        
        
    }
}
});


var config = {
    apiKey: "AIzaSyCyT3aG1tXuy9t5gS5x3W3dyU-Xynij7Vc",
    authDomain: "mail-scanner-c00b3.firebaseapp.com",
    databaseURL: "https://mail-scanner-c00b3.firebaseio.com",
    projectId: "mail-scanner-c00b3",
    storageBucket: "",
    messagingSenderId: "134999152153"
  };
  firebase.initializeApp(config);

    var database = firebase.database();
 
(function render(){
    var arr=getChild();
    window.setTimeout(function(){
        var len=arr.length;
    if(len>0){
    var list=document.getElementById("website-list");
    for(var i=0;i<len;i++){
        var item=document.createElement("li");
        item.id="website"+i+1;
        item.onclick=getMailsBySite;
        var text=document.createTextNode(arr[i]);
        item.appendChild(text);
        list.appendChild(item);
    }

    document.getElementById("web-count").children[0].innerText=len;
    }
    else{
        document.getElementsByClassName("arrow")[0].style.display='none';
    }
    }
    ,2000)
    
})();


function removeActive(){
    var ul=document.getElementById("website-list");
    for(var i=0;i<ul.children.length;i++){

        (ul.children[i].classList.contains("active"))? ul.children[i].classList.remove("active"):'';
    }
}



function getMailsBySite(event){
    removeActive();
    var clickedElem=event.target;
    var websiteName=clickedElem.innerText;
    clickedElem.classList.add("active");
     firebase.database().ref('/websites/' + websiteName).once('value').then(function(snapshot) {
        var data = snapshot.val();
        frameGrid(data);
        });

}
function getChild(){
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("websites");
    var websitesarr=new Array();
    urlRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {

        websitesarr.push(child.key)
      });
    });
    return websitesarr;
}


function frameGrid(data){
   var headerData=["Id","Website","Mail-id"];
   var len=data.mailids.length;
   document.getElementById("mail-count").children[0].innerText=len;
   var mailTable=document.getElementsByClassName("scanlist-table");
   var gridDiv=document.getElementsByClassName("mail-content")[0];

   if(mailTable.length>0){
    gridDiv.innerHTML="";
   }
   else{
   
   }
   var table=document.createElement("table");
   table.classList.add("scanlist-table");
    var hrow=document.createElement("tr");
    for(var i=0;i<headerData.length;i++){
        var header=document.createElement("th");
        header.appendChild(document.createTextNode(headerData[i]));
        hrow.appendChild(header);
    }
    table.appendChild(hrow);
    for(var j=1;j<=len;j++){
        var row=document.createElement("tr");
            var col1=document.createElement("td");
            col1.appendChild(document.createTextNode(j));
            row.appendChild(col1);
            var col2=document.createElement("td");
            col2.appendChild(document.createTextNode(data.name));
            row.appendChild(col2);

            var col3=document.createElement("td");
            col3.appendChild(document.createTextNode(data.mailids[j-1]));
            row.appendChild(col3);
            table.appendChild(row);

        
    }

    gridDiv.appendChild(table);


}
