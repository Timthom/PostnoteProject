function delaySidebar() {
    alert("Page is loaded");
   console.log("Före delay");
    document.nav.style.WebkitAnimationDuration = "1s";  //         Code for Chrome, Safari, and Opera
    document.nav.style.animationDuration = "1s";
    console.log("Efter delay" );
   }
