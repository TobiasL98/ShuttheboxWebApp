package controllers

import javax.inject._
import play.api.mvc._
import controller.{Controller, ControllerInterface}
import aview.Tui
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import util.Observer

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents)
  (implicit system: ActorSystem, mat: Materializer)
  extends BaseController {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  var cont = Controller.apply()
  var tui = new Tui(cont)
  var isShut: List[Boolean] = List(false, false, false, false, false, false, false, false, false)
  var numOfMoves: Int = 0;
  
  var style = "classic"

  /**
   * Aktualisiert die Liste die das Spielfeld repräsentiert
   */
  def update() = {
    for ( x <- 1 to 9){
      isShut = isShut.updated(x - 1, cont.isShut(x))
    }
  }

  /**
   * Liefert die HTML-Startseite
   */
  def start() = Action{ implicit request: Request[AnyContent] =>
    Ok(views.html.start(style=style))
  }
  /**
   * Liefert die HTML-Erklärseite
   */
  def explain() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.explain(style=style))
  }

  /**
   * Liefert die HTML-Spielseite
   */
  def startGame() = Action{ implicit request: Request[AnyContent] =>
    numOfMoves = 0;
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut))
  }
  /**
   * Startet ein neues (Mock)Spiel und liefert die HTML-Spielseite
   * Der Würfel würfelt jetzt immer zwei Zweien
   */
  def startMockGame() = Action{ implicit request: Request[AnyContent] =>
    cont = Controller.apply("mock")
    tui = new Tui(cont)
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut))
  }
  /**
   * Führt eine Aktion aus und liefert die HTML-Spielseite
   * @param input Die auszuführende Aktion
   */
  def doAMove(input:String) = Action{ implicit request: Request[AnyContent] =>
    tui.getInputAndPrintLoop(input)
    numOfMoves += 1;
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut))
  }
  /**
   * Ändert den Stil und liefert die HTML-Startseite
   * @param s Der zu verwendende Stil
   */
  def changeStyle(s:String) = Action{ implicit request: Request[AnyContent] =>
    style = s
    Ok(views.html.start(style=style))
  }
  /**
   * Führt eine Aktion aus und liefert eine JSON Response des Spiel-Zustands
   * @param input Die auszuführende Aktion
   */
  def rawGameData(input: String) = Action{ implicit request: Request[AnyContent] =>
    if(input=="new"){
      newGame()
    }else{
      tui.getInputAndPrintLoop(input)
      numOfMoves += 1;
    }
    update()
    Ok(cont.getRaw)
  }
    /**
   * Startet ein neues Spiel und liefert die HTML-Spielseite
   */
  def newGame() = {
    cont = Controller.apply()
    tui = new Tui(cont)
    numOfMoves = 0;
  }

  /**
   * Macht aus der HTTP- eine Websocket Connection
   */
  def socket() = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      MyWebSocketActor.props(out)
    }
  }

  object MyWebSocketActor {
    def props(out: ActorRef) = {
      println("Object created")
      Props(new MyWebSocketActor(out))
    }
  }

  class MyWebSocketActor(out: ActorRef) extends Actor with Observer{
    cont.add(this)
    override def update: Unit = {
      println("Send JSON after update")
      out ! (cont.getRaw)
    }
    def receive = {
      case msg: String =>
        out ! (cont.getRaw)
        println("Received message: "+ msg)
    }
  }
}
