const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { key: 'name', question: 'Full Name: ' },
    { key: 'email', question: 'Email: ' },
    { key: 'phone', question: 'Phone: ' },
    { key: 'summary', question: 'Professional Summary: ' },
    { key: 'skills', question: 'Skills (comma separated): ' },
    { key: 'experience', question: 'Work Experience: ' },
    { key: 'education', question: 'Education: ' }
];

let answers = {};
let current = 0;

function askQuestion() {
    if (current < questions.length) {
        rl.question(questions[current].question, (answer) => {
            answers[questions[current].key] = answer;
            current++;
            askQuestion();
        });
    } else {
        rl.close();
        generateResume(answers);
    }
}

function generateResume(data) {
    const resume = `
# ${data.name}

**Email:** ${data.email}  
**Phone:** ${data.phone}

## Professional Summary
${data.summary}

## Skills
${data.skills.split(',').map(skill => `- ${skill.trim()}`).join('\n')}

## Work Experience
${data.experience}

## Education
${data.education}
    `;
    fs.writeFileSync('resume.md', resume.trim());
    console.log('Resume generated as resume.md');
}

askQuestion();