      document.addEventListener('DOMContentLoaded', function() {
        var today = new Date();
        var start = new Date("2023-02-13");
        var daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        console.log("Day " + (daysSinceStart % 365));
        console.log(daysSinceStart);
        
        var img = document.createElement("img");
        img.setAttribute("id", "image");
        img.src = "dreams/" + (daysSinceStart % 365) + ".jpg";
        img.crossOrigin = "Anonymous";
        document.getElementById("PictureBox").appendChild(img);
        
        const dreamElement = document.getElementById("Dream");
        if (dreamElement) {
          fetch("dreams.json")
            .then(response => response.json())
            .then(dreams => {
              const dreamKey = (daysSinceStart % 365).toString();
              if (dreams[dreamKey]) {
                dreamElement.textContent = dreams[dreamKey];
                console.log("Dream populated:", dreams[dreamKey]);
              } else {
                console.log("No dream found for day:", dreamKey);
                dreamElement.textContent = "I hope you dream about... something wonderful!";
              }
            })
            .catch(error => {
              console.error("Error loading dreams:", error);
              dreamElement.textContent = "I hope you dream about... something wonderful!";
            });
        } else {
          console.error("Dream element not found!");
        }
      });