function createEqualsBuilderFromDomain() {
    var domainClassString = document.getElementById('description').value;
    var domainClassStringFormatted = domainClassString.replace(/<(?:.|\n)*?>/gm, '');

    var domainFields = findDomainFields(domainClassStringFormatted);

    var domainClassName = findDomainClassName(domainClassStringFormatted);

    document.getElementById("equalsTitle").innerHTML =
        '<h2> Generated implementation of equals method:</h2>';
    
    equalsMethod = createEqualsBuilder(domainFields, domainClassName);

    buildEqualsMethod(equalsMethod, '');
}


function buildEqualsMethod(equalsMethod, equalsMethodSoFar) {
    setTimeout(function(){
      equalsMethodSoFar +=  equalsMethod[equalsMethodSoFar.length];
      document.getElementById("equalsMethod").innerHTML = '<pre>' + equalsMethodSoFar + '</pre>';
      if (equalsMethodSoFar < equalsMethod) {
        buildEqualsMethod(equalsMethod, equalsMethodSoFar);
      }
    }, 10);
}


function findDomainClassName(domainClassString) {
    var lines = domainClassString.split('\n');
    for (var i = 0; i < lines.length; i++){
        if (lines[i].match(/class[a-zA-Z0-9\s]*{/gm)) {
            return lines[i].match(/(?<=class\s)[a-zA-Z0-9_]*/gm);
        }
    }
}

function findDomainFields(domainClassString) {
    var domainFields = [];
    var lines = domainClassString.split('\n');
    for (var i = 0; i < lines.length; i++){
        if (!lines[i].match(/\{/gm) 
         && !lines[i].match(/\(/gm)
         && lines[i].match(/private/gm)) {
            domainFields.push(lines[i].match(/(?<=\s)[a-zA-Z0-9_]*(?=;)/gm));
        }
    }
    return domainFields;
}


function createEqualsBuilder(domainFields, domainClassName) {
    var equalsMethod =
        '<pre>'
      + 'public boolean equals(Object obj) {<br>'
      + '  if (obj == null) { return false; }<br>'
      + '  if (obj == this) { return true; }<br>'
      + '  if (obj.getClass() != getClass()) {<br>'
      + '    return false;<br>'
      + '  }<br>'
      + '  ' + domainClassName + ' rhs = (' + domainClassName + ') obj;<br>'
      + '  return new EqualsBuilder()<br>'
      + '               .appendSuper(super.equals(obj)<br>';


    for (var i = 0; i < domainFields.length; i++){
        equalsMethod +=
        '               .append(' + domainFields[i] + ', rhs.' + domainFields[i] + ')<br>'
    }

    equalsMethod +=
        '               .isEquals();<br>'
      + '}'
      + '</pre>'

    return equalsMethod;
}