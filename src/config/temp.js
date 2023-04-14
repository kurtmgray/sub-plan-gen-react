import { SSM } from "@aws-sdk/client-ssm";

const ssm = new SSM({ region: "us-west-1" });

export const handler = async (event, context) => {
  try {
    const prompt = `Generate a lesson plan for a ${event.gradeLevel}th grade ${event.subjectArea} 
    lesson on ${event.unit}. The lesson should be appropriate for a substitute teacher and should 
    include at least ${event.numLearningObjectives} learning objectives aligned with California 
    state standards, based on the given grade. Please direct me to any activities, assessments, 
    and necessary materials or resources.`;
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
  // console.log(await ssm.getParameter({ Name: "/openai/api_key" }));
  // const ssmParam = await ssm.getParameter({ Name: "/openai/api_key" });
  // return ssmParam.Parameter.Value;
  return "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";
}

function generateLessonPlan(prompt, apiKey) {
  console.log(apiKey);
  const data = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    temperature: 0.7,
    n: 1,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: data,
  };

  return new Promise((resolve, reject) => {
    fetch("https://api.openai.com/v1/completions", options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          console.log(data);
          resolve(data);
        } else {
          console.log(data);
          reject("Error generating lesson plan");
        }
      })
      .catch((error) => {
        reject(error);
      });
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
