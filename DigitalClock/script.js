const clock = document.getElementById('clock')
// const clock = document.querySelector('#clock')

setInterval(function() {
  let date = new Date()
  // console.log(date.toLocaleTimeString);
  clock.innerHTML = date.toLocaleTimeString();
}, 1000)

// https://b6195901-1a18-40c5-aa40-1cf77dc9ceae-00-3v4gwpxuxzdog.worf.replit.dev/