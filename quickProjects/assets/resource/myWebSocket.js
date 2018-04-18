// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var myWebSocket =cc.Class({
     Init:function(url) 
     {
         this.ws = new WebSocket(url);
         this.ws.onopen = this._onWebSocketOpen;
         this.ws.onmessage = this._onWebSocketMessage;
         this.ws.onerror = this._onWebSocketError;
         this.ws.onclose = this._onWebSocketClose;
         this.ws.curSocketComponent = this;
         this.msgHandlerMap = new Map();
         //this.registMessageHandle(MSG.LoginMsgClient,this,this.handlerLogin);
         this.fr = new FileReader();
         this.fr.callbackObj = this;
         this.fr.onload = function() {
            var msg = JSON.parse(this.result);
            cc.log("msg = "+ this.result);
            if(msg!=undefined)
                this.callbackObj.handleServerMsg(msg);
        };
         
     },
     sendMessage:function(msg)
     {
       // var sendMsg = {msg};
        cc.log("msg = "+ JSON.stringify(msg));
        this.ws.send(JSON.stringify(msg));
     },
     _onWebSocketOpen:function(event)
     {
        cc.log("webSocket is connected.....");
     },
     _onWebSocketClose:function(event)
     {
        cc.log("webSocket be closed.....");
     },
     _onWebSocketMessage:function(event)
     {
        cc.log("webSocket recive message = "+event.data);
        this.curSocketComponent.fr.readAsText(event.data);
     },
     handleServerMsg:function(msg)
     {
        if(msg.msgType == undefined)
            return;
        var handlerMap = this.curSocketComponent.msgHandlerMap.get(msg.msgType);
        if(handlermap == undefined)
            return;
        for (var handler of handlerMap) { // 遍历Map
         handler[1].call(handler[0],msg);
        }
     },
     _onWebSocketError:function(event)
     {
        cc.log("webSocket error = "+JSON.stringify(event));
     },
     registMessageHandle:function(msgType,obj,Method)
     {
         if(msgType == undefined||obj == undefined || Method== undefined)
           return;
        var handler = this.msgHandlerMap.get(msgType);
        if(handler == undefined)
        {
            var handlermap = new Map();
            handlermap.set(obj,Method);
            this.msgHandlerMap.set(msgType,handlermap);
        }
        else
        {
            handler.set(obj,Method);
        }
     },
     unRegistMessageHandler:function(msgType,obj)
     {
        if(msgType == undefined||obj == undefined )
            return;
        var handler = this.msgHandlerMap.get(msgType);
        handler.delete(obj);
     },
});
var GameWebSocket = new myWebSocket();
GameWebSocket.Init("ws://127.0.0.1:3463")
module.exports = GameWebSocket;
