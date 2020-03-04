
var DialogModalPlugin = function (scene) {
    this.scene = scene;
    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted) {
        scene.sys.events.once('boot', this.boot, this);
    }
};

DialogModalPlugin.register = function (PluginManager) {
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
};

DialogModalPlugin.prototype = {
    // called when the plugin is loaded by the PluginManager
    boot: function () {
        var eventEmitter = this.systems.events;
        eventEmitter.on('destroy', this.destroy, this);
    },

    //  Called when a Scene shuts down, it may then come back again later
    // (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function () {
        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
        if (this.character1) this.character1.destroy();
        if (this.character2) this.character2.destroy();
        if (this.nameText) this.nameText.destroy();
    },

    // called when a Scene is destroyed by the Scene Manager
    destroy: function () {
        this.shutdown();
        this.scene = undefined;
    },

    // Initialize the dialog modal
    init: function (opts) {
        // Check to see if any optional parameters were passed
        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.dialogSpeed = opts.dialogSpeed || 3;

        this.eventCounter = 0;
        this.visible = true;
        this.text;
        this.nameText;
        this.character1;
        this.character2;
        this.dialog;
        this.graphics;
        this.name;

        // Create the dialog window
        this._createWindow();
    },

    // Hide/Show the dialog window
    toggleWindow: function () {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
    },

    // Slowly displays the text in the window to make it appear annimated
    _animateText: function () {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.timedEvent.remove();
        }
    },

    // Sets the text for the dialog window
    setText: function (text, animate) {
        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;
        this._setText(tempText);

        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true
            });
        }
    },

    // Calcuate the position of the text in the dialog window
    _setText: function (text) {
        // Reset the dialog
        if (this.text) this.text.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 20;

        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                font: 'bold 24pt Arial',
                wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
            }
        });
        this.text.depth=3;
    },
    setCharacter1: function (characterPortrait,showCharacter)
    {
        if (this.character1!=null)
        {
            if (characterPortrait != null & this.character1!=null)
            {
                this.character1.setTexture(characterPortrait);
                this.character1.alpha = showCharacter ? 1 : 0;
                this.character1.depth=0;
            }
        }
        else
        {
            this.character1 = this.scene.add.sprite(config.width/4, config.height/2,characterPortrait);
            this.character1.alpha = showCharacter ? 1 : 0;
            this.character1.depth=0;
        }
        //var character2 = this.add.sprite(config.width - config.width/4, config.height/2, 'Harry_dialog');
    },
    setCharacter2: function (characterPortrait,showCharacter)
    {
        if (this.character2!=null)
        {
            this.character2.setTexture(characterPortrait);
            this.character2.alpha = showCharacter ? 1 : 0;
            this.character2.depth=0;
        }
        else
        {
            this.character2 = this.scene.add.sprite(config.width - config.width/4, config.height/2,characterPortrait);
            this.character2.alpha = showCharacter ? 1 : 0;
            this.character2.depth=0;
        }
    },
    // Sets the text for the dialog window
    setName: function (text) {
        this._setName(text);
    },
    // Calcuate the position of the text in the dialog window
    _setName: function (text) {
        // Reset the dialog
        if (this.NameText) this.NameText.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding - 50;
        switch (text)
        {
            case "Tom":
                this.NameText = this.scene.make.text({x, y, text, style: {font: 'bold 24pt Arial',  fill: '#ff8e3a', wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }}});
                break;
            case  "Zoey":
                this.NameText = this.scene.make.text({x, y, text, style: {font: 'bold 24pt Arial',  fill: '#ab6eff', wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }}});
                break;
            case  "Harry":
                this.NameText = this.scene.make.text({x, y, text, style: {font: 'bold 24pt Arial',  fill: '#7eabff', wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }}});
                break;
            default:
                this.NameText = this.scene.make.text({x, y, text, style: {font: 'bold 24pt Arial', fill: '#fffbee', wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }}});
        }
        this.NameText.depth=4;
    },

    // Creates the dialog window
    _createWindow: function () {
        var gameHeight = config.height;
        var gameWidth = config.width;
        var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this.graphics.depth=1;

        this._createNameWindow(windowDimensions);
        this._createNameOuterWindow(windowDimensions);
        this._createOuterWindow(windowDimensions);
        this._createInnerWindow(windowDimensions);

    },

    // Gets the width of the game (based on the scene)
    _getGameWidth: function () {
        return config.width;
    },

    // Gets the height of the game (based on the scene)
    _getGameHeight: function () {
        return config.height;
    },

    // Calculates where to place the dialog window based on the game size
    _calculateWindowDimensions: function (width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    },

    // Creates the inner dialog window (where the text is displayed)
    _createInnerWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    },
    _createNameWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x, y - rectHeight/2.5, rectWidth/3, rectHeight/2.5);
    },
    _createNameOuterWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y - rectHeight/2.5, rectWidth/3, rectHeight/2.5);
    },

    // Creates the border rectangle of the dialog window
    _createOuterWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    },
};