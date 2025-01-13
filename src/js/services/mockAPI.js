export class MockAPI {
  constructor() {
    this.users = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", role: "user", is_active: true },
      { id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "admin", is_active: true },
    ];

    this.quizTypes = [
      "Python", "C#" , "Javascript"
    ];

    this.questions = {
      1: [
        { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
        { id: 2, question: "Who discovered gravity?", options: ["Newton", "Einstein", "Tesla", "Curie"] },
      ],
    };

    this.quizHistory = [];
  }

  async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async register(user) {
    await this.delay();
    const newUser = { ...user, id: this.users.length + 1, role: "user", is_active: true };
    this.users.push(newUser);
    return { message: "User registered successfully", user_id: newUser.id };
  }

  async login(credentials) {
    await this.delay();
    const user = this.users.find((u) => u.email === credentials.email && u.is_active);
    if (!user) throw { error: "Invalid credentials", status_code: 401 };
    return { access_token: "mock-jwt-token", token_type: "bearer" };
  }

  async resetPassword(email) {
    await this.delay();
    if (!this.users.find((u) => u.email === email)) {
      throw { error: "Email not found", status_code: 404 };
    }
    return { message: "Password reset link sent to email" };
  }

  async getQuizTypes() {
    await this.delay();
    return this.quizTypes;
  }

  async submitQuiz(quizId, answers) {
    await this.delay();
    const correctAnswers = { 1: "Paris", 2: "Newton" }; // Hardcoded for mock
    const score = answers.reduce((acc, ans) => (correctAnswers[ans.question_id] === ans.selected_option ? acc + 5 : acc), 0);

    const result = {
      score,
      correct_answers: answers.filter((ans) => correctAnswers[ans.question_id] === ans.selected_option).length,
      total_questions: answers.length,
      result: score > 5 ? "Pass" : "Fail",
    };

    this.quizHistory.push({ quiz_id: quizId, ...result, date: new Date().toISOString() });
    return result;
  }

  async getQuizHistory() {
    await this.delay();
    return this.quizHistory;
  }

  async startQuiz(quizType) {
    // Define mock questions for each quiz type
    const quizData = {
      python: [
        {
          question: "What is the correct file extension for Python files?",
          choices: [".py", ".python", ".pyt", ".pt"],
          answer: ".py"
        },
        {
          question: "What is the output of 3 * 'Python'?",
          choices: ["Error", "PythonPythonPython", "3", "None"],
          answer: "PythonPythonPython"
        },
        {
          question: "Which keyword is used to define a function in Python?",
          choices: ["def", "func", "function", "define"],
          answer: "def"
        }
      ],
      csharp: [
        {
          question: "What is the file extension for C# files?",
          choices: [".cs", ".c#", ".cpp", ".csharp"],
          answer: ".cs"
        },
        {
          question: "Which keyword is used to define a class in C#?",
          choices: ["class", "Class", "cls", "define"],
          answer: "class"
        },
        {
          question: "Which of these is a value type in C#?",
          choices: ["String", "Array", "Int", "Object"],
          answer: "Int"
        }
      ],
      javascript: [
        {
          question: "Which company developed JavaScript?",
          choices: ["Microsoft", "Netscape", "Sun Microsystems", "Oracle"],
          answer: "Netscape"
        },
        {
          question: "Which of the following is a way to declare a variable in JavaScript?",
          choices: ["var", "let", "const", "All of the above"],
          answer: "All of the above"
        },
        {
          question: "What is the result of '2' + 2 in JavaScript?",
          choices: ["22", "4", "NaN", "Error"],
          answer: "22"
        }
      ]
    };
  
    // Retrieve questions based on quiz type
    const quizQuestions = quizData[quizType.toLowerCase()];
  
    if (!quizQuestions) {
      console.error("Invalid quiz type selected. Available types: Python, C#, JS.");
      return;
    }
  
  
    // Return quizQuestions for further use
    return quizQuestions;
  }

  
}

    