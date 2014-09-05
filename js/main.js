window.onload = function() {

  var htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.className = htmlElement.className.replace(/no-js/, ""); // js-enable

  var classesList = htmlElement.className;
  var needSvgRotation = classesList.match(/no-csstransforms3d/) && classesList.match(/[^(no\-)]svg/);

  if (needSvgRotation) {

    var table = document.getElementsByClassName("target-table")[0];

    // simple template engine
    var template = function(template, data) {
      return template.replace(/\{\{(\w*)\}\}/g, function(m, key) {
        return data.hasOwnProperty(key) ? data[key] : "";
      });
    };

    var rotateTableHeader = function(table) {
      var svgTemplate = [
        "data:image/svg+xml;charset/utf-8,",
        "<svg xmlns=\"http://www.w3.org/2000/svg\">",
        "<text x=\"{{x}}\" y=\"{{y}}\" style=\"font-family:'{{fontFamily}}'; ",
        "font-size:{{fontSize}}px; font-weight:'{{fontWeight}}'; ",
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
        fontSize = parseFloat(computedStyles.getPropertyValue("font-size")),
        fontFamily = computedStyles.getPropertyValue("font-family"),
        fontWeight = computedStyles.getPropertyValue("font-weight"),
        textContent,
        svgObject,
        header,
        height,
        width,
        elem,
        i;

      headerElementSample.className = "svg-header";

      // opera fix
      fontFamily = (fontFamily === "\"Times New Roman\"") ? "serif" : fontFamily;

      for (i = 0; i < length; i++) {
        elem = headersList[i];
        width = parseFloat(elem.offsetWidth);
        height = parseFloat(elem.offsetHeight);
        svgObject = objectElementSample.cloneNode(true);
        header = headerElementSample.cloneNode(true);
        textContent = elem.textContent.replace(/(^\s+|\s+$|<\/?[^>]+(>|$))/g, ""); // trim spaces and escape markup

        svgObject.height = (height > width) ? height : width;
        svgObject.height = svgObject.height;
        svgObject.type = "image/svg+xml";
        svgObject.width = fontSize;
        svgObject.data = template(svgTemplate, {
          x: -(svgObject.height),
          y: fontSize * 0.75, // alignment on the small letter
          fontSize: fontSize,
          fontFamily: fontFamily,
          textValue: textContent,
          fontWeight: fontWeight
        });
        header.appendChild(svgObject);
        rowFragment.appendChild(header);
      }

      // clear row
      try {
        headerRow.innerHTML = "";
      } catch(e) {
        while(headerRow.firstChild) {
          headerRow.removeChild(headerRow.firstChild);
        }
      }

      headerRow.appendChild(rowFragment);

      table.style["visibility"] = "visible";
    };

    rotateTableHeader(table);
  }

};
