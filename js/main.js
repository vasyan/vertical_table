window.onload = function() {
  var htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.className = htmlElement.className.replace(/no-js/, "");

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
        "font-size:{{fontSize}}px; font-weight:{{fontWeight}}; text-anchor:finish\" transform=\"rotate(-90)\">{{textValue}}</text>" +
        "</svg>",
        objElement = document.createElement("object"),
        divsList = table.getElementsByTagName("thead")[0].getElementsByTagName("div"),
        computedStyles = window.getComputedStyle(divsList[0], null),
        fontFamily = computedStyles.getPropertyValue("font-family"),
        fontSize = computedStyles.getPropertyValue("font-size"), //truly font-size
        fontWeight = computedStyles.getPropertyValue("font-weight"),
        length = divsList.length,
        originalHeadersWidth = [],
        textValue,
        height,
        width,
        elem,
        obj,
        i;

      for(i = 0; i < length; i++) {
        originalHeadersWidth.push(divsList[i].clientWidth);
      }

      for(i = 0; i < length; i++) {
        elem = divsList[i];
        textValue = elem.innerHTML;
        height = elem.clientHeight;
        width = originalHeadersWidth[i];
        obj = objElement.cloneNode(true);


        obj.height = (height > width) ? height : width;
        obj.type = "image/svg+xml";
        obj.width = fontSize;
        obj.data = template(svgTemplate, {
          x: -(obj.height),
          y: fontSize,
          fontSize: fontSize,
          fontFamily: fontFamily,
          textValue: textValue,
          fontWeight: fontWeight
        });

        divsList[i].replaceChild(obj, divsList[i].firstChild);
      }

    };

    var table = document.getElementById("vertical-headers-table");
    tableHeaderToSvg(table);
  }
};
