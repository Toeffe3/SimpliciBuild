var savePath = "app/pages.json";
var pages, layouts, themes = {"default": {}}, tempthemes;

async function getData(func, ...paths) {
  let arr = [];
  for (i in paths) {
    let p;
    try {
      p = await readFileAsync(paths[i]);
    } catch (e) {
      p = "[]";
    }
    arr.push(JSON.parse(p.toString()));
  } func(arr);
}

async function saveAs() {
  savePath = await ipcRenderer.invoke("saveAs");
  console.log(savePath);
  refresh();
}

async function save(fun) {
  const data = JSON.stringify(decompile(true));
  console.log(data);
  await writeFileAsync(savePath, data, {encoding: 'utf8', flag: 'w'}, function(err) {
    if(err) console.log("An error ocurred saving the file "+ err.message);
    else {
      console.log("The file has been succesfully saved");
      return fun();
    }
  });
  return false;
}

async function load() {
  pages = undefined, layouts = undefined, themes = {"default": {}}, tempthemes = undefined;
  while(document.body.children.length > 1) document.body.lastChild.remove();

  await getData(function(data) {
    [pages, layouts, tempthemes] = data;
    for (temptheme of Object.keys(tempthemes))
      themes[temptheme] = tempthemes[temptheme];
  }, savePath, 'app/layouts.json', 'app/themes.json');

  compile();

  document.onclick = () => {
    for(elem of document.getElementsByClassName('delete')) elem.classList.remove('delete');
    document.getElementsByClassName('contextmenu').length?document.getElementsByClassName('contextmenu')[0].style.display = 'none':0;
  };

  for(elem of document.getElementsByClassName("themesselect"))
    elem.onchange = (ev) => {
      let clssl = ev.path[1].classList;
      if(clssl.length > 2) clssl.remove(clssl[clssl.length-1]);
      clssl.add(ev.path[0].value);
    };
}

async function refresh() {
  await save(() => {
    load();
  });
}
