const tabs = document.querySelector(".tabs");
const tabElement = document.querySelectorAll(".tab");
const tabsContent = document.querySelectorAll(".tabs__content--info");
const tabCard = document.querySelectorAll(".tab__card");
const cardBtns = document.querySelectorAll(
  ".tab__card:hover.tab__card--hero-btns"
);

// console.log(tabsRunning);

// console.log(tabsContent);
const handleClick = (e) => {
  const clicked = e.target.dataset.tab;
  console.log(clicked);
  if (!clicked) return;
  tabsContent.forEach((tab) => tab.classList.add("hidden"));
  tabElement.forEach((el) => el.classList.remove("active"));

  const tab = document.querySelector(`.tabs__content--${clicked}`);
  const tabClicked = document.querySelector(`button[data-tab='${clicked}']`);
  tabClicked.classList.add("active");
  console.log(tabClicked);

  tab.classList.remove("hidden");

  // console.log(tab);
};

const tabHover = (e) => {
  const tabBtns = e.target.querySelector(".tab__card--hero-btns ");
  tabBtns.classList.remove("hidden");
  // console.log(tabBtns);
};
const tabOut = (e) => {
  const tabBtns = e.target.querySelector(".tab__card--hero-btns ");
  tabBtns.classList.add("hidden");
  // console.log(tabBtns);
  console.log(e);
};
tabs.addEventListener("click", handleClick);
tabCard.forEach((card) => card.addEventListener("mouseenter", tabHover));
tabCard.forEach((card) => card.addEventListener("mouseleave", tabOut));

///////////////// SLIDER JS///////////////////////////////////////

const card = document.querySelectorAll(".collections__items--card");
const collectionItems = document.querySelector(".collections__items");
const btnLeft = document.querySelector(".btn__left");
const btnRight = document.querySelector(".btn__right");
let count = 0;
let distance;

const handleLeftClick = () => {
  if (count > 0 && count <= card.length / 2) {
    distance = (count - 1) * 400;
    collectionItems.style.transform = `translateX(-${distance}px)`;
    count--;
  }
};
const handleRightClick = () => {
  if (count < card.length / 2) {
    distance = (count + 1) * 400;
    collectionItems.style.transform = `translateX(-${distance}px)`;
    count++;
  }
};

btnLeft.addEventListener("click", handleLeftClick);
btnRight.addEventListener("click", handleRightClick);