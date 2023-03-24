export const menuOptions = {
  gradeLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  subjectArea: [
    "Math",
    "Science",
    "History",
    "Language Arts",
    "Spanish",
    "French",
    "Band",
    "Orchestra",
    "Physical Education",
    "Culinary Arts",
    "Photography",
  ],
  learningObjectivesMax: 5,
};
export const formatValue = (value) => {
  const lower = value.toLowerCase();
  const array = lower.split("");
  return array
    .map((char) => {
      char === " " && (char = "-");
      return char;
    })
    .join("");
};
