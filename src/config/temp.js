import https from "https";
import { SSM } from "@aws-sdk/client-ssm";

const ssm = new SSM({ region: "us-west-1" });

export const handler = async (event, context) => {
  try {
    const prompt = `Generate a lesson plan for a ${event.gradeLevel}th grade ${event.subjectArea} lesson on ${event.unit}. The lesson should be appropriate for a substitute teacher and should include at least ${event.numLearningObjectives} learning objectives. Please direct me to any activities, assessments, and necessary materials or resources.`;
    const apiKey = await getApiKey();
    const response = await generateLessonPlan(prompt, apiKey);
    return {
      statusCode: 200,
      body: response.choices[0].text,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: "Error generating lesson plan",
    };
  }
};

async function getApiKey() {
  // API key stored at AWS Systems Manager endpoint
  const ssmParam = await ssm.getParameter({ Name: "/openai/api_key" });
  return ssmParam.Parameter.Value;
}

function generateLessonPlan(prompt, apiKey) {
  const data = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    temperature: 0.7,
    n: 1,
  });

  const options = {
    hostname: "api.openai.com",
    path: "/v1/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      //   "Content-Length": data.length, //why
    },
  };

  return new Promise((resolve, reject) => {
    console.log(https);
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        if (response.choices && response.choices.length > 0) {
          resolve(response);
        } else {
          reject("Error generating lesson plan");
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

// console.log(
//   await handler({
//     gradeLevel: "8",
//     subjectArea: "science",
//     unit: "sound waves",
//     numLearningObjectives: 2,
//   })
// );
