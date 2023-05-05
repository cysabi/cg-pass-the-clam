import render from "./render"
import { animate } from "motion"
import { useState, useEffect, useRef } from "preact/hooks"
import swatch from "./swatch.png"
import clamStandby from "./clam-standby.svg"

function App() {
  return (
    <div class="flex flex-col items-start justify-start text-white w-screen h-screen">
      <Standby />
    </div>
  )
}

const topics = [
  ...Array.from({ length: 20 }).map(() => "Pass the Clam"),
  "it's not hitting the corner, trust",
]

const Standby = () => {
  const clamRef = useRef()

  const topicRef = useRef()
  const [topic, setTopic] = useState("Pass the Clam")
  useFadeText(topicRef, topic)

  useEffect(() => {
    dvd(
      clamRef.current,
      "translateX(553px) translateY(553px)",
      [true, true],
      553,
      setTopic
    )
  }, [])

  return (
    <div ref={clamRef}>
      <img src={clamStandby} />

      <div class="relative w-[38rem] h-[10rem] inset-0 flex items-center justify-center rotate-6 translate-x-[3.5rem] -translate-y-[24rem]">
        <img class="absolute w-full h-full" src={swatch} />
        <div
          ref={topicRef}
          class="absolute w-full px-8 text-center z-10 text-5xl -rotate-1 -translate-y-3"
        ></div>
      </div>
    </div>
  )
}

const dvd = (current, transform, direction, distance, setTopic) => {
  // who let me cook
  animate(
    current,
    { transform },
    { duration: distance / 200, easing: "linear" }
  ).finished.then(() => {
    const coords = current.style.transform
      .split(" ")
      .map((a) => parseInt(a.substring(11, a.length - 3)))
    const side = coords[0] === 0 || coords[0] === 1269 ? "x" : "y"
    if (side === "x") direction[0] = !direction[0]
    if (side === "y") direction[1] = !direction[1]
    const dest = [direction[0] ? 1269 : 0, direction[1] ? 553 : 0]
    const dist = Math.abs(
      [dest[0] - coords[0], dest[1] - coords[1]].reduce(absMin)
    )
    const trans = [
      coords[0] + dist * (direction[0] ? 1 : -1),
      coords[1] + dist * (direction[1] ? 1 : -1),
    ]
    setTopic(topics[Math.floor(Math.random() * topics.length)])
    dvd(
      current,
      `translateX(${trans[0]}px) translateY(${trans[1]}px)`,
      direction,
      dist,
      setTopic
    )
  })
}

const absMin = function (prev, curr) {
  return Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev
}

const useFadeText = (ref, state) => {
  useEffect(() => {
    animate(ref.current, { opacity: 0 }).finished.then(() => {
      ref.current.innerText = state
      animate(ref.current, { opacity: 1 })
    })
  }, [state])
}

render(App)
