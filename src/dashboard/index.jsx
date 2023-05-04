import { Autocomplete, TextField, createFilterOptions } from "@mui/material"
import render from "./render"
import Button from "@mui/material/Button"
import { ButtonGroup } from "@mui/material"
import { useEffect, useState } from "preact/compat"
import useReplicant from "./useReplicant"

const topics = [
  "They've got stars in their eyes",
  "Back in my day we played all 48 maps",
  "I want crab for breakfast, lunch, and dinner",
  "COPE HARDER NA",
  "Budget cuts and so forth",
  "Days Since Last Splatoon Drama: 0",
  "No, this is not a predictions segment",
]
const filter = createFilterOptions()

function App() {
  return (
    <div class="p-8 min-h-screen gap-8 flex flex-col items-center justify-evenly mx-auto w-fit">
      <div class="w-full flex flex-col gap-4">
        <Host />
        <Topic />
      </div>
      <Block i={1} />
      <Block i={2} />
      <Block i={3} />
      <Block i={4} />
    </div>
  )
}

const Topic = () => {
  const [topicReplicant, setTopicReplicant] = useReplicant({
    name: "topic",
    defaultValue: "",
  })
  const [topicState, setTopicState] = useState(undefined)
  const [topicInput, setTopicInput] = useState("")
  useEffect(() => {
    if (topicState === undefined && topicReplicant !== undefined) {
      setTopicState(topicReplicant)
      setTopicInput(topicReplicant)
    }
  }, [topicReplicant])

  return (
    <div class="flex gap-3 w-full">
      <Autocomplete
        fullWidth
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        options={topics}
        value={topicState}
        inputValue={topicInput}
        InputLabelProps={{ shrink: true }}
        renderInput={(params) => <TextField {...params} label="Topic" />}
        onChange={(e, value) => setTopicState(value)}
        onInputChange={(e, value) => setTopicInput(value)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const { inputValue } = params
          if (inputValue !== "" && !topics.some((t) => inputValue === t)) {
            filtered.push(inputValue)
          }
          return filtered
        }}
      />
      <Button
        variant="contained"
        className="shrink-0"
        disabled={topicReplicant === topicState}
        onClick={() => setTopicReplicant(topicState)}
      >
        Update Topic
      </Button>
    </div>
  )
}

const Host = () => {
  const [hostReplicant, setHostReplicant] = useReplicant({
    name: "host",
    defaultValue: "",
  })
  const [hostState, setHostState] = useState(undefined)
  useEffect(() => {
    if (hostState === undefined) setHostState(hostReplicant)
  }, [hostReplicant])

  return (
    <div class="flex gap-3 w-full">
      <TextField
        label="Host"
        variant="outlined"
        fullWidth
        value={hostState}
        InputLabelProps={{ shrink: true }}
        onChange={(event) => {
          setHostState(event.target.value)
        }}
      ></TextField>
      <Button
        variant="contained"
        className="shrink-0"
        disabled={hostReplicant === hostState}
        onClick={() => setHostReplicant(hostState)}
      >
        Update Host
      </Button>
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
    <div className="rounded-lg shadow bg-slate-700 p-4 flex flex-col gap-6">
      <div class="flex gap-3 items-baseline">
        <div className="font-bold text-2xl">{name}</div>
        <div className="text-2xl text-slate-400">•</div>
        <div className="text-xl text-slate-300">Score: </div>
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
          variant="outlined"
          disabled={score === 0}
          onClick={() => {
            setScore(0)
            setSReplicant(0)
          }}
        >
          Reset Scores
        </Button>
        <ButtonGroup variant="contained">
          <Button
            className="group"
            onClick={() => {
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
            className="group"
            color="secondary"
            onClick={() => {
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
        </ButtonGroup>
      </div>
    </div>
  )
}

render(App)
