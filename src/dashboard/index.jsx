import { TextField } from "@mui/material"
import render from "./render"
import Button from "@mui/material/Button"
import { useEffect, useState } from "preact/compat"
import useReplicant from "./useReplicant"

function App() {
  return (
    <div class="p-8 h-screen gap-8 flex flex-col items-center">
      <Block i={1} />
      <Block i={2} />
      <Block i={3} />
      <Block i={4} />
    </div>
  )
}

const Block = ({ i }) => {
  const [replicant, setReplicant] = useReplicant({
    name: `name${i}`,
    defaultValue: "",
  })
  const [name, setName] = useState(undefined)
  useEffect(() => {
    if (name === undefined) setName(replicant)
  }, [replicant])

  const [sreplicant, setSReplicant] = useReplicant({
    name: `score${i}`,
    defaultValue: 0,
  })
  const [score, setScore] = useState(undefined)
  useEffect(() => {
    if (score === undefined) setScore(sreplicant)
  }, [sreplicant])

  return (
    <div className="rounded-lg shadow-lg bg-[#525f78] p-4 flex flex-col gap-6">
      <div class="flex gap-3 items-baseline">
        <div className="font-bold text-2xl">{name}</div>
        <div className="text-2xl text-slate-400">•</div>
        <div className="text-xl text-[rgba(255,255,255,0.7)]">Score: </div>
        <div className="text-2xl font-mono font-bold leading-none">{score}</div>
      </div>
      <div class="flex gap-3">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setName(event.target.value)
          }}
        ></TextField>
        <Button
          variant="outlined"
          disabled={replicant === name}
          onClick={() => {
            setReplicant(name)
          }}
        >
          Update Name
        </Button>
        <Button
          variant="contained"
          className="group"
          onClick={() => {
            if (isNaN(score)) {
              setScore(0)
              setSReplicant(0)
            }
            setScore(score + 1)
            setSReplicant(score + 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black group-hover:text-white transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        <Button
          variant="contained"
          className="group"
          color="secondary"
          onClick={() => {
            if (isNaN(score)) {
              setScore(0)
              setSReplicant(0)
            }
            setScore(score - 1)
            setSReplicant(score - 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black group-hover:text-white transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}

render(App)
