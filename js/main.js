window.onload = function() {
  var htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.className = htmlElement.className.replace(/no-js/, "");

  // var rotates = document.getElementsByClassName("rotate");
  // for (var i = 0; i < rotates.length; i++) {
  //   rotates[i].style.height = rotates[i].offsetWidth + 'px';
  // }
  var classesList = htmlElement.className;
  if (classesList.match(/no-csstransitions/) && classesList.match(/[^(no\-)]svg/)) {
    var template = function(template, data) {
      return template.replace(/\{\{(\w*)\}\}/g, function(m, key) {
        return data.hasOwnProperty(key) ? data[key] : "";
      });
    };
    var tableHeaderToSvg = function(table) {
      var svgTemplate = "data:image/svg+xml;charset/utf-8," +
        "<svg xmlns=\"http://www.w3.org/2000/svg\">" +
        "<text x=\"{{x}}\" y=\"{{y}}\" style=\"font-family:{{fontFamily}};" +
        "color: black;font-size:{{fontSize}}px; text-anchor:middle\" transform=\"rotate(-90)\">{{textValue}}</text>" +
        "</svg>",

        fontSize = 12,
        fontFamily = "Arial",
        objElement = document.createElement("object"),
        thList = table.getElementsByTagName("th"),
        textContainer,
        textValue,
        spanElem,
        height,
        type,
        obj,
        i;

      for(i = 0; i < thList.length; i++) {
        textContainer = thList[i].getElementsByTagName("*");
        textContainer = textContainer[(textContainer.length - 1)];
        textValue = textContainer.innerHTML;
        height = textContainer.clientHeight;
        width = textContainer.clientWidth;
        obj = objElement.cloneNode(true);


        obj.height = (height > width) ? height : width;
        obj.type = "image/svg+xml";
        obj.width = fontSize;
        // obj.data = "data:image/svg+xml;charset/windows-1251,<svg xmlns='http://www.w3.org/2000/svg'><text x='" + (- obj.height/2) + "' y='" + fontSize + "' style='font-family:" + fontFamily + "; font-size:" + fontSize + "px; text-anchor:middle' transform='rotate(-90)'>" + text + "</text></svg>";
        obj.data = template(svgTemplate, {
          x: -(obj.height/2),
          y: fontSize,
          fontSize: fontSize,
          fontFamily: fontFamily,
          textValue: textValue,
        });

        thList[i].replaceChild(obj, thList[i].firstChild);
      }

    };

    var table = document.getElementById("vertical-headers-table");
    tableHeaderToSvg(table);
  }
};
