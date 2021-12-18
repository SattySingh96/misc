window.addEventListener("keydown", function (event) {
  //console.log("yee");
  if (event.key === " ") {
    event.preventDefault();
    for (let i = 0, l = character.detection.length; i < l; i++) {
      console.log();
      let location = map[character.detection[i].x][character.detection[i].y];
      switch (character.detection[i].object) {
        case "berry":
          inv.berry += getRandomInt(4) + 1;
          inv.sticks += getRandomInt(2) + 3;
          inv.leafes += getRandomInt(3) + 1;
          location[0].ref.parentNode.removeChild(location[0].ref);
          location.length = 0;
          updateInventory();
          break;
        case "tree":
          if (inv.axt === true) {
            inv.wood += getRandomInt(4) + 2;
            inv.sticks += getRandomInt(6) + 3;
            inv.leafes += getRandomInt(20) + 10;
            location[0].ref.parentNode.removeChild(location[0].ref);
            location.length = 0;
          }
          updateInventory();
          break;
        case "base":
          if (inv.wood >= 50 && inv.sticks >= 100 && inv.leafes >= 50 && inv.stone >= 10 && baseDone === false) {
            inv.wood += getRandomInt(4) + 2;
            inv.sticks += getRandomInt(6) + 3;
            inv.leafes += getRandomInt(20) + 10;
            location[0].ref.style.transform = "translate(-50%, -40%)";
            location[0].ref.children[0].src =
              "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f828a34998cfc61d84c88e_base.png";
            alert("press n to sleep!");
            disablekey();
            baseDone = true;
          } else if (baseDone === true) {
            game.style.filter = "brightness(15%) contrast(90%) saturate(15%)";
            alert("press n to sleep!");
            disablekey();
          } else {
            alert("you need more resources!");
            disablekey();
          }
          updateInventory();
          break;
        case "shop":
          this.window.location.replace("https://www.google.com")
          break;
      }
      console.log(inv);
    }
  }

  function updateInventory() {
    document.getElementById("woodcount").textContent = inv.wood;
    document.getElementById("stickscount").textContent = inv.sticks;
    document.getElementById("fishcount").textContent = inv.fish;
    document.getElementById("stonecount").textContent = inv.stone;
    document.getElementById("leafescount").textContent = inv.leafes;
    document.getElementById("berrycount").textContent = inv.berry;
    if (inv.axt === true) {
      document.getElementById("axt").style.opacity = "1";
    }
    if (inv.spear === true) {
      document.getElementById("spear").style.opacity = "1";
    }
  }

  if (event.key === "n" && baseDone === true) {
    document.getElementById("end").click();
    setTimeout(function () {
      window.location.href = "day2.html";
    });
  }

  console.log("keydown");
  interface.keydown[event.key] = true;
  if (false) console.log("ye");
});

function disablekey() {
  interface.keydown["f"] = false;
  interface.keydown["d"] = false;
  interface.keydown["s"] = false;
  interface.keydown["a"] = false;
  interface.keydown[" "] = false;
}

document.getElementById("craftSpear").addEventListener("click", function () {
  if (inv.stone >= 2 && inv.sticks >= 4 && inv.spear === false) {
    inv.stone = inv.stone - 2;
    inv.sticks = inv.sticks - 4;
    inv.spear = true;
    updateInventory();
    document.getElementById("spear").style.opacity = "1";
    game.style.filter = "brightness(55%) contrast(95%) saturate(55%)";
  } else if (inv.spear === false) {
    alert("not enough resources");
    disablekey();
  } else {
    alert("you already have it");
    disablekey();
  }
});
document.getElementById("craftAxt").addEventListener("click", function () {
  if (inv.stone >= 10 && inv.sticks >= 2 && inv.axt === false) {
    inv.stone = inv.stone - 10;
    inv.sticks = inv.sticks - 2;
    inv.axt = true;
    updateInventory();
    document.getElementById("axt").style.opacity = "1";
  } else if (inv.axt === false) {
    alert("not enough resources");
    disablekey();
  } else {
    alert("you already have it");
    disablekey();
  }
});

/*
    const menu = document.getElementById("go").parentElement.parentElement;
    menu.addEventListener("click", function () {
      setTimeout(function () {
        menu.style.display = "none";
      }, 500);
      menu.style.opacity = "0";
    });
    */

Array.prototype.remove = function (index) {
  this.splice(index, 1);
};

const berryTemplate = document.getElementById("berry");
console.log(berryTemplate);

let baseDone = false;

let inv = {
  wood: 0,
  sticks: 0,
  fish: 0,
  stone: 25,
  leafes: 0,
  berry: 0,
  spear: false,
  axt: false,
};

const game = document.getElementById("game");

const collect = document.getElementById("collect");
console.log(collect);

const shop = document.getElementById("shop");
console.log(shop)

window.addEventListener("keyup", function (event) {
  // console.log(event);
  interface.keydown[event.key] = false;
});

let config = {
  movementspeed: 3,
  fps: 60,
};

