import { Schema, model } from "mongoose";

const examSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        choices: {
          type: [
            {
              choice: String,
              description: String,
            },
          ],
          required: true,
          max: [4, "Choices can't be more than 4"],
          min: [4, "Choices can't be less than 4"],
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

const Exams = model("Exams", examSchema);

export default Exams;
