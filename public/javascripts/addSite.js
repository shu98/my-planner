var i = 0;
var original = document.getElementById('copy');

function addSite(){
     
    var clone = original.cloneNode(true);
    clone.id = 'site' + ++i;
    clone.classList.remove('hide');

    for (j = 0; j < 5; j++) {
        clone.childNodes[1].lastChild.childNodes[j].setAttribute("name", 'site_rating[' + i + ']');
        clone.childNodes[1].lastChild.childNodes[j].firstElementChild.setAttribute("name", 'site_rating[' + i + ']');
    }

    original.parentNode.insertBefore(clone, original.parentNode.lastChild.previousSibling.previousSibling.previousSibling);
     
}

