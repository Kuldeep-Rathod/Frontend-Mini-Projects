const button = document.querySelectorAll('.button')
console.log(button)

button.forEach(function(button) {
  console.log(button);
  button.addEventListener('click', function(event) {
    console.log(event)
    console.log(event.target)
    if (event.target.id === 'grey') {
      document.body.style.backgroundColor = event.target.id
    }
    if (event.target.id === 'white') {
      document.body.style.backgroundColor = event.target.id
    }
    if (event.target.id === 'blue') {
      document.body.style.backgroundColor = event.target.id
    }
    if (event.target.id === 'yellow') {
      document.body.style.backgroundColor = event.target.id
    }
    if (event.target.id === 'purple') {
      document.body.style.backgroundColor = event.target.id
    }
  })
});