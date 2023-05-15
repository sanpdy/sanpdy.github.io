let listItems = [...document.querySelectorAll("li")];

let options = {
  rootMargin: '-10%',
  threshold: 0.0
};

let observer = new IntersectionObserver(showItem, options);

function showItem(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let letters = [...entry.target.querySelectorAll('span')];
      letters.forEach((letter,idx) => {
        setTimeout(() => {
          letter.classList.add('active');
        }, idx * 10)
      });
      entry.target.children[0].classList.add('active');
    }
  });
}

listItems.forEach(item => {
  let newString = '';
  let itemText = item.children[0].innerText.split('');
  itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`));
  item.innerHTML = newString;
  observer.observe(item);
});

const loadingMessage = document.getElementById("loading-message");

const updateMessage = () => {
  loadingMessage.innerText = "WELCOME";
};

const loadingAnimation = () => {
  let dotCount = 0;
  let cycleCount = 0;

  const intervalId = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // cycle through dot counts 0, 1, 2, 3
    const dots = ".".repeat(dotCount);
    loadingMessage.innerText = `Loading${dots}`;

    if (dotCount === 3) {
      cycleCount++;
    }

    if (cycleCount === 3 && dotCount === 3) {
      clearInterval(intervalId); // stop updating the message
      setTimeout(updateMessage, 500); // show "WELCOME" after 0.5 second
    }
  }, 500);
};

loadingAnimation();
