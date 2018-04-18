package msg

import (
	"github.com/name5566/leaf/network/json"
)

var Processor = json.NewProcessor()

func init() {
	// 这里我们注册了一个 JSON 消息 Hello
	Processor.Register(&LoginMsgClient{})
}

// 一个结构体定义了一个 JSON 消息的格式
// 消息名为 Hello
type LoginMsgClient struct {
	MsgType    string
	MsgContent string
}
type LoginMsgServer struct {
	MsgType    string
	MsgContent string
}
