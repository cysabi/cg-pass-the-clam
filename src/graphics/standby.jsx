import render from "./render"
import useReplicant from "./replicants"
import { animate } from "motion"
import { useEffect, useRef } from "preact/hooks"
import swatch from "./swatch.png"
import clamStandby from "./clam-standby.svg"

function App() {
  return (
    <div class="flex flex-col items-start justify-start text-white w-screen h-screen">
      <Standby />
    </div>
  )
}

const dvd = (current, transform, direction, distance) => {
  animate(
    current,
    { transform },
    { duration: distance / 300, easing: "linear" }
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
    console.log(direction, coords, trans)
    dvd(
      current,
      `translateX(${trans[0]}px) translateY(${trans[1]}px)`,
      direction,
      dist
    )
  })
}

const absMin = function (prev, curr) {
  return Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev
}

const Standby = () => {
  const clamRef = useRef()

  //   const hostRef = useRef()
  //   const hostName = useReplicant(`host`, "")
  //   useFadeText(hostRef, hostName)

  //   const topicRef = useRef()
  //   const topic = useReplicant(`topic`, "")
  //   useFadeText(topicRef, topic)

  //   1269

  useEffect(() => {
    dvd(
      clamRef.current,
      "translateX(553px) translateY(553px)",
      [true, true],
      553
    )
  }, [])

  return (
    <>
      <img ref={clamRef} src={clamStandby} />

      {/* <div class="absolute inset-0 flex items-center justify-center">
        <img class="absolute w-full max-w-xl h-36" src={swatch} />
        <div
          ref={topicRef}
          class="absolute w-full text-center z-10 text-4xl -translate-y-2"
        ></div>
      </div> */}
      {/* <div class="absolute bottom-0 -translate-y-32 translate-x-28 left-0 flex justify-between items-center bg-black border-4 gap-5 px-5 py-2 text-2xl text-[1.56rem] -skew-y-3 z-20">
        <div ref={hostRef}></div>
        <div class="w-[2px] h-8 bg-white" />
        <div>Standby</div>
      </div> */}
    </>
  )
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
