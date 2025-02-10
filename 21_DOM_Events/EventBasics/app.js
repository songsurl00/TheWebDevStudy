const btn = document.querySelector('#v2');

btn.onclick = () => {
  console.log('YOU CLICKED ME!');
  console.log('I HOPE IT WORKED!!');
};

const scream = () => {
  console.log('AAAAAHHHHH');
  console.log('STOP TOUCHING ME!');
};

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
  alert('you clicked the h1!');
};

const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', () => {
  alert('CLICKED!');
});

const twist = () => console.log('TWIST!');
const shout = () => console.log('SHOUT!');

const tasButton = document.querySelector('#tas');

// tasButton.onclick = twist;
// tasButton.onclick = shout;

tasButton.addEventListener('click', twist);
tasButton.addEventListener('click', shout);
