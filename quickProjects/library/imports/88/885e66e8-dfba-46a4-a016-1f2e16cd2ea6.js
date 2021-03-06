"use strict";
cc._RF.push(module, '885e6bo37pGpKAWHy4WzS6m', 'login');
// resource/login.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.userName = "";
        this.userPassWord = "";
    },
    start: function start() {},

    accountEditBoxDidEndEditing: function accountEditBoxDidEndEditing(sender) {
        this.userName = sender.string;
    },
    passWordEditBoxDidEndEditing: function passWordEditBoxDidEndEditing(sender) {
        this.userPassWord = sender.string;
    },
    onLoginButtonClick: function onLoginButtonClick(sender) {
        cc.log("button be Clicked");
        cc.log("userName = " + this.userName);
        cc.log("userPassWord = " + this.userPassWord);
    },
    update: function update(dt) {},
    onDestroy: function onDestroy() {},
    onDisable: function onDisable() {},
    lateUpdate: function lateUpdate() {}
});

cc._RF.pop();