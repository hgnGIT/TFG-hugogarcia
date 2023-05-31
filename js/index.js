 
        window.onscroll = function() {scrollFunction()};
        
        function scrollFunction() {
          if (document.body.scrollTop > 85 || document.documentElement.scrollTop > 85) {        
            document.getElementById("a").style.backgroundColor = "red";
          } else {
            document.getElementById("a").style.backgroundColor = "transparent";
            
          }
        }