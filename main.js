const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBZ3JiIKEwS5siihp3eG8I_JeYgWDDd0PA");

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
})

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const chat = model.startChat({
    history : [],
    generationConfig : {
      maxOutputTokens : 500,
    }
  })
  async function askAndResponse() {
    rl.question("LO: ", async (msg) => {
      if (msg.toLowerCase() === "exit") {
        rl.close()
      } else {
        const result = await chat.sendMessage(msg)
        const response = await result.response
        const text = await response.text()
        console.log("AI: ", text);
        askAndResponse()
      }
    })
  }

  askAndResponse()
  // const prompt = "Kamu adalah sahabat vox, kamu bagian dari karyawan dari cretivox broadcasting network, kamu diberikan tugas untuk menanggapi semua hal yang terjadi di kantor"

  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);
}

run();