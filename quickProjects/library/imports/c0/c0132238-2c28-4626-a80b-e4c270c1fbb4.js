"use strict";
cc._RF.push(module, 'c0132I4LChGJqgL5MJwwfu0', 'myWebSocket');
// resource/myWebSocket.js

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
      URL: {
         // ATTRIBUTES:
         default: "url", // The default value will be used only when the component attaching
         // to a node for the first time
         //type: cc.String, // optional, default is typeof default
         serializable: true // optional, default is true
      }
      //  bar: {
      //      get () {
      //          return this._bar;
      //      },
      //      set (value) {
      //          this._bar = value;
      //      }
      //  }, 
   },

   // LIFE-CYCLE CALLBACKS:

   onLoad: function onLoad() {
      var MSG = require("msg");
      cc.game.addPersistRootNode(this.node);
      this.ws = new WebSocket(this.URL);
      this.ws.onopen = this._onWebSocketOpen;
      this.ws.onmessage = this._onWebSocketMessage;
      this.ws.onerror = this._onWebSocketError;
      this.ws.onclose = this._onWebSocketClose;
      this.ws.curSocketComponent = this;
      this.msgHandlerMap = new Map();
      this.registMessageHandle(MSG.LoginMsgClient, this, this.handlerLogin);
      this.fr = new FileReader();
      this.fr.callbackObj = this;
      this.fr.onload = function () {
         var msg = JSON.parse(this.result);
         cc.log("msg = " + this.result);
         if (msg != undefined) this.callbackObj.handleServerMsg(msg);
      };
   },
   start: function start() {},
   update: function update(dt) {},

   handlerLogin: function handlerLogin(msg) {
      cc.log("msg = " + JSON.stringify(msg));
   },
   sendMessage: function sendMessage(msg) {
      var sendMsg = { msg: msg };
      cc.log("msg = " + JSON.stringify(sendMsg));
      this.ws.send(JSON.stringify(sendMsg));
   },
   _onWebSocketOpen: function _onWebSocketOpen(event) {
      cc.log("webSocket is connected.....");
   },
   _onWebSocketClose: function _onWebSocketClose(event) {
      cc.log("webSocket be closed.....");
   },
   _onWebSocketMessage: function _onWebSocketMessage(event) {
      cc.log("webSocket recive message = " + event.data);
      this.curSocketComponent.fr.readAsText(event.data);
   },
   handleServerMsg: function handleServerMsg(msg) {
      if (msg.msgType == undefined) return;
      var handlerMap = this.curSocketComponent.msgHandlerMap.get(msg.msgType);
      if (handlermap == undefined) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
         for (var _iterator = handlerMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var handler = _step.value;
            // 遍历Map
            handler[1].call(handler[0], msg);
         }
      } catch (err) {
         _didIteratorError = true;
         _iteratorError = err;
      } finally {
         try {
            if (!_iteratorNormalCompletion && _iterator.return) {
               _iterator.return();
            }
         } finally {
            if (_didIteratorError) {
               throw _iteratorError;
            }
         }
      }
   },
   _onWebSocketError: function _onWebSocketError(event) {
      cc.log("webSocket error = " + JSON.stringify(event));
   },
   registMessageHandle: function registMessageHandle(msgType, obj, Method) {
      if (msgType == undefined || obj == undefined || Method == undefined) return;
      var handler = this.msgHandlerMap.get(msgType);
      if (handler == undefined) {
         var handlermap = new Map();
         handlermap.set(obj, Method);
         this.msgHandlerMap.set(msgType, handlermap);
      } else {
         handler.set(obj, Method);
      }
   },
   unRegistMessageHandler: function unRegistMessageHandler(msgType, obj) {
      if (msgType == undefined || obj == undefined) return;
      var handler = this.msgHandlerMap.get(msgType);
      handler.delete(obj);
   }
});

cc._RF.pop();