# Codrill - CLI Algorithm Training Package 🚀

Codrill is a CLI-based algorithm training tool designed to help you practice solving coding problems. It provides various challenges ranging from easy to hard, with live feedback on your code submissions. Improve your problem-solving skills and become a better coder, one challenge at a time! 💻✨

---

## Features ✨

- **Multiple Algorithms**: Practice various algorithms and data structure problems 🧠.
- **Instant Feedback**: Get immediate feedback on your code 💬.
- **CLI Interface**: Work directly from your terminal 💻.
- **Multiple Attempts**: Retry your solutions if they don't work the first time 🔄.
- **Difficulty Levels**: Solve problems with varying difficulty levels (Easy, Medium, Hard) ⚖️.
- **Code Submission**: Write JavaScript code to solve problems and test against the expected outputs 📝.

---

## Installation 📦

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/codrill.git
cd codrill
```

### 2. Install dependencies
Codrill uses Node.js, so make sure you have it installed. You can then install the required dependencies using npm:

```bash
npm install
```

### 3. Make the codrill file executable 🖥️
If you want to use the CLI tool globally, you need to link the tool to your global npm directory.

- Link the tool globally:
```bash
sudo npm link
```

This command will link codrill to your system's npm directory, allowing you to run the CLI tool globally without needing to specify the file path. 🌍
---

## Usage 🚀
Once installed, you can use the codrill CLI tool directly from your terminal.

### 1. Start Codrill
To start practicing problems, simply run the following command:

```bash
codrill
```

This will start the interactive challenge session where you'll be prompted to solve problems. 💡

### 2. Choose Difficulty Level
When prompted, you can choose from different difficulty levels:

- Easy 😌
- Medium 😎
- Hard 💥

### 3. Submit Your Solution
For each problem, you'll need to write your solution in JavaScript and submit it. The program will evaluate your solution and let you know if it's correct ✅ or if you need to make any changes 🔄.
---
## Updating File Permissions with chmod 🔐
If you encounter any permission issues, you may need to adjust the file permissions to make your codrill file executable.
- Check current permissions:
```bash
ls -l
```
- Change the permissions to make the file executable:
```bash
chmod +x /path/to/codrill
```
This ensures that the codrill file is executable and can be run from the terminal. ⚙️
---
## Problem Set 🔎
Codrill comes with a variety of algorithmic challenges, such as:

- Reverse a string 🔄
- Find the largest number in an array 🔢
- Palindrome check 🪞
- Fibonacci sequence 📈
- Factorial of a number 🔢
- And many more... 🧩

Each problem will have its own input, output, and description, helping you practice essential coding skills.
---
## Contributing 🤝
We welcome contributions! If you'd like to add new problems, improve the existing ones, or fix bugs, feel free to open a pull request. Here's how you can contribute:
---
## Fork the repository 🍴.
1. Create a new branch: `git checkout -b new-feature`
2. Make your changes and commit them: `git commit -m "Add new problem"`.
3. Push to the branch: `git push origin new-feature`.
4. Open a pull request.
---
## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.
---
## Support 🧑‍💻
If you run into any issues or have questions, feel free to create an issue or reach out to the project maintainers. 🎧

Happy Coding! ✨💻
