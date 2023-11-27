package controllers

import javax.inject._
import play.api._
import play.api.mvc._

import views._

import controller.Controller
import aview.Tui

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

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

  def update() = {
    for ( x <- 1 to 9){
      isShut = isShut.updated(x - 1, cont.isShut(x))
    }
  }
  

  def start() = Action{ implicit request: Request[AnyContent] =>
    Ok(views.html.start(style=style))
  }
  def explain() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.explain(style=style))
  }
  def newGame() = Action{ implicit request: Request[AnyContent] =>
    cont = Controller.apply()
    tui = new Tui(cont)
    numOfMoves = 0;
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut, moves = numOfMoves))
  }
  def startGame() = Action{ implicit request: Request[AnyContent] =>
    numOfMoves = 0;
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut, moves = numOfMoves))
  }
  def startMockGame() = Action{ implicit request: Request[AnyContent] =>
    cont = Controller.apply("mock")
    tui = new Tui(cont)
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut, moves = numOfMoves))
  }
  def doAMove(input:String) = Action{ implicit request: Request[AnyContent] =>
    tui.getInputAndPrintLoop(input)
    numOfMoves += 1;
    update()
    Ok(views.html.game(style=style, player = cont.getPlayers, dice = cont.getDice, sum = cont.getSum, board = isShut, moves = numOfMoves))
  }
  def changeStyle(s:String) = Action{ implicit request: Request[AnyContent] =>
    style = s
    Ok(views.html.start(style=style))
  }

  def rawGameData(input: String) = Action{ implicit request: Request[AnyContent] =>
    tui.getInputAndPrintLoop(input)
    numOfMoves += 1;
    update()
    Ok(cont.getRaw)
  }
}
