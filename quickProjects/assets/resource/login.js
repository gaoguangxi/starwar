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
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        cc.game.addPersistRootNode(this.node);
        this.userName = "";
        this.userPassWord = "";
     },
    start () {
        this.MSG = require("msg");
        this.gameWebSocket = require("myWebSocket");
        this.gameWebSocket.registMessageHandle(this.MSG.LoginMsgClient,this,this.handlerLogin);
    },
    accountEditBoxDidEndEditing:function(sender) {
        this.userName = sender.string;
    },
    passWordEditBoxDidEndEditing: function(sender){
        this.userPassWord = sender.string;
    },
    onLoginButtonClick:function(sender){
        cc.log("button be Clicked");
        cc.log("userName = " + this.userName);
        cc.log("userPassWord = " + this.userPassWord);
        var LoginMsgClient = new this.MSG.LoginMsgClient();
        LoginMsgClient.LoginMsg.UserName = this.userName;
        LoginMsgClient.LoginMsg.PassWord = this.userPassWord;
        this.gameWebSocket.sendMessage(LoginMsgClient);   
    },
     update (dt) 
     {

     },
     onDestroy ()
     {

     },
     onDisable ()
     {

     },
     lateUpdate ()
     {

     },
        
     handlerLogin:function(msg)
     {
        cc.log("msg = "+ JSON.stringify(msg));
     },
     
});
