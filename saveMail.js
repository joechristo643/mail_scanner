

var config = {
    apiKey: "AIzaSyCyT3aG1tXuy9t5gS5x3W3dyU-Xynij7Vc",
    authDomain: "mail-scanner-c00b3.firebaseapp.com",
    databaseURL: "https://mail-scanner-c00b3.firebaseio.com",
    projectId: "mail-scanner-c00b3",
    storageBucket: "",
    messagingSenderId: "134999152153"
};
firebase.initializeApp(config);


(function getEmails() {

    var search_in = document.body.innerHTML;
    var string_context = search_in.toString();

    var array_mails = string_context.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    array_mails = Array.from(new Set(array_mails));
    var hostname = document.location.hostname;
    saveEmailData(array_mails, hostname);
})();




function saveEmailData(mailarr, hname) {
    var database = firebase.database();

    database.ref().child('websites').child(hname.split(".")[1]).set({
        name: hname,
        mailids: mailarr
    }, function (error) {
        if (error) {
            console.log("error");
        } else {
            console.log("data saved");

        }

    });
}