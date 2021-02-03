$(document).ready(function(){
    axios.get('/api/post').then(function (response){
        let posts = response.data
    
        cards = []
    
        posts.forEach(element => {
            let card = `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.content}</p>
                </div>
            </div>`
            cards.push(card)
        })
        $('#CPost').html(cards.join())
    })

    $('form').submit(function(e){
        e.preventDefault()
        let p = $('form').serializeObject()
        
        axios.post('/api/post', p).then(function(response){
            console.log(response.data)
        })
    })
})

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