// 0 - 120
let map = [];
let tick = 0;
// each row has 0 - 32

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function mapInit() {
  console.log("initialising map")
  for (let i = 0; i < 120; i++) {
    map.push([]);
    for (let i2 = 0; i2 < 35; i2++) {
      map[i].push([]);
    }
  }
  console.log(map[0][0]);
  for (let i = 0; i < 35; i++) {
    map[0][i].push({ path: "blocked", object: "block" });
    map[119][i].push({ path: "blocked", object: "block" });
  }
  for (let i = 1; i < 119; i++) {
    map[i][0].push({ path: "blocked", object: "block" });
    map[i][32].push({ path: "blocked", object: "block" });
  }
  for (let i = 0, l = mapObj.length; i < l; i++) {
    // map[mapObj[i].x][mapObj[i].y].push({ path: "blocked" });
    if (mapObj[i].object !== undefined) {
      let transform = "translate(-50%, -50%)";
      switch (mapObj[i].object) {
        case "block":
          map[mapObj[i].x][mapObj[i].y].push({ path: mapObj[i].path });
          break;
        case "berry":
          let berry = berryTemplate.cloneNode("true");
          let variants = [
            "https://uploads-ssl.webflow.com/61b947a5cf42f024c5b17762/61b94b372f9af5d227d92c47_Untitled_design__4_-removebg-preview.png",
            "https://uploads-ssl.webflow.com/61b947a5cf42f024c5b17762/61b94b372f9af5d227d92c47_Untitled_design__4_-removebg-preview.png",
          ];
          berry.children[0].src = variants[getRandomInt(2)];

          if (getRandomInt(2) === 1) {
            transform += "rotate3d(0, 1, 0, 180deg)";
            map[mapObj[i].x][mapObj[i].y].push({
              path: mapObj[i].path,
              object: mapObj[i].object,
              ref: berry,
              mirrow: true,
              x: mapObj[i].x,
              y: mapObj[i].y,
            });
          } else {
            map[mapObj[i].x][mapObj[i].y].push({
              path: mapObj[i].path,
              object: mapObj[i].object,
              ref: berry,
              x: mapObj[i].x,
              y: mapObj[i].y,
            });
          }

          berry.style.top = (mapObj[i].y + 1) * 32 + 16 + getRandomInt(17) + "px";
          berry.style.left = mapObj[i].x * 32 + 8 + getRandomInt(17) + "px";

          // randomize
          transform += " scale(" + (Math.random() * (0.9 - 0.5) + 0.5).toFixed(2) + ")";
          berry.style.zIndex = [mapObj[i].y];

          berry.setAttribute("coords", [mapObj[i].x] + " " + [mapObj[i].y]); // easier to debug
          berry.style.transform = transform;
          // end

          game.appendChild(berry);
          break;
        case "tree":
          let tree = document.getElementById("tree").cloneNode("true");
          tree.children[0].removeAttribute("loading");
          let variantList = {
            tree1: "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f80886866b4f08cce8ca86_tree1.png",
            tree2: "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808868321193b4080090d_tree2.png",
            tree3: "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808861794b0cbd950c0a9_tree3.png",
            tree4: "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f80886bf063428b47b5692_tree4.png",
          };
          tree.children[0].src = variantList[mapObj[i].variant];

          tree.style.top = (mapObj[i].y + 1) * 32 + 8 + getRandomInt(17) + "px";
          tree.style.left = mapObj[i].x * 32 + 8 + getRandomInt(17) + "px";

          // randomize

          transform = "translate(-50%, -60%)";
          transform += " scale(" + (Math.random() * (1.2 - 0.5) + 0.5).toFixed(2) + ")";
          tree.style.zIndex = [mapObj[i].y];

          if (getRandomInt(2) === 1) {
            transform += "rotate3d(0, 1, 0, 180deg)";
            console.log("a");
            map[mapObj[i].x][mapObj[i].y].push({
              path: mapObj[i].path,
              mirrow: true,
              object: mapObj[i].object,
              ref: tree,
              x: mapObj[i].x,
              y: mapObj[i].y,
            });
          } else {
            map[mapObj[i].x][mapObj[i].y].push({
              path: mapObj[i].path,
              object: mapObj[i].object,
              ref: tree,
              x: mapObj[i].x,
              y: mapObj[i].y,
            });
          }

          tree.setAttribute("coords", [mapObj[i].x] + " " + [mapObj[i].y]); // easier to debug
          tree.style.transform = transform;
          // end

          game.appendChild(tree);
          /* map[mapObj[i].x + 1][mapObj[i].y].push({ path: mapObj[i].path });
              map[mapObj[i].x + 1][mapObj[i].y + 1].push({ path: mapObj[i].path });
              map[mapObj[i].x][mapObj[i].y + 1].push({ path: mapObj[i].path });
    */
          break;
        case "base":
          transform = "translate(-50%, -80%)";
          let base = document.getElementById("base").cloneNode("true");
          base.children[0].removeAttribute("loading");
          base.children[0].src =
            "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f822a46540bacd85593878_Group%20344.png";

          map[mapObj[i].x][mapObj[i].y].push({
            path: mapObj[i].path,
            object: mapObj[i].object,
            ref: base,
            x: mapObj[i].x,
            y: mapObj[i].y,
          });

          base.style.top = (mapObj[i].y + 1) * 32 + "px";
          base.style.left = mapObj[i].x * 32 + "px";

          base.style.zIndex = [mapObj[i].y];

          base.setAttribute("coords", [mapObj[i].x] + " " + [mapObj[i].y]); // easier to debug
          base.style.transform = transform;
          // end
          console.log(base);
          game.appendChild(base);
          break;
        case "shop":
          console.log("in shop map init")
          let shop = document.getElementById("shop").cloneNode("true");
          
          shop.children[0].removeAttribute("loading");
          shop.children[0].src = "https://uploads-ssl.webflow.com/61b947a5cf42f024c5b17762/61b947a5cf42f0f444b177a0_np_home_671841_000000.png";

          map[mapObj[i].x][mapObj[i].y].push({
            path: mapObj[i].path,
            object: mapObj[i].object,
            ref: shop,
            x: mapObj[i].x,
            y: mapObj[i].y,
          });

          shop.style.top = (mapObj[i].y + 1) * 32 + 16 + getRandomInt(17) + "px";
          shop.style.left = mapObj[i].x * 32 + 8 + getRandomInt(17) + "px";

          // randomize
          transform += " scale(" + (Math.random() * (0.9 - 0.5) + 0.5).toFixed(2) + ")";
          shop.style.zIndex = [mapObj[i].y];

          shop.setAttribute("coords", [mapObj[i].x] + " " + [mapObj[i].y]); // easier to debug
          shop.style.transform = transform;
          // end

          game.appendChild(shop);
      }
    }
  }

  console.log(map);
}

// { x: 1, y: 1, path: "blocked" }

