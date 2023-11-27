package controller

final case class AConsoleTest(val s: String = "World")  {
    def showS: String = s
    def greetings: String = s"Hello $s !"
    def sayHello(n:String = "World"): String = s"Hello $n"
}
