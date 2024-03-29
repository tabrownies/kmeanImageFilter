class ColorChooser {
    r = 0;
    g = 0;
    b = 0;
    dynamicPicker;
    rPicker;
    setColors = function (r = 0, g = 0, b = 0) {
        // store the values passed. I am choosing to take the modulo of any value passed to get it between the allowed values
        this.r = Math.floor(Math.abs(r) % 256);
        this.g = Math.floor(Math.abs(g) % 256);
        this.b = Math.floor(Math.abs(b) % 256);
    }
    getHexString = function () {
        let rHex = this.r.toString(16);
        let gHex = this.g.toString(16);
        let bHex = this.b.toString(16);
        if (rHex.length < 2)
            rHex = '0' + rHex
        if (gHex.length < 2)
            gHex = '0' + gHex
        if (bHex.length < 2)
            bHex = '0' + bHex
        return '#' + rHex + gHex + bHex;
    }
    setTextInputs = function () {
        this.rPicker.value = this.r;
        this.gPicker.value = this.g;
        this.bPicker.value = this.b;
    }
    setDynamicInput = function () {
        this.dynamicPicker.value = this.getHexString();
        // this.dynamicPicker.style.backgroundColor = this.getHexString()
    }
    changeByTextInput = function () {
        this.setColors(this.rPicker.value, this.gPicker.value, this.bPicker.value)
        this.setTextInputs();
        this.setDynamicInput();
    }
    changeByDynamicInput = function () {
        let rawValue = this.dynamicPicker.value;
        let rHex = rawValue.slice(1, 3);
        let gHex = rawValue.slice(3, 5);
        let bHex = rawValue.slice(5, 7);
        this.setColors(Number('0x' + rHex), Number('0x' + gHex), Number('0x' + bHex));
        this.setTextInputs();
        this.setDynamicInput();
    }
    constructor(htmlSelector, r = 0, g = 0, b = 0) {
        // get the html elements for manipulation
        this.dynamicPicker = htmlSelector.children[0];
        this.rPicker = htmlSelector.children[1].children[0];
        this.gPicker = htmlSelector.children[1].children[1];
        this.bPicker = htmlSelector.children[1].children[2];

        // initialize the variables and change the DOM accordingly
        this.setColors(r, g, b);
        this.setTextInputs();
        this.setDynamicInput()
    }
}

// creates a chooser element
// codeIdentifier is the what is passed into
function createChooserHTML(codeIdentifier) {
    let chooser = document.createElement('div');
    chooser.setAttribute('class', 'chooser');
    chooser.innerHTML = '<input type="color" class="color" value="#c8FFFF" onchange="'+codeIdentifier+'.changeByDynamicInput()"></input><p class="value">R:<input class="R" value="200" type="number" onchange="'+codeIdentifier+'.changeByTextInput(event.value, \'r\')">G:<input class="G" value="255" type="number" onchange="'+codeIdentifier+'.changeByTextInput(event.value, \'g\')">B:<input class="B" value="255" type="number" onchange="'+codeIdentifier+'.changeByTextInput(event.value, \'b\)"></p>'
    return chooser;
}