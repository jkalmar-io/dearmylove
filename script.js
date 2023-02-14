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
      const dreamElement = document.querySelector("#Dream");
      fetch("dreams.json")
      .then(response => response.json())
      .then(dreams => {
        dreamElement.textContent = dreams[daysSinceStart];
      });