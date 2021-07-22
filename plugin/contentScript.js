const recipe = {
  name: "",
  url: "",
  ingridients: {},
  description: {},
  time: "",
  temperature: ""
};

// TODO <meta og:*/> tags

let currentMode = undefined;

const div = document.createElement("div");
div.setAttribute("id", "scrapperToolbar");

div.appendChild(createButton("Ingridients", "ingridients"));
div.appendChild(createButton("Description", "description"));

document.body.appendChild(div);

function createButton(name, mode, fn) {
  const btn = document.createElement("input");
  btn.setAttribute("id", "scrapper"+name);
  btn.setAttribute("type", "radio");
  btn.setAttribute("name", "mode");
  btn.setAttribute("value", name);
  btn.innerText = name;
  btn.addEventListener('click', function(e) {
    currentMode = mode;
  });
  const label = document.createElement("label");
  label.setAttribute("for", "scrapper"+name);
  label.innerText = name;

  const div = document.createElement("div");
  div.appendChild(btn);
  div.appendChild(label);
  return div;
}

function addTag(elem, mode, idx) {
  const div = document.createElement("div");
  div.setAttribute("class", "scrapperTag");
  div.setAttribute("scrapperTag", "true");
  div.innerText = mode;
  const x = document.createElement("div");
  x.innerText = "x";
  div.addEventListener("click", (e) => {
    delete recipe[mode][idx];
    const el = document.querySelector(`[${mode}="${idx}"]`);
    el.classList.remove("scrapperSelected");
    el.removeAttribute("visitedByScrapper");
    el.removeAttribute(mode);
    el.removeChild(div);
  });
  // div.appendChild(x);
  elem.appendChild(div);

  elem.setAttribute("visitedByScrapper", true);
  elem.setAttribute(currentMode, idx);
}

// TODO try using Chrome's "copy JS path" document.querySelector("#recipe-instructions > ol:nth-child(6) > li:nth-child(1)")
// ----
const scrapperIdx = {
  ingridients: 0,
  description: 0
};

document.addEventListener('mouseover', function(e) {
  const t = e.target;
  if (t.getAttribute("id") === "overlay" ||
      t.getAttribute("id") === "scrapperToolbar" ||
      t.getAttribute("visitedByScrapper") ||
      t.getAttribute("scrapperTag")
  ) {
    return;
  }


  t.classList.add("scrapperBorder");
  t.classList.add("scrapperOverlay");
});

document.addEventListener('mouseout', function(e) {
  const t = e.target;
  t.classList.remove("scrapperBorder");
  t.classList.remove("scrapperOverlay");
});

document.addEventListener('mousedown', function(e) {
  const src = e.srcElement;
  if (src.getAttribute("id") === "scrapperToolbar" ||
      src.getAttribute("visitedByScrapper") ||
      src.getAttribute("scrapperTag")
  ) {
    return;
  }
  if (currentMode === undefined) {
    return;
  }

  const el = e.target;
  const idx = scrapperIdx[currentMode];

  switch (currentMode) {
  case "ingridients":
      recipe.ingridients[idx] = el.innerText;
      break;
  case "description":
      recipe.description[idx] += el.innerText;
      break;
  }

  el.classList.add("scrapperSelected");
  addTag(el, currentMode, idx);
  scrapperIdx[currentMode] += 1;

  // TODO also have a look at e.path
  // const path = getFirstParentWithId(el);
  // const query = path.reverse().join(" > ");
  // console.log(e.textContent, e.innerText);
  // console.log(el.innerText, el.textContent);

  // const elems = document.querySelectorAll(query);
  // elems.forEach((e) => {e.style.backgroundColor = 'orange'});

  console.log("recipe", recipe);
})

function getFirstParentWithId(element, acc = []) {
  // TODO this has to return path instead of parent

  if (!element) {
    console.error("I have reached the bottom");
    return acc;
  }
  const id = element.getAttribute("id");
  if (id) {
    acc.push("#" + id);
    console.log("found", element, acc);
    return acc;
  } else {
    // TODO after impl of children count, remove class
    const cls = element.getAttribute("class");
    if (cls) {
      acc.push(`${element.nodeName}[class='${cls}']`);
    } else {
      acc.push(element.nodeName);
    }
    const parent = element.parentElement;
    // parent.getChildren(). TODO count children if element.nodeName == curr then add element.nodeName:nth-child(x)
    return getFirstParentWithId(parent, acc);
  }
}
