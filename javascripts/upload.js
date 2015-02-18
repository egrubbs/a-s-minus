function handleFileDrop(a){
  a.stopPropagation();
  a.preventDefault();
  var b=a.dataTransfer.files[0];
  readFile(b);
}

function handleFileSelect(a){
  a.stopPropagation();
  a.preventDefault();
  var b=a.target.files[0];
  readFile(b);
}

function readFile(a){
  var b=a.name.match(/(.*)\.(png|jpg|jpeg)$/)[1],c=new FileReader;
  c.onload = function(a){
    var c=a.target.result;
    BG.getSelectedTab(function(){
      BG.type="visible";
      BG.menuType="upload";
      BG.tabtitle=b;
      BG.dataURL.push(c);
      var a=chrome.extension.getURL("")+"edit.html";
      chrome.tabs.update({url:a});
    });
  };
  c.readAsDataURL(a);
}

function handleDragHover(a){
  a.stopPropagation();
  a.preventDefault();
  a.dataTransfer.dropEffect="move";
  dropZone.className="dragover"==a.type?"hover":"";
}

var BG = chrome.extension.getBackgroundPage();
document.getElementById("image_file").addEventListener("change",handleFileSelect,!1);

var dropZone = document.getElementById("dropZone");
dropZone.addEventListener("dragover",handleDragHover,!1);
dropZone.addEventListener("dragleave",handleDragHover,!1);
dropZone.addEventListener("drop",handleFileDrop,!1);
document.body.addEventListener("dragover",function(a){
  console.log("ddf");
  a.stopPropagation();
  a.preventDefault();
  a.dataTransfer.dropEffect="none";
}, !1);
