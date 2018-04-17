
--require("cocos.init")
--require("framework.init")
local testClass = require("src.app.scenes.TestClass")

local  TestclassChild = class("TestclassChild",testClass ) 

function TestclassChild:ctor()
	printf("TestclassChild")
end

function TestclassChild:funcTestone()
	printf("Testclasschild:funcTestone")
end
return TestclassChild