mapObj = [
  { x: 7, y: 1, path: "blocked", object: "block" },
  { x: 7, y: 2, path: "blocked", object: "block" },
  { x: 6, y: 2, path: "blocked", object: "block" },
  { x: 6, y: 3, path: "blocked", object: "block" },
  { x: 5, y: 3, path: "blocked", object: "block" },
  { x: 5, y: 4, path: "blocked", object: "block" },
  { x: 6, y: 4, path: "blocked", object: "block" },
  { x: 7, y: 4, path: "blocked", object: "block" },
  { x: 8, y: 4, path: "blocked", object: "block" },
  { x: 9, y: 4, path: "blocked", object: "block" },
  { x: 10, y: 4, path: "blocked", object: "block" },
  { x: 11, y: 4, path: "blocked", object: "block" },
  { x: 12, y: 4, path: "blocked", object: "block" },
  { x: 13, y: 3, path: "blocked", object: "block" },
  { x: 14, y: 3, path: "blocked", object: "block" },
  { x: 15, y: 2, path: "blocked", object: "block" },
  { x: 16, y: 2, path: "blocked", object: "block" },
  { x: 17, y: 1, path: "blocked", object: "block" },
  { x: 12, y: 6, path: "blocked", object: "block" },
  { x: 13, y: 6, path: "blocked", object: "block" },
  { x: 12, y: 8, path: "blocked", object: "block" },
  { x: 13, y: 8, path: "blocked", object: "block" },
  { x: 26, y: 2, path: "blocked", object: "block" },
  { x: 26, y: 3, path: "blocked", object: "block" },
  { x: 25, y: 3, path: "blocked", object: "block" },
  { x: 24, y: 4, path: "blocked", object: "block" },
  { x: 25, y: 4, path: "blocked", object: "block" },
  { x: 26, y: 4, path: "blocked", object: "block" },
  { x: 26, y: 2, path: "blocked", object: "block" },
  { x: 27, y: 1, path: "blocked", object: "block" },
  { x: 27, y: 5, path: "blocked", object: "block" },
  { x: 28, y: 5, path: "blocked", object: "block" },
  { x: 29, y: 6, path: "blocked", object: "block" },
  { x: 28, y: 6, path: "blocked", object: "block" },
  { x: 30, y: 6, path: "blocked", object: "block" },
  { x: 30, y: 7, path: "blocked", object: "block" },
  { x: 31, y: 7, path: "blocked", object: "block" },
  { x: 32, y: 7, path: "blocked", object: "block" },
  { x: 32, y: 8, path: "blocked", object: "block" },
  { x: 33, y: 8, path: "blocked", object: "block" },
  { x: 34, y: 8, path: "blocked", object: "block" },
  { x: 35, y: 8, path: "blocked", object: "block" },
  { x: 36, y: 7, path: "blocked", object: "block" },
  { x: 37, y: 7, path: "blocked", object: "block" },
  { x: 38, y: 7, path: "blocked", object: "block" },
  { x: 39, y: 7, path: "blocked", object: "block" },
  { x: 39, y: 6, path: "blocked", object: "block" },
  { x: 40, y: 5, path: "blocked", object: "block" },
  { x: 41, y: 5, path: "blocked", object: "block" },
  { x: 42, y: 6, path: "blocked", object: "block" },
  { x: 43, y: 6, path: "blocked", object: "block" },
  { x: 44, y: 5, path: "blocked", object: "block" },
  { x: 45, y: 6, path: "blocked", object: "block" },
  { x: 46, y: 6, path: "blocked", object: "block" },
  { x: 47, y: 6, path: "blocked", object: "block" },
  { x: 48, y: 6, path: "blocked", object: "block" },
  { x: 49, y: 5, path: "blocked", object: "block" },
  { x: 50, y: 5, path: "blocked", object: "block" },
  { x: 51, y: 5, path: "blocked", object: "block" },
  { x: 50, y: 4, path: "blocked", object: "block" },
  { x: 51, y: 4, path: "blocked", object: "block" },
  { x: 49, y: 4, path: "blocked", object: "block" },
  { x: 48, y: 4, path: "blocked", object: "block" },
  { x: 47, y: 4, path: "blocked", object: "block" },
  { x: 46, y: 3, path: "blocked", object: "block" },
  { x: 45, y: 2, path: "blocked", object: "block" },
  { x: 45, y: 1, path: "blocked", object: "block" },
  { x: 46, y: 1, path: "blocked", object: "block" },
  { x: 47, y: 1, path: "blocked", object: "block" },
  { x: 48, y: 1, path: "blocked", object: "block" },
  { x: 49, y: 1, path: "blocked", object: "block" },
  { x: 50, y: 1, path: "blocked", object: "block" },
  { x: 51, y: 1, path: "blocked", object: "block" },
  { x: 52, y: 1, path: "blocked", object: "block" },
  { x: 53, y: 1, path: "blocked", object: "block" },
  { x: 54, y: 1, path: "blocked", object: "block" },
  { x: 55, y: 1, path: "blocked", object: "block" },
  { x: 56, y: 1, path: "blocked", object: "block" },
  { x: 57, y: 0, path: "blocked", object: "block" },
  { x: 58, y: 0, path: "blocked", object: "block" },
  { x: 86, y: 1, path: "blocked", object: "block" },
  { x: 87, y: 1, path: "blocked", object: "block" },
  { x: 88, y: 2, path: "blocked", object: "block" },
  { x: 88, y: 3, path: "blocked", object: "block" },
  { x: 89, y: 3, path: "blocked", object: "block" },
  { x: 90, y: 3, path: "blocked", object: "block" },
  { x: 91, y: 3, path: "blocked", object: "block" },
  { x: 92, y: 2, path: "blocked", object: "block" },
  { x: 90, y: 4, path: "blocked", object: "block" },
  { x: 90, y: 3, path: "blocked", object: "block" },
  { x: 95, y: 1, path: "blocked", object: "block" },
  { x: 96, y: 1, path: "blocked", object: "block" },
  { x: 84, y: 4, path: "blocked", object: "block" },
  { x: 85, y: 4, path: "blocked", object: "block" },
  { x: 86, y: 4, path: "blocked", object: "block" },
  { x: 84, y: 5, path: "blocked", object: "block" },
  { x: 85, y: 5, path: "blocked", object: "block" },
  { x: 86, y: 5, path: "blocked", object: "block" },
  { x: 87, y: 5, path: "blocked", object: "block" },
  { x: 88, y: 5, path: "blocked", object: "block" },
  { x: 89, y: 5, path: "blocked", object: "block" },
  { x: 90, y: 5, path: "blocked", object: "block" },
  { x: 91, y: 5, path: "blocked", object: "block" },
  { x: 92, y: 5, path: "blocked", object: "block" },
  { x: 92, y: 4, path: "blocked", object: "block" },
  { x: 91, y: 4, path: "blocked", object: "block" },
  { x: 90, y: 3, path: "blocked", object: "block" },
  { x: 91, y: 3, path: "blocked", object: "block" },
  { x: 95, y: 1, path: "blocked", object: "block" },
  { x: 94, y: 1, path: "blocked", object: "block" },
  { x: 93, y: 2, path: "blocked", object: "block" },
  { x: 107, y: 0, path: "blocked", object: "block" },
  { x: 108, y: 0, path: "blocked", object: "block" },
  { x: 109, y: 0, path: "blocked", object: "block" },
  { x: 110, y: 1, path: "blocked", object: "block" },
  { x: 111, y: 1, path: "blocked", object: "block" },
  { x: 112, y: 1, path: "blocked", object: "block" },
  { x: 113, y: 2, path: "blocked", object: "block" },
  { x: 114, y: 2, path: "blocked", object: "block" },
  { x: 115, y: 2, path: "blocked", object: "block" },
  { x: 116, y: 3, path: "blocked", object: "block" },
  { x: 117, y: 4, path: "blocked", object: "block" },
  { x: 118, y: 5, path: "blocked", object: "block" },
  { x: 118, y: 6, path: "blocked", object: "block" },
  { x: 118, y: 7, path: "blocked", object: "block" },
  { x: 118, y: 8, path: "blocked", object: "block" },
  { x: 119, y: 9, path: "blocked", object: "block" },
  { x: 118, y: 10, path: "blocked", object: "block" },
  { x: 118, y: 11, path: "blocked", object: "block" },
  { x: 118, y: 12, path: "blocked", object: "block" },
  { x: 118, y: 13, path: "blocked", object: "block" },
  { x: 118, y: 14, path: "blocked", object: "block" },
  { x: 118, y: 15, path: "blocked", object: "block" },
  { x: 118, y: 16, path: "blocked", object: "block" },
  { x: 118, y: 17, path: "blocked", object: "block" },
  { x: 118, y: 18, path: "blocked", object: "block" },
  { x: 118, y: 19, path: "blocked", object: "block" },
  { x: 118, y: 20, path: "blocked", object: "block" },
  { x: 118, y: 21, path: "blocked", object: "block" },
  { x: 118, y: 22, path: "blocked", object: "block" },
  { x: 118, y: 23, path: "blocked", object: "block" },
  { x: 118, y: 24, path: "blocked", object: "block" },
  { x: 118, y: 25, path: "blocked", object: "block" },
  { x: 118, y: 26, path: "blocked", object: "block" },
  { x: 118, y: 27, path: "blocked", object: "block" },
  { x: 118, y: 27, path: "blocked", object: "block" },
  { x: 118, y: 28, path: "blocked", object: "block" },
  { x: 118, y: 28, path: "blocked", object: "block" },
  { x: 117, y: 29, path: "blocked", object: "block" },
  { x: 116, y: 29, path: "blocked", object: "block" },
  { x: 115, y: 30, path: "blocked", object: "block" },
  { x: 114, y: 30, path: "blocked", object: "block" },
  { x: 113, y: 30, path: "blocked", object: "block" },
  { x: 112, y: 31, path: "blocked", object: "block" },
  { x: 111, y: 32, path: "blocked", object: "block" },
  { x: 110, y: 32, path: "blocked", object: "block" },
  { x: 107, y: 31, path: "blocked", object: "block" },
  { x: 106, y: 31, path: "blocked", object: "block" },
  { x: 105, y: 31, path: "blocked", object: "block" },
  { x: 104, y: 31, path: "blocked", object: "block" },
  { x: 103, y: 31, path: "blocked", object: "block" },
  { x: 102, y: 31, path: "blocked", object: "block" },
  { x: 101, y: 31, path: "blocked", object: "block" },
  { x: 100, y: 31, path: "blocked", object: "block" },
  { x: 99, y: 31, path: "blocked", object: "block" },
  { x: 98, y: 30, path: "blocked", object: "block" },
  { x: 97, y: 29, path: "blocked", object: "block" },
  { x: 97, y: 28, path: "blocked", object: "block" },
  { x: 97, y: 27, path: "blocked", object: "block" },
  { x: 97, y: 26, path: "blocked", object: "block" },
  { x: 97, y: 25, path: "blocked", object: "block" },
  { x: 98, y: 25, path: "blocked", object: "block" },
  { x: 98, y: 24, path: "blocked", object: "block" },
  { x: 99, y: 23, path: "blocked", object: "block" },
  { x: 99, y: 22, path: "blocked", object: "block" },
  { x: 99, y: 21, path: "blocked", object: "block" },
  { x: 99, y: 20, path: "blocked", object: "block" },
  { x: 98, y: 19, path: "blocked", object: "block" },
  { x: 98, y: 18, path: "blocked", object: "block" },
  { x: 98, y: 17, path: "blocked", object: "block" },
  { x: 97, y: 16, path: "blocked", object: "block" },
  { x: 96, y: 15, path: "blocked", object: "block" },
  { x: 95, y: 15, path: "blocked", object: "block" },
  { x: 94, y: 14, path: "blocked", object: "block" },
  { x: 93, y: 13, path: "blocked", object: "block" },
  { x: 92, y: 13, path: "blocked", object: "block" },
  { x: 91, y: 13, path: "blocked", object: "block" },
  { x: 90, y: 13, path: "blocked", object: "block" },
  { x: 89, y: 13, path: "blocked", object: "block" },
  { x: 88, y: 14, path: "blocked", object: "block" },
  { x: 87, y: 15, path: "blocked", object: "block" },
  { x: 86, y: 15, path: "blocked", object: "block" },
  { x: 85, y: 15, path: "blocked", object: "block" },
  { x: 84, y: 15, path: "blocked", object: "block" },
  { x: 83, y: 15, path: "blocked", object: "block" },
  { x: 82, y: 16, path: "blocked", object: "block" },
  { x: 81, y: 16, path: "blocked", object: "block" },
  { x: 80, y: 15, path: "blocked", object: "block" },
  { x: 79, y: 15, path: "blocked", object: "block" },
  { x: 78, y: 14, path: "blocked", object: "block" },
  { x: 77, y: 14, path: "blocked", object: "block" },
  { x: 76, y: 14, path: "blocked", object: "block" },
  { x: 75, y: 14, path: "blocked", object: "block" },
  { x: 74, y: 14, path: "blocked", object: "block" },
  { x: 74, y: 15, path: "blocked", object: "block" },
  { x: 74, y: 16, path: "blocked", object: "block" },
  { x: 74, y: 17, path: "blocked", object: "block" },
  { x: 74, y: 18, path: "blocked", object: "block" },
  { x: 74, y: 19, path: "blocked", object: "block" },
  { x: 74, y: 20, path: "blocked", object: "block" },
  { x: 75, y: 21, path: "blocked", object: "block" },
  { x: 76, y: 21, path: "blocked", object: "block" },
  { x: 77, y: 21, path: "blocked", object: "block" },
  { x: 78, y: 22, path: "blocked", object: "block" },
  { x: 79, y: 22, path: "blocked", object: "block" },
  { x: 79, y: 23, path: "blocked", object: "block" },
  { x: 79, y: 24, path: "blocked", object: "block" },
  { x: 79, y: 25, path: "blocked", object: "block" },
  { x: 79, y: 26, path: "blocked", object: "block" },
  { x: 79, y: 27, path: "blocked", object: "block" },
  { x: 79, y: 28, path: "blocked", object: "block" },
  { x: 79, y: 29, path: "blocked", object: "block" },
  { x: 78, y: 30, path: "blocked", object: "block" },
  { x: 77, y: 31, path: "blocked", object: "block" },
  { x: 70, y: 31, path: "blocked", object: "block" },
  { x: 69, y: 31, path: "blocked", object: "block" },
  { x: 68, y: 30, path: "blocked", object: "block" },
  { x: 67, y: 29, path: "blocked", object: "block" },
  { x: 66, y: 29, path: "blocked", object: "block" },
  { x: 65, y: 29, path: "blocked", object: "block" },
  { x: 64, y: 30, path: "blocked", object: "block" },
  { x: 63, y: 30, path: "blocked", object: "block" },
  { x: 62, y: 31, path: "blocked", object: "block" },
  { x: 60, y: 31, path: "blocked", object: "block" },
  { x: 59, y: 30, path: "blocked", object: "block" },
  { x: 58, y: 29, path: "blocked", object: "block" },
  { x: 57, y: 29, path: "blocked", object: "block" },
  { x: 56, y: 29, path: "blocked", object: "block" },
  { x: 55, y: 29, path: "blocked", object: "block" },
  { x: 54, y: 29, path: "blocked", object: "block" },
  { x: 53, y: 29, path: "blocked", object: "block" },
  { x: 52, y: 29, path: "blocked", object: "block" },
  { x: 51, y: 29, path: "blocked", object: "block" },
  { x: 50, y: 29, path: "blocked", object: "block" },
  { x: 49, y: 29, path: "blocked", object: "block" },
  { x: 48, y: 29, path: "blocked", object: "block" },
  { x: 47, y: 29, path: "blocked", object: "block" },
  { x: 46, y: 30, path: "blocked", object: "block" },
  { x: 45, y: 31, path: "blocked", object: "block" },
  { x: 44, y: 31, path: "blocked", object: "block" },
  { x: 43, y: 31, path: "blocked", object: "block" },
  { x: 42, y: 31, path: "blocked", object: "block" },
  { x: 41, y: 31, path: "blocked", object: "block" },
  { x: 40, y: 30, path: "blocked", object: "block" },
  { x: 39, y: 29, path: "blocked", object: "block" },
  { x: 38, y: 29, path: "blocked", object: "block" },
  { x: 37, y: 29, path: "blocked", object: "block" },
  { x: 36, y: 29, path: "blocked", object: "block" },
  { x: 35, y: 29, path: "blocked", object: "block" },
  { x: 34, y: 29, path: "blocked", object: "block" },
  { x: 33, y: 29, path: "blocked", object: "block" },
  { x: 32, y: 29, path: "blocked", object: "block" },
  { x: 31, y: 30, path: "blocked", object: "block" },
  { x: 30, y: 30, path: "blocked", object: "block" },
  { x: 29, y: 30, path: "blocked", object: "block" },
  { x: 28, y: 30, path: "blocked", object: "block" },
  { x: 27, y: 30, path: "blocked", object: "block" },
  { x: 26, y: 30, path: "blocked", object: "block" },
  { x: 25, y: 31, path: "blocked", object: "block" },
  { x: 24, y: 31, path: "blocked", object: "block" },
  { x: 23, y: 31, path: "blocked", object: "block" },
  { x: 22, y: 31, path: "blocked", object: "block" },
  { x: 21, y: 31, path: "blocked", object: "block" },
  { x: 20, y: 31, path: "blocked", object: "block" },
  { x: 19, y: 31, path: "blocked", object: "block" },
  { x: 18, y: 31, path: "blocked", object: "block" },
  { x: 17, y: 31, path: "blocked", object: "block" },
  { x: 16, y: 31, path: "blocked", object: "block" },
  { x: 15, y: 31, path: "blocked", object: "block" },
  { x: 14, y: 31, path: "blocked", object: "block" },
  { x: 13, y: 31, path: "blocked", object: "block" },
  { x: 12, y: 31, path: "blocked", object: "block" },
  { x: 11, y: 31, path: "blocked", object: "block" },
  { x: 10, y: 31, path: "blocked", object: "block" },
  { x: 9, y: 31, path: "blocked", object: "block" },
  { x: 8, y: 31, path: "blocked", object: "block" },
  { x: 7, y: 31, path: "blocked", object: "block" },
  { x: 6, y: 31, path: "blocked", object: "block" },
  { x: 5, y: 31, path: "blocked", object: "block" },
  { x: 4, y: 31, path: "blocked", object: "block" },
  { x: 3, y: 31, path: "blocked", object: "block" },
  { x: 2, y: 30, path: "blocked", object: "block" },
  { x: 1, y: 29, path: "blocked", object: "block" },
  { x: 1, y: 28, path: "blocked", object: "block" },
  { x: 1, y: 27, path: "blocked", object: "block" },
  //
  { x: 21, y: 14, path: "blocked", object: "block" },
  { x: 22, y: 14, path: "blocked", object: "block" },
  { x: 22, y: 15, path: "blocked", object: "block" },
  { x: 23, y: 15, path: "blocked", object: "block" },
  { x: 3, y: 23, path: "blocked", object: "block" },
  { x: 4, y: 23, path: "blocked", object: "block" },
  { x: 5, y: 23, path: "blocked", object: "block" },
  { x: 6, y: 23, path: "blocked", object: "block" },
  { x: 7, y: 23, path: "blocked", object: "block" },
  { x: 4, y: 24, path: "blocked", object: "block" },
  { x: 5, y: 24, path: "blocked", object: "block" },
  { x: 6, y: 24, path: "blocked", object: "block" },
  { x: 7, y: 24, path: "blocked", object: "block" },
  //
  { x: 10, y: 25, path: "blocked", object: "block" },
  { x: 11, y: 25, path: "blocked", object: "block" },
  { x: 12, y: 25, path: "blocked", object: "block" },
  { x: 11, y: 26, path: "blocked", object: "block" },
  { x: 12, y: 26, path: "blocked", object: "block" },
  { x: 13, y: 26, path: "blocked", object: "block" },
  { x: 15, y: 25, path: "blocked", object: "block" },
  { x: 16, y: 25, path: "blocked", object: "block" },
  { x: 17, y: 25, path: "blocked", object: "block" },
  { x: 18, y: 25, path: "blocked", object: "block" },
  { x: 18, y: 25, path: "blocked", object: "block" },
  { x: 19, y: 25, path: "blocked", object: "block" },
  { x: 20, y: 25, path: "blocked", object: "block" },
  { x: 21, y: 25, path: "blocked", object: "block" },
  { x: 20, y: 26, path: "blocked", object: "block" },
  { x: 21, y: 26, path: "blocked", object: "block" },
  { x: 18, y: 26, path: "blocked", object: "block" },
  { x: 19, y: 26, path: "blocked", object: "block" },
  //
  { x: 11, y: 28, path: "blocked", object: "block" },
  { x: 12, y: 28, path: "blocked", object: "block" },
  //
  { x: 17, y: 28, path: "blocked", object: "block" },
  { x: 18, y: 28, path: "blocked", object: "block" },
  //
  { x: 46, y: 26, path: "blocked", object: "block" },
  { x: 47, y: 26, path: "blocked", object: "block" },
  { x: 48, y: 26, path: "blocked", object: "block" },
  { x: 49, y: 26, path: "blocked", object: "block" },
  { x: 50, y: 26, path: "blocked", object: "block" },
  { x: 51, y: 26, path: "blocked", object: "block" },
  //

  { x: 57, y: 26, path: "blocked", object: "block" },
  { x: 58, y: 26, path: "blocked", object: "block" },
  { x: 59, y: 26, path: "blocked", object: "block" },
  //
  { x: 72, y: 21, path: "blocked", object: "block" },
  { x: 73, y: 21, path: "blocked", object: "block" },
  { x: 74, y: 21, path: "blocked", object: "block" },
  { x: 72, y: 22, path: "blocked", object: "block" },
  { x: 73, y: 22, path: "blocked", object: "block" },
  { x: 74, y: 22, path: "blocked", object: "block" },
  //
  { x: 52, y: 5, path: "blocked", object: "block" },
  { x: 53, y: 5, path: "blocked", object: "block" },
  { x: 54, y: 5, path: "blocked", object: "block" },
  { x: 53, y: 8, path: "blocked", object: "block" },
  { x: 54, y: 8, path: "blocked", object: "block" },
  { x: 55, y: 7, path: "blocked", object: "block" },
  { x: 56, y: 7, path: "blocked", object: "block" },
  { x: 57, y: 7, path: "blocked", object: "block" },
  { x: 58, y: 7, path: "blocked", object: "block" },
  { x: 59, y: 7, path: "blocked", object: "block" },
  { x: 55, y: 9, path: "blocked", object: "block" },
  { x: 56, y: 9, path: "blocked", object: "block" },
  { x: 57, y: 9, path: "blocked", object: "block" },
  { x: 58, y: 9, path: "blocked", object: "block" },
  { x: 59, y: 9, path: "blocked", object: "block" },
  { x: 59, y: 8, path: "blocked", object: "block" },
  //
  { x: 90, y: 7, path: "blocked", object: "block" },
  { x: 91, y: 7, path: "blocked", object: "block" },
  { x: 90, y: 8, path: "blocked", object: "block" },
  { x: 91, y: 8, path: "blocked", object: "block" },
  { x: 91, y: 8, path: "blocked", object: "block" },
  { x: 92, y: 8, path: "blocked", object: "block" },
  { x: 93, y: 8, path: "blocked", object: "block" },
  { x: 94, y: 8, path: "blocked", object: "block" },
  { x: 95, y: 8, path: "blocked", object: "block" },
  { x: 92, y: 9, path: "blocked", object: "block" },
  { x: 93, y: 9, path: "blocked", object: "block" },
  { x: 94, y: 9, path: "blocked", object: "block" },
  { x: 95, y: 9, path: "blocked", object: "block" },
  //
  { x: 96, y: 7, path: "blocked", object: "block" },
  { x: 97, y: 7, path: "blocked", object: "block" },
  { x: 98, y: 7, path: "blocked", object: "block" },

  { x: 90, y: 11, path: "blocked", object: "block" },
  { x: 91, y: 11, path: "blocked", object: "block" },
  { x: 92, y: 11, path: "blocked", object: "block" },
  //
  { x: 29, y: 10, path: "blocked", object: "block" },
  { x: 30, y: 10, path: "blocked", object: "block" },
  { x: 31, y: 10, path: "blocked", object: "block" },
  // BERRYS
  { x: 10, y: 8, path: "open", object: "berry" },
  { x: 5, y: 11, path: "open", object: "berry" },
  { x: 15, y: 9, path: "open", object: "berry" },
  { x: 5, y: 21, path: "open", object: "berry" },
  { x: 11, y: 20, path: "open", object: "berry" },
  { x: 22, y: 23, path: "open", object: "berry" },
  { x: 26, y: 26, path: "open", object: "berry" },
  { x: 37, y: 22, path: "open", object: "berry" },
  { x: 51, y: 23, path: "open", object: "berry" },
  { x: 18, y: 27, path: "open", object: "berry" },
  { x: 75, y: 22, path: "open", object: "berry" },
  { x: 105, y: 11, path: "open", object: "berry" },
  { x: 115, y: 12, path: "open", object: "berry" },
  { x: 68, y: 5, path: "open", object: "berry" },
  { x: 37, y: 13, path: "open", object: "berry" },
  { x: 41, y: 8, path: "open", object: "berry" },
  { x: 57, y: 18, path: "open", object: "berry" },
  { x: 110, y: 28, path: "open", object: "berry" },
  //SHOP
  { x: 72, y: 6, path: "blocked", object: "shop"},
  // TREES
  { x: 6, y: 6, path: "blocked", object: "tree", variant: "tree1" },
  { x: 3, y: 9, path: "blocked", object: "tree", variant: "tree1" },
  { x: 7, y: 19, path: "blocked", object: "tree", variant: "tree1" },
  { x: 19, y: 5, path: "blocked", object: "tree", variant: "tree1" },
  { x: 31, y: 9, path: "blocked", object: "tree", variant: "tree1" },
  // TREE VARAINT 2
  { x: 3, y: 5, path: "blocked", object: "tree", variant: "tree2" },
  { x: 4, y: 16, path: "blocked", object: "tree", variant: "tree2" },
  { x: 10, y: 19, path: "blocked", object: "tree", variant: "tree2" },
  { x: 9, y: 23, path: "blocked", object: "tree", variant: "tree2" },
  { x: 13, y: 21, path: "blocked", object: "tree", variant: "tree2" },
  { x: 17, y: 25, path: "blocked", object: "tree", variant: "tree2" },
  // TREE VARAINT 3
  { x: 12, y: 5, path: "blocked", object: "tree", variant: "tree3" },
  { x: 17, y: 9, path: "blocked", object: "tree", variant: "tree3" },
  { x: 13, y: 8, path: "blocked", object: "tree", variant: "tree3" },
  { x: 15, y: 16, path: "blocked", object: "tree", variant: "tree3" },
  { x: 15, y: 20, path: "blocked", object: "tree", variant: "tree3" },
  { x: 26, y: 24, path: "blocked", object: "tree", variant: "tree3" },
  { x: 30, y: 26, path: "blocked", object: "tree", variant: "tree3" },
  { x: 31, y: 21, path: "blocked", object: "tree", variant: "tree3" },
  { x: 33, y: 14, path: "blocked", object: "tree", variant: "tree3" },
  { x: 37, y: 11, path: "blocked", object: "tree", variant: "tree3" },
  { x: 38, y: 15, path: "blocked", object: "tree", variant: "tree3" },
  { x: 35, y: 4, path: "blocked", object: "tree", variant: "tree3" },
  { x: 25, y: 9, path: "blocked", object: "tree", variant: "tree3" },
  { x: 26, y: 14, path: "blocked", object: "tree", variant: "tree3" },
  { x: 21, y: 13, path: "blocked", object: "tree", variant: "tree3" },
  { x: 46, y: 10, path: "blocked", object: "tree", variant: "tree3" },
  { x: 45, y: 13, path: "blocked", object: "tree", variant: "tree3" },
  { x: 49, y: 15, path: "blocked", object: "tree", variant: "tree3" },
  { x: 45, y: 17, path: "blocked", object: "tree", variant: "tree3" },
  { x: 40, y: 20, path: "blocked", object: "tree", variant: "tree3" },
  { x: 40, y: 25, path: "blocked", object: "tree", variant: "tree3" },
  { x: 43, y: 28, path: "blocked", object: "tree", variant: "tree3" },
  { x: 46, y: 26, path: "blocked", object: "tree", variant: "tree3" },
  { x: 58, y: 25, path: "blocked", object: "tree", variant: "tree3" },
  { x: 61, y: 24, path: "blocked", object: "tree", variant: "tree3" },
  { x: 60, y: 28, path: "blocked", object: "tree", variant: "tree3" },
  { x: 64, y: 27, path: "blocked", object: "tree", variant: "tree3" },
  { x: 68, y: 23, path: "blocked", object: "tree", variant: "tree3" },
  { x: 68, y: 27, path: "blocked", object: "tree", variant: "tree3" },
  { x: 73, y: 29, path: "blocked", object: "tree", variant: "tree3" },
  { x: 76, y: 28, path: "blocked", object: "tree", variant: "tree3" },
  { x: 74, y: 22, path: "blocked", object: "tree", variant: "tree3" },
  { x: 70, y: 20, path: "blocked", object: "tree", variant: "tree3" },
  { x: 68, y: 18, path: "blocked", object: "tree", variant: "tree3" },
  { x: 60, y: 17, path: "blocked", object: "tree", variant: "tree3" },
  { x: 57, y: 15, path: "blocked", object: "tree", variant: "tree3" },
  { x: 68, y: 14, path: "blocked", object: "tree", variant: "tree3" },
  { x: 60, y: 12, path: "blocked", object: "tree", variant: "tree3" },
  { x: 64, y: 10, path: "blocked", object: "tree", variant: "tree3" },
  { x: 85, y: 11, path: "blocked", object: "tree", variant: "tree3" },
  { x: 74, y: 12, path: "blocked", object: "tree", variant: "tree3" },
  { x: 72, y: 4, path: "blocked", object: "tree", variant: "tree3" },
  { x: 65, y: 4, path: "blocked", object: "tree", variant: "tree3" },
  { x: 62, y: 7, path: "blocked", object: "tree", variant: "tree3" },
  { x: 59, y: 2, path: "blocked", object: "tree", variant: "tree3" },
  { x: 59, y: 5, path: "blocked", object: "tree", variant: "tree3" },
  { x: 48, y: 20, path: "blocked", object: "tree", variant: "tree3" },
  { x: 78, y: 7, path: "blocked", object: "tree", variant: "tree3" },
  { x: 95, y: 11, path: "blocked", object: "tree", variant: "tree3" },
  { x: 99, y: 14, path: "blocked", object: "tree", variant: "tree3" },
  { x: 48, y: 16, path: "blocked", object: "tree", variant: "tree3" },
  { x: 102, y: 17, path: "blocked", object: "tree", variant: "tree3" },
  { x: 103, y: 23, path: "blocked", object: "tree", variant: "tree3" },
  { x: 101, y: 24, path: "blocked", object: "tree", variant: "tree3" },
  { x: 99, y: 2, path: "blocked", object: "tree", variant: "tree3" },
  { x: 103, y: 7, path: "blocked", object: "tree", variant: "tree3" },
  { x: 112, y: 5, path: "blocked", object: "tree", variant: "tree3" },
  { x: 116, y: 8, path: "blocked", object: "tree", variant: "tree3" },
  { x: 112, y: 18, path: "blocked", object: "tree", variant: "tree3" },
  //TREE4
  { x: 53, y: 17, path: "blocked", object: "tree", variant: "tree4" }, 

  { x: 112, y: 21, path: "blocked", object: "base" },

  { x: 1, y: 1, path: "blocked", object: "block" },
];

