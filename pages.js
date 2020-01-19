let json = [
  {
    "H6": "+",
    "layout": "addpage",
    "onbeforeload": "json.unshift(json[json.length-1]);",
    "onclick": "json.splice(json.length-3,0,json[json.length-1]); refresh()"
  },
  {
    "P": "Delete",
    "layout": "contextmenu",
    "onclick": "var el=document.getElementsByClassName('delete')[0];while(el.classList[0]!='pages')el=el.parentNode;el.remove();"
  },
  {
    "H1": "This is the header",
    "SPAN": '<svg viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M58.903,117.307c-34.855,0 -58.403,-23.549 -58.403,-58.404c0,-34.855 22.676,-58.403 58.403,-58.403c35.728,0 58.404,22.676 58.404,58.403c0,1.374 -0.799,10.056 -9.084,12.668c-12.985,4.095 -29.554,0.247 -37.859,11.757c-8.003,11.091 18.09,11.986 13.904,27.147c-2.233,8.086 -15.48,6.239 -25.365,6.832Zm38.238,-89.699c4.926,0 8.926,4 8.926,8.926c0,4.926 -4,8.926 -8.926,8.926c-4.926,0 -8.926,-4 -8.926,-8.926c0,-4.926 4,-8.926 8.926,-8.926Zm-69.919,-8.926c4.927,0 8.926,4 8.926,8.926c0,4.926 -3.999,8.926 -8.926,8.926c-4.926,0 -8.925,-4 -8.925,-8.926c0,-4.926 3.999,-8.926 8.925,-8.926Zm48.474,-8.926c4.926,0 8.926,4 8.926,8.926c0,4.926 -4,8.926 -8.926,8.926c-4.926,0 -8.926,-4 -8.926,-8.926c0,-4.926 4,-8.926 8.926,-8.926Zm-25.718,-4.407c4.926,0 8.925,3.999 8.925,8.925c0,4.927 -3.999,8.926 -8.925,8.926c-4.927,0 -8.926,-3.999 -8.926,-8.926c0,-4.926 3.999,-8.925 8.926,-8.925Z" style="stroke:#000;stroke-width:1px;"/></svg>',
    "SELECT": "<OPTION value='Bright'>Bright</OPTION><OPTION value='Dark'>Dark</OPTION>",
    "P": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "P.add": "+",
    "layout": "page",
    "onload": "localthis.children[0].contentEditable=true;localthis.children[3].contentEditable=true;for(child of localthis.children)if(child.contentEditable)child.setAttribute('data-tag','<'+child.nodeName+'>');",
    "oncontextmenu": "var cm=document.getElementsByClassName('contextmenu')[0];cm.style.left=event.clientX-100 +'px';cm.style.top=event.clientY- 100+'px';cm.style.display='block';event.target.classList.add('delete');return false",
    "oninput": undefined
  }
]
