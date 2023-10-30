package model
import fileioComponent.FileIOXML
import model.fileioComponent.FileIOJSON



case class Game(
    board: BoardInterface,
    w: DiceInterface,
    players: PlayerInterface,
    sum: Int
) extends GameInterface {
  val eol = sys.props("line.separator")
  var error = ""
  def this() = this(new Board(), Dice("two"), new Players(2), 0)
  def count(): Int = board.count()
  def getDice: String = w.toString
  def getSum: Int = sum
  def getPlayers: String = players.toString
  def getTurn: Int = players.getTurn
  def getBoard: String = board.toString
  def isShut(stone: Int): Boolean = board.isShut(stone)
  def getScore(player: Int): Int = players.getScore(player)
  def wuerfeln(num: Int): Game =
    if (sum != 0){
      error = "complete turn before rolling dice again"
      this
    }
    else{
      val tmp = w.wuerfeln(num)
      new Game(board, tmp, players, tmp.getSum())
    }
      

  def shut(stone: Int): Game = {
    if (stone <= sum && board.count() >= sum && !board.isShut(stone)){
      return new Game(board.shut(stone), w, players, sum - stone)
    }
    else error = "cant shut"
    this
  }
    

  def resShut(stone: Int): Game =
    if (board.isShut(stone))
      new Game(board.resShut(stone), w, players, sum + stone)
    else this

  def endMove: Game =
    new Game(new Board(9), Dice("two"), players.addScore(board.count()), 0)

  override def toString(): String ={
    val tmp = error
    error = ""
    players.toString + eol +
      board.toString + eol +
      "Gewuerfelt " + w.toString + " | Summe: " + sum +
      "\n" + tmp
  }
    
}

object Game{
  val eol = sys.props("line.separator")
  def apply(): Game = new Game(new Board(), Dice("two"), new Players(2), 0)
  def apply(kind: String) = kind match {
    case "mock" | "Mock" =>
      new Game(new Board(), Dice("mock"), new Players(2), 0)
  }
}
  
