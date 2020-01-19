let layouts = {

  tags: {
    html: {
      margin: "0px",
      border: "0px",
      padding: "0px"
    },
    body: {
      color: "#707070",
      "background-color": "#E5E5E5"
    },
    h1: {
      "white-space": "nowrap"
    },
    "div.pages:last-child": {
      display: "none"
    }
  },

  pages: {
    0:{
      width: "calc(75vw - 120px)",
      margin: "60px 12.5vw 0px 12.5vw",
      padding: "10px 60px 10px 60px",
      "background-color": "#ffffff",
      "box-shadow": "#00000080 8px 8px 16px",
      "overflow-x": "hidden"
    }
  },

  page: {
    0: {

    },
    "*": {
      left: "60px",
      position: "relative",
      width: "calc(100% - 60px)"
    },
    h1: {
      display: "inline-block",
      width: "calc(100% - 60px - 135px)",
      "max-width": "calc(100% - 60px)"
    },
    svg: {
      left: "0px",
      width: "20px",
      height: "20px",
      display: "inline-block",
    },
    select: {
      color: "#000000",
      display: "inline-block",
      width: "130px",
      top: "-4px",
      left: "60px",
      border: "0",
      "background-color": "#ffffff",
      padding: "10px"
    },
    span: {
      display: "inline-block",
      "background-color": "#ffffff",
      padding: "10px",
      width: "20px"
    },
    "[contenteditable]::after": {
      position: "absolute",
      left: "-75px",
      content: "attr(data-tag)",
      display: "inline-block",
      "font-size": "14px",
      top: "5px",
      color: "#000000"
    }
  },

  addpage: {
    0: {

    },
    h6: {
      "text-align": "center"
    }
  },

  contextmenu: {
    0: {
      width: "50px",
      display: "none",
      position: "fixed"
    },
    p: {
      display: "contents"
    }
  },

  hidden: {
    0: {
      display: "none"
    }
  }

}
