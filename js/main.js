window.onload = function() {
  var htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.className = htmlElement.className.replace(/no-js/, "");

  var classesList = htmlElement.className;

  // var needSvgRotation = classesList.match(/no-csstransitions/) && classesList.match(/[^(no\-)]svg/)

  // TODO no-csstransforms3d
  if (classesList.match(/no-csstransitions/) && classesList.match(/[^(no\-)]svg/)) {
    var template = function(template, data) {
      return template.replace(/\{\{(\w*)\}\}/g, function(m, key) {
        return data.hasOwnProperty(key) ? data[key] : "";
      });
    };

    var rotateTableHeader = function(table) {
      var svgTemplate = [
        "data:image/svg+xml;charset/utf-8,",
        "<svg xmlns=\"http://www.w3.org/2000/svg\">",
        "<text x=\"{{x}}\" y=\"{{y}}\" style=\"font-family:{{fontFamily}}; ",
        "font-size:{{fontSize}}px; font-weight:{{fontWeight}}; ",
        "text-anchor:finish\" transform=\"rotate(-90)\">{{textValue}}</text>",
        "</svg>"
      ].join("");
      var rowFragment = document.createDocumentFragment(),
        headerRow = table.getElementsByClassName("header-row")[0],
        headersList = headerRow.getElementsByClassName("vertical-header"),
        computedStyles = window.getComputedStyle(headersList[0].getElementsByClassName("text-container")[0], null),
        headerElementSample = document.createElement("th"),
        objectElementSample = document.createElement("object"),
        length = headersList.length,
        fontSize = computedStyles.getPropertyValue("font-size"),
        fontFamily = computedStyles.getPropertyValue("font-family"),
        fontWeight = computedStyles.getPropertyValue("font-weight"),
        textContent,
        svgObject,
        header,
        height,
        width,
        elem,
        i;

      for (i = 0; i < length; i++) {
        elem = headersList[i];
        textContent = elem.textContent.replace(/(^\s+|\s+$)/g, "");
        width = elem.offsetWidth;
        height = elem.offsetHeight;
        svgObject = objectElementSample.cloneNode(true);
        header = headerElementSample.cloneNode(true);

        svgObject.height = (height > width) ? height : width;
        svgObject.type = "image/svg+xml";
        svgObject.width = fontSize;
        svgObject.data = template(svgTemplate, {
          x: -(svgObject.height),
          y: fontSize,
          fontSize: fontSize,
          fontFamily: fontFamily,
          textValue: textContent,
          fontWeight: fontWeight
        });
        header.appendChild(svgObject);
        rowFragment.appendChild(header);
      }

      // clear headers row
      try {
        headerRow.innerHTML = "";
      } catch(e) {
        while(headerRow.firstChild) {
          headerRow.removeChild(headerRow.firstChild);
        }
      }

      headerRow.appendChild(rowFragment);

    };

    var table = document.getElementsByClassName("target-table")[0];
    rotateTableHeader(table);
  }
};
