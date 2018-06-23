function createEqualsBuilderFromDomain() {
    var description = document.getElementById('description').value;
    var descriptionEditted = description.replace(/<(?:.|\n)*?>/gm, '');

    var domainClasses = [];

    document.getElementById("demo").innerHTML = '';

    var lines = descriptionEditted.split('\n');
    for (var i = 0; i < lines.length; i++){
        if (!lines[i].match(/\{/gm) 
         && !lines[i].match(/\(/gm)
         && lines[i].match(/private/gm)) {
            var domainClass = lines[i].match(/(?<=\s)[a-zA-Z0-9_]*(?=;)/gm);
            domainClasses.push(domainClass)
            document.getElementById("demo").innerHTML += ' ' + domainClass + '<br>';
        }
    }

    document.getElementById("demo").innerHTML = 
      '<h2> Generated implementation of equals method:</h2>'
     + createEqualsBuilder(domainClasses);
}

function createEqualsBuilder(domainClasses) {
    var equalsMethod =
        '<pre>'
      + 'public boolean equals(Object obj) {<br>'
      + '  if (obj == null) { return false; }<br>'
      + '  if (obj == this) { return true; }<br>'
      + '  if (obj.getClass() != getClass()) {<br>'
      + '    return false;<br>'
      + '  }<br>'
      + '  MyClass rhs = (MyClass) obj;<br>'
      + '  return new EqualsBuilder()<br>'
      + '               .appendSuper(super.equals(obj)<br>';


    for (var i = 0; i < domainClasses.length; i++){
        equalsMethod +=
        '               .append(' + domainClasses[i] + ', rhs.' + domainClasses[i] + ')<br>'
    }

    equalsMethod +=
        '               .isEquals();<br>'
      + '}'
      + '</pre>'

    return equalsMethod;
}