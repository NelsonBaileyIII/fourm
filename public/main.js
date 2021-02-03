cards = []

// This is what jquery does when the page loads...
$(document).ready(function(){
    // always, get posts from the API and for each one, addCard and then viewCards
    axios.get('/api/post').then(function (response){
        let posts = response.data
        posts.forEach(p => {
            addCard(p)
        })
        viewCards()
    })

    // This is an event handler to handle the form submit event
    $('form').submit(function(e){
        // prevent the default submission behavior
        e.preventDefault()
        // serialize the form to get key/value pairs from inputs
        let p = $('form').serializeObject()
        
        // POST that data to '/api/post' and add the response to the cards array
        // with addCard...then call viewCards to reload the cards view.
        axios.post('/api/post', p).then(function(response){
            addCard(response.data)
            viewCards()
        })
    })
})

// addCard takes a post and adds it to the array of cards that will display a collection of posts
//
// we want this in a function so we are only defining the HTML for a card in ONE place.
// that way, if want to change how a card renders we only have to change it here.
function addCard(post) {
    // bootstrap spacing utilities: https://getbootstrap.com/docs/4.0/utilities/spacing/
    // bootstrap card: https://getbootstrap.com/docs/4.0/components/card/
    let card = `<div class="card mt-1 mb-1">
    <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.content}</p>
        </div>
    </div>`
    cards.push(card)
}

// viewCards overwrites the HTML in #CPost with the cards array, joining the HTML strings with ""
function viewCards() {
    $('#CPost').html(cards.join(""))
}

// I just copied this from stack overflow to extend jquery with a func that serializes objects
// from the name and value properties of an element
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
