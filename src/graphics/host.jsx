import render from "./render"
import useReplicant from "./replicants"
import { animate } from "motion"
import { useEffect, useRef } from "preact/hooks"
import swatch from "./swatch.png"
import clam from "./clam.svg"

function App() {
  return (
    <div class="relative h-screen">
      <div class="absolute flex items-center justify-center h-full w-full">
        <Host />
      </div>
    </div>
  )
}

const Host = () => {
  const hostRef = useRef()
  const topicRef = useRef()

  const hostName = useReplicant(`host`, "")
  const topic = useReplicant(`topic`, "")

  useFadeText(hostRef, hostName)
  useFadeText(topicRef, topic)

  return (
    <div class="relative w-full max-w-2xl flex flex-col items-center pt-20 text-white">
      <img src={clam} class="w-full max-w-[43rem]" />
      <div class="relative w-full max-w-xl h-36 flex items-center justify-center -mt-[7.25rem]">
        <img class="absolute w-full max-w-xl h-36" src={swatch} />
        <div
          ref={topicRef}
          class="absolute w-full text-center z-10 text-4xl -translate-y-2"
        ></div>
      </div>
      <div class="absolute bottom-0 -translate-y-32 translate-x-28 left-0 flex justify-between items-center bg-black border-4 gap-5 px-5 py-2 text-2xl text-[1.56rem] -skew-y-3 z-20">
        <div ref={hostRef}></div>
        <div class="w-[2px] h-8 bg-white" />
        <div>Host</div>
      </div>
    </div>
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
