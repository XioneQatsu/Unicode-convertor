
document.querySelector("#content-load").innerHTML = `
<div class="card-column-1">
  <div class="card radius-all box-shadow">
    <div class="card-text radius-tlr">
      <h3 class="font-color">Unicode Convertor</h3>
    </div>
  </div>
</div>
<div class="card-column-1">
  <div class="card radius-all box-shadow">
    <div class="card-text radius-tlr">
      <h4 class="font-color">Input Character</h4>
    </div>
    <div class="card-input radius-all">
      <textarea name="Input Character" placeholder="Input text or unicode (\\u0064\\u006a)" class="card-textarea font-color font-acme" id="inputC"></textarea>
    </div>
  </div>
</div>
<div class="card-column-2">
  <div class="card radius-all box-shadow">
    <div class="card-text radius-tlr">
      <h4 class="font-color">Output Character</h4>
    </div>
    <div class="radius-all">
      <textarea name="Output Character" class="card-textarea font-color font-acme" id="outputUC"></textarea>
    </div>
    <br><button class="card-btn font-color" id="copyUC">Copy</button>
  </div>
</div>
<div class="card-column-2">
  <div class="card radius-all box-shadow">
    <div class="card-text radius-tlr">
      <h4 class="font-color">Output Unicode</h4>
    </div>
    <div class="radius-all">
      <textarea name="Output Unicode" class="card-textarea font-color font-acme" id="outputCU"></textarea>
    </div>
    <br><button class="card-btn font-color" id="copyCU">Copy</button>
  </div>
</div>
`;

function dec2hex(textString) {
  return (textString).toString(16).toUpperCase();
}

function hex2char(hex) {
  let result = "", n = parseInt(hex, 16);
  if (n <= 0x10ffff) result += String.fromCodePoint(n);
  else result += "hex2Char error: Code point out of range: " + dec2hex(n);
  return result;
}

function convertUnicode2Char(textString) {
  textString = textString.replace(/\\u([A-Fa-f0-9]{4})/g, function (match, parens) { return hex2char(parens); });
  return textString;
}

function convertChar2Unicode(textString) {
  let outputString = "";
  for (let i = 0; i < textString.length; i++) {
    let charCode = textString.charCodeAt(i);
    if (!(0xd800 <= charCode && charCode <= 0xdbff)) {
      let result = dec2hex(charCode);
      while (result.length < 4) result = "0" + result;
      outputString += "\u005Cu" + result;
    }
  }
  return outputString.substring(0, outputString.length);
}

let Character = document.getElementById('outputUC'),
  Unicode = document.getElementById('outputCU');
setInterval(() => {
  Character.value = convertUnicode2Char(document.getElementById('inputC').value);
  Unicode.value = convertChar2Unicode(Character.value);
}, 500);

copyTextAlert('copyUC', Character);
copyTextAlert('copyCU', Unicode);

function copyTextAlert(id, text) {
  document.getElementById(id).onclick = () => {
    text.select();
    document.execCommand('copy');
    alert(`Copied to clipboard!`);
  }
}
