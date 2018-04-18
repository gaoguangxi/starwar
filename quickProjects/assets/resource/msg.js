

var MSG={

    LoginMsgClient :cc.Class({
        ctor: function () {
            // 声明实例变量并赋默认值
            this.LoginMsg ={
                MsgType:"LoginMsg",
                UserName:"",
                PassWord:"",
                
            };
        }
    }),
}
module.exports = MSG;