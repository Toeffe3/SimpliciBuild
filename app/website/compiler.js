function compile() {
  for (pagecnt of pages) {
    let childrens = [], events = {}, layout = [];
    pagecnt.forEach((item, i) => {
      if(Object.keys(item)[0] == "layout") layout.push(pagecnt[i].layout);
    });
    for (var cnt of pagecnt) {
      tag = Object.keys(cnt)[0];
      let clss = tag.match(/^[^\.]+/)?tag.replace(/^[^\.]+/, "").split("."):[];
      clss.shift();
      clss.unshift(...layout)
      console.log(tag, clss);
      if(isTag(tag)) childrens.push(createAElement(tag, clss, [cnt[tag]]));
      else if (tag != "layout" && tag != "comment") events[tag] = cnt[tag];
    }
    let page = createAElement("DIV", ["pages", layout], childrens);
    for (e of Object.keys(events)) page[e] = new Function(events[e]);
    if(page.beforeonload) page.beforeonload(localthis=page);
    document.body.appendChild(page);
  }
  for (page of document.getElementsByClassName("pages"))if(page.onload)page.onload(localthis=page);

  let style = document.getElementsByTagName("STYLE")[0];
  for (userdefined of Object.keys(layouts))
    for (layout of Object.keys(layouts[userdefined])) {
      style.innerHTML += ((userdefined == "tags")?"":("."+userdefined+" "))+(layout.replace("0",""))+" {\n";
      for (properties of Object.keys(layouts[userdefined][layout||0])) style.innerHTML += "\t\t"+properties+": "+layouts[userdefined][layout||0][properties]+";\n";
      style.innerHTML += "}\n\n";
    }

  for (userdefined of Object.keys(themes))
    for (theme of Object.keys(themes[userdefined])) {
      style.innerHTML += ((userdefined == "tags")?"":(".pages.page."+userdefined+" "))+(theme.replace("0",""))+" {\n";
      for (properties of Object.keys(themes[userdefined][theme||0])) style.innerHTML += "\t\t"+properties+": "+themes[userdefined][theme||0][properties]+";\n";
      style.innerHTML += "}\n\n";
    }
}

function createAElement(type, clss, inner) {
  type = type.replace(/@\d/,"");
  let tclss = type.split(".");
  type = tclss.shift();
  clss.concat(tclss);
  domelem = document.createElement(type);
  for (c of clss) domelem.className += c+" ";
  domelem.className = domelem.className.substr(0,domelem.className.length-1);
  for (i of inner)
    if (typeof i == "string") domelem.innerHTML += i;
    else if(i instanceof HTMLElement) domelem.appendChild(i);
  return domelem;
}

function isTag(text) {
  return text.toString().split(".")[0]==text.toString().split(".")[0].toUpperCase();
}

function toUpperCase(s,q=1,g) {
  return s.replace(new RegExp(typeof q=="number"?".{"+q+"}":typeof q=="string"?q.replace(/^\/|\/$/g,""):q,g?"g":""),function(s){
    return s.toUpperCase();
  });
}
