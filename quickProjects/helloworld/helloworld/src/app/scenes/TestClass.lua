--require("cocos.init")
--require("framework.init")
local TestClass = class("TestClass")

TestClass.a = 10
function TestClass:ctor()
    printf("TestClass")
end

function TestClass:funcTestone()
   printf("TestClass:funcTestone")
end

function TestClass:AddToa(val)
    self.a=self.a+val;
    printf("%s.a = %d", self.__cname,self.a)
end
return TestClass