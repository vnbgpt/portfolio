const y = new Date().getFullYear();
document.getElementById("year").textContent = y;
document.getElementById("year2").textContent = y;

const btsLink = document.getElementById("btsLink");
const btsSub  = document.getElementById("btsSub");
const chev    = btsLink.querySelector(".chev");

function setBts(open){
  btsSub.classList.toggle("open", open);
  btsLink.setAttribute("aria-expanded", open ? "true" : "false");
  btsSub.setAttribute("aria-hidden", open ? "false" : "true");
  chev.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
}
function toggleBts(){ setBts(!btsSub.classList.contains("open")); }
setBts(false);

btsLink.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.getElementById("bts");
  if(target) target.scrollIntoView({ behavior: "smooth" });
  toggleBts();
});

const menuLinks = Array.from(document.querySelectorAll('.menu a.nav-link[href^="#"]'));
function setActive(id){
  menuLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
}

menuLinks.forEach(a => {
  if(a.id === "btsLink") return;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if(!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    setActive(id);

    if(id === "sisr" || id === "slam") setBts(true);
  });
});

const sections = Array.from(document.querySelectorAll(".section"));
window.addEventListener("scroll", () => {
  let current = "accueil";
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= window.innerHeight * 0.45) current = sec.id;
  });
  setActive(current);
  const insideBts = (current === "bts" || current === "sisr" || current === "slam");
  setBts(insideBts);
});

const spot = document.getElementById("spot");
window.addEventListener("mousemove", (e) => {
  spot.style.opacity = "1";
  spot.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 52}px)`;
}, { passive:true });

window.addEventListener("mouseleave", () => {
  spot.style.opacity = "0";
});

const themeToggle = document.getElementById("themeToggle");
const themeLabel  = document.getElementById("themeLabel");

function applyTheme(mode){
  const isLight = mode === "light";
  document.body.classList.toggle("light", isLight);
  themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
  themeLabel.textContent = isLight ? "Light" : "Dark";
  localStorage.setItem("theme", mode);
}
const saved = localStorage.getItem("theme");
applyTheme(saved === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});