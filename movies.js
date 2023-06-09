// Function to make an HTTP request
function getData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// Function to generate HTML from JSON data
function generateHTML(data, template) {
  var container = document.getElementById("data-container");
  var html = "";
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    var movieHTML = template
      .replace("{count}", count++)
      .replace("{title}", data[i].Title)
      .replace("{releaseDate}", data[i].Release_Date)
      .replace("{cineRating}", data[i].Cine_Rating)
      .replace("{storyRating}", data[i].Story_Rating);
    html += movieHTML;
  }
  container.innerHTML = html;
}

// Fetch the JSON data and generate HTML
getData("data.json", function (data) {
  fetch("template.html")
    .then(function (response) {
      return response.text();
    })
    .then(function (template) {
      generateHTML(data, template);
    });
});
