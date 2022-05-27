const {Moneyhub} = require("../../src/index")
const config = require("../config")

const commandLineArgs = require("command-line-args")
const commandLineUsage = require("command-line-usage")

const optionDefinitions = [
  {name: "userId", alias: "u", type: String, description: "required"},
]

const usage = commandLineUsage(
  {
    header: "Options",
    optionList: optionDefinitions,
  }
)
console.log(usage)

const {userId} = commandLineArgs(optionDefinitions)

if (!userId) throw new Error("userId is required")

const start = async () => {
  try {
    const moneyhub = await Moneyhub(config)

    const response = await moneyhub.deleteUser({userId})
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

start()
