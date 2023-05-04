import render from "./render"
import nameplate from "./nameplate.png"
import useReplicant from "./replicants"
import { animate } from "motion"
import { useEffect, useRef } from "preact/hooks"

function App() {
  return (
    <div class="relative h-screen">
      <div class="absolute p-[5.5rem] gap-y-[5.5rem] gap-x-48 grid grid-cols-2 h-full w-full grid-rows-2">
        {Array.from({ length: 4 }).map((v, i) => (
          <Contestant key={i} id={i + 1} reverse={i % 2 === 0} />
        ))}
      </div>
    </div>
  )
}

const Contestant = ({ id, reverse = false }) => {
  const p1 = `98%`
  const p2 = `96%`

  const nameRef = useRef()
  const scoreRef = useRef()
  const name = useReplicant(`name${id}`, "")
  const score = useReplicant(`score${id}`, "")

  useFadeText(nameRef, name)
  useEffect(() => {
    scoreRef.current.innerText = score
    animate(scoreRef.current, { scale: 1.5 }, { duration: 0.02 }).finished.then(
      () => {
        animate(
          scoreRef.current,
          { scale: 1 },
          { duration: 0.5, easing: "ease-out" }
        )
      }
    )
  }, [score])

  return (
    <div class="relative h-full w-full -translate-x-1.5 -translate-y-1.5">
      <div class="absolute border-4 z-10 border-white h-full w-full"></div>
      <div
        class="absolute border-4 border-black h-full w-full translate-x-3 translate-y-3"
        style={{
          clipPath: `polygon(${p1} ${p2}, ${p1} 0, 100% 0, 100% 100%, 0 100%, 0 ${p2})`,
        }}
      />
      <div class="absolute z-10 h-full w-full flex items-end justify-end">
        <div
          class={`relative h-full w-full flex items-end translate-y-[5rem] ${
            reverse
              ? "justify-start translate-y-[5rem] -translate-x-16"
              : "justify-end translate-y-[5rem] translate-x-16"
          }`}
        >
          <img src={nameplate} class="absolute" />
          <div
            class={`absolute max-w-2xl h-20 w-[22rem] -translate-y-[3.25rem] -skew-y-6 flex justify-between flex-row-reverse bg-black border-4 ${
              reverse ? "translate-x-9" : "-translate-x-9"
            }`}
          >
            <div
              class={`h-full w-full flex justify-between items-center px-4 py-2 text-white text-4xl ${
                "" // reverse ? "flex-row-reverse" : ""
              }`}
            >
              <div ref={nameRef}></div>
              <div
                class={`h-full flex gap-4 items-center ${
                  "" //   reverse ? "flex-row-reverse" : ""
                }`}
              >
                <div class="w-[3px] my-auto h-12 bg-white" />
                <div class="text-center w-[2ch]">
                  <div ref={scoreRef} class="-ml-[100%] -mr-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
