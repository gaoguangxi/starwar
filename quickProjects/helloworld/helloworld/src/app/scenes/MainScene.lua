
--require("src.framework.init")
local TestClass = require("app.scenes.TestClass");
local TestClassChild = require("app.scenes.TestClassChild")
local MainScene = class("MainScene", function()
    return display.newScene("MainScene")
end)

function MainScene:ctor()
    display.newTTFLabel({text = "Hello, World", size = 64})
        :align(display.CENTER, display.cx, display.cy)
        :addTo(self)
end

function MainScene:onEnter()
	printf("fffffff")
	 local TS = TestClass.new()
        local TSC = TestClass.new()
        TS:funcTestone()
        TSC:funcTestone()
        TS:AddToa(100)
       TSC:AddToa(10)
end

function MainScene:onExit()
end
return MainScene