let path = { right: true, left: true, down: true, up: true };
function checkCollision() {
  let currentpos = { x: parseInt(character.x / 32), y: parseInt(character.y / 32) };
  // console.log(map[currentpos.x][currentpos.y + 1][0]);
}

let oldpos = { x: 0, y: 0 };

let main = setInterval(function () {
  tick++;
  if (tick === 15) {
    //!-----------------------------------------------
    tick = 1;
    if (character.tick === 0) {
      character.tick = 1;
    } else {
      character.tick = 0;
    }
  }
  character.movePos();

  //if (oldpos.x !== character.x || oldpos.y !== character.y) {
  //  checkCollision();
  //}

  oldpos.x = character.x;
  oldpos.y = character.y;
}, 1000 / 60);

let newX = 1000,
  newY = 400;

let character = {
  dom: document.getElementById("Character"),
  detection: [],
  tick: 0,
  x: 500,
  y: 500,
  tempx: 0,
  tempy: 0,
  setPos: function (x, y) {},
  movePos: function (direction) {
    //console.log(direction);
    if (interface.keydown["d"] === true) {
      newX = character.x + config.movementspeed; // right
      if (character.tick === 0) {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808866bf7c60b66892cc0_r1.png";
      } else {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808864a573c6872217306_r2.png";
      }
    }
    if (interface.keydown["a"] === true) {
      newX = character.x - config.movementspeed; // left
      if (character.tick === 0) {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808866e86bfc40132a668_l1.png";
      } else {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808861c1ffc5f7679be8a_l2.png";
      }
    }
    if (interface.keydown["w"] === true) {
      newY = character.y - config.movementspeed; // up
      if (character.tick === 0) {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808866540ba1577588f24_u1.png";
      } else {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f80886832119d2a780090c_u2.png";
      }
    }
    if (interface.keydown["s"] === true) {
      newY = character.y + config.movementspeed; // down
      if (character.tick === 0) {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f80886399f645d3c4eafef_d1.png";
      } else {
        character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f808862db15049584d58b5_d2.png";
      }
    }
    if (
      interface.keydown["d"] === false &&
      interface.keydown["a"] === false &&
      interface.keydown["w"] === false &&
      interface.keydown["s"] === false
    ) {
      character.dom.src = "https://uploads-ssl.webflow.com/60f6f342d4804fc777c21408/60f80886a28e6260440eb0c7_idle.png";
    }
    if (tick === 29) {
      console.log(map[parseInt(newX / 32)][parseInt(newY / 32)][0]);
    }
    /*
        if (map[parseInt(newX / 32)][parseInt(newY / 32)][0] === undefined) {
          character.y = newY;
          character.x = newX;
        }*/
    if (map[parseInt(newX / 32)][parseInt(character.y / 32)][0] === undefined) {
      character.x = newX;
    } else {
      // console.log(map[parseInt(newX / 32)][parseInt(character.y / 32)][0]);
      if (map[parseInt(newX / 32)][parseInt(character.y / 32)][0].path !== "blocked") {
        character.x = newX;
      }
    }
    if (map[parseInt(character.x / 32)][parseInt(newY / 32)][0] === undefined) {
      character.y = newY;
    } else {
      if (map[parseInt(character.x / 32)][parseInt(newY / 32)][0].path !== "blocked") {
        // PATH FREE
        character.y = newY;
      }
    }

    // DETECTION
    if (this.tempx !== parseInt(character.x / 32) || this.tempy !== parseInt(character.y / 32)) {
      for (let i = 0, l = this.detection.length; i < l; i++) {
        console.log(this.detection[i]);
        if (this.detection[i] === undefined) continue;
        if (this.detection[i].ref === undefined) continue;
        if (this.detection[i].ref.children.length === 2) {
          this.detection[i].ref.removeChild(this.detection[i].ref.children[1]);
        }
      }
      /*
          elem = document.getElementById("test").children[0];
          elem.parentNode.removeChild(elem);*/

      this.tempx = parseInt(character.x / 32);
      this.tempy = parseInt(character.y / 32);

      this.detection.length = 0;
      this.detection.push(
        map[this.tempx + 1][this.tempy + 1][0],
        map[this.tempx + 1][this.tempy][0],
        map[this.tempx + 1][this.tempy - 1][0],
        map[this.tempx][this.tempy + 1][0],
        map[this.tempx][this.tempy][0],
        map[this.tempx][this.tempy - 1][0],
        map[this.tempx - 1][this.tempy + 1][0],
        map[this.tempx - 1][this.tempy][0],
        map[this.tempx - 1][this.tempy - 1][0]
      );

      for (let i = 0, l = 9; i < l; i++) {
        if (this.detection[i] === undefined) {
          this.detection.remove(i);
          i--;
          l--;
        } else if (this.detection[i].ref === undefined) {
          this.detection.remove(i);
          i--;
          l--;
        } else {
          let select = collect.cloneNode(true);
          if (this.detection[i].mirrow === true) {
            select.style.transform = "rotate3d(0, 1, 0, 180deg)";
          }
          if (this.detection[i].object === "tree") {
            this.detection[i].ref.appendChild(select);
            console.log("tree");
            continue;
          }
          this.detection[i].ref.appendChild(select);
        }
      }
    }
    // end detection
    if (tick === 14) {
      //   console.log(this.detection);
    }
    character.dom.style.zIndex = [parseInt(character.y / 32) + 1];
    document.getElementById("game").scrollLeft = character.x - window.innerWidth / 2;
    document.getElementById("game").scrollTop = character.y - window.innerHeight / 2;
    character.dom.style.left = character.x - 16 + "px";
    character.dom.style.top = character.y - 16 + "px";
  },
};

let interface = {
  keydown: {},
};

let keyEvents;

console.log("loaded");
mapInit();
