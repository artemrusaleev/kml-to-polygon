const input = document.querySelector("#input")
let target = ""
input.addEventListener("change", async (e) => {
  document.querySelector(".target").innerHTML = ""
  const file = e.target.files[0]
  target = await file.text()
  parser = new DOMParser()
  const xmlDoc = parser.parseFromString(target, "text/xml")
  const temp = xmlDoc.querySelectorAll("coordinates")
  temp.forEach((el) => {
    let parent = el.closest("Placemark")
    let title = parent
      .querySelector("description")
      .textContent.split("<br/>")[0]
    convert(el.textContent.split(" "), title)
  })
})

function convert(coordinates, title) {
  let fragment = document.createDocumentFragment()
  let temp = []
  let final = []
  coordinates.forEach((el) => {
    return temp.push(el.split(","))
  })
  temp.forEach((el) => {
    return final.push(el.join(" ") + ",".split(""))
  })
  let h2 = document.createElement("h2")
  let p = document.createElement("p")
  h2.textContent = title
  console.log(final)
  p.textContent = `POLYGON((${final
    .join(" ")
    .substring(0, final.join(" ").length - 1)}))`
  fragment.append(h2)
  fragment.append(p)
  document.querySelector(".target").append(fragment)
}
