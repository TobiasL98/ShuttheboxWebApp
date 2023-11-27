package model.fileioComponent

import model.GameInterface

trait FileIOInterface {
  def load: GameInterface
  def save(grid: GameInterface): Unit
  def getRaw(grid: GameInterface): String
}
