module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);
  page.evaluate(
  document.getElementsByClassName("button_dice")[0].click();
  document.getElementsByClassName("not-shut-2")[0].click();
  document.getElementsByClassName("button_dice")[0].click();
  document.getElementsByClassName("button_undo")[0].click();
  )
  // add more ready handlers here...
};
