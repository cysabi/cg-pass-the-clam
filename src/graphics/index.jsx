import render from "./render"
import nameplate from "./nameplate.png"
import useReplicant from "./replicants"

function App() {
  return (
    <div class="relative h-screen">
      <div class="absolute p-[5.5rem] gap-y-[5.5rem] gap-x-48 grid grid-cols-2 h-full w-full grid-rows-2">
        {Array.from({ length: 4 }).map((v, i) => (
          <Contestant key={i} id={i} reverse={i % 2 === 0} />
        ))}
      </div>
      <div class="absolute flex items-center justify-center h-full w-full">
        <Host />
      </div>
    </div>
  )
}

const Host = () => {
  const rep = useReplicant("name1", "")
  return (
    <div class="max-w-md w-full text-white">
      <svg
        viewBox="0 0 51.299133 44.07068"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.7089 2.26208C35.9065 1.55646 13.4252 2.46729 12.4992 2.75763C0.811096 6.42242 -1.43018 22.2922 7.35016 27.3059C30.6309 40.5994 30.7198 43.765 38.8509 41.3063C57.9992 35.5164 46.8823 11.2092 36.7089 2.26208Z"
          fill="#39b54a"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

const Contestant = ({ reverse = false }) => {
  const p1 = `98%`
  const p2 = `96%`
  return (
    <div class="relative h-full w-full -translate-x-1.5 -translate-y-1.5">
      <div class="absolute border-4 z-10 border-white h-full w-full">
        <iframe
          src="https://www.youtube.com/embed/_hKV9hzKN9c"
          frameborder="0"
          class="h-full w-full"
        ></iframe>
      </div>
      <div
        class="absolute border-4 border-black h-full w-full translate-x-3 translate-y-3"
        style={{
          clipPath: `polygon(${p1} ${p2}, ${p1} 0, 100% 0, 100% 100%, 0 100%, 0 ${p2})`,
        }}
      />
      <div class="absolute z-10 h-full w-full flex items-end justify-end">
        <div
          class={`relative h-full w-full flex items-end translate-y-[5rem] translate-x-16 ${
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
              <div>Kbot</div>
              <div
                class={`h-full flex gap-4 items-center ${
                  "" //   reverse ? "flex-row-reverse" : ""
                }`}
              >
                <div class="h-full w-[3px] bg-white" />
                <div class="text-center w-[2ch]">
                  <span class="-ml-[100%] -mr-[100%]">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// .team-plate-box {
// 	border: 5px solid white;
// 	background-color: black;
// 	width: 638px;
// 	height: 135px;
// 	transform: skewY(-6deg) translate(108px, 60px);
// 	display: flex;
// 	justify-content: space-between;
// 	flex-direction: row-reverse;
// }

render(App)
