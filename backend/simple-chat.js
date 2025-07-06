// Simple Chat Backend - Expanded Knowledge Base for Melkamu Wako
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// --- Jokes, Games, and Fun Data ---
const techJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why was the JavaScript file so lonely? Because it didn't know how to 'join'!",
  "Why did the computer go to therapy? It had too many bytes from its past.",
  "Why do programmers hate nature? It has too many bugs.",
  "Why did the coder quit their job? Because they didn't get arrays (a raise).",
  "Why was the function sad? Because it didn't get called.",
  "Why do developers drink coffee? Because the code doesn't compile itself!",
  "Why did the code cross the road? To get to the other IDE.",
  "Why was the computer cold? It left its Windows open.",
  "Why did the bug go to the party? Because it was a byte night!",
  "Why do programmers prefer using the dark? Because the light attracts bugs!",
  "Why did the computer keep sneezing? It had a bad case of the 'viruses'.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why did the programmer get stuck in the shower? The instructions on the shampoo bottle said: Lather, Rinse, Repeat.",
  "Why do programmers prefer iOS development? Because on Android, they have too many Java exceptions!"
];

const riddles = [
  { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "An echo." },
  { question: "What has keys but can't open locks?", answer: "A piano." },
  { question: "What can travel around the world while staying in a corner?", answer: "A stamp." },
  { question: "What gets wetter as it dries?", answer: "A towel." },
  { question: "What has a head, a tail, is brown, and has no legs?", answer: "A penny." }
];

const rockPaperScissors = ["rock", "paper", "scissors"];

// In-memory memory to avoid repeating the same joke/answer in a row
let lastJoke = null;
let lastRiddle = null;
let isFirstMessage = true;

// --- Main Chatbot Logic ---
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  const lower = message.toLowerCase();

  // Friendly AI introduction for the first message
  let intro = '';
  if (isFirstMessage) {
    intro = "👋 Hello! I'm Melkamu's AI Assistant. I can help you with cybersecurity, programming, games, jokes, Melkamu's background, and much more. Ask me anything!";
    isFirstMessage = false;
  }

  // --- Jokes & Fun ---
  if (lower.includes('joke') || lower.includes('make me laugh') || lower.includes('pun') || lower.includes('funny')) {
    let joke;
    do {
      joke = techJokes[Math.floor(Math.random() * techJokes.length)];
    } while (joke === lastJoke && techJokes.length > 1);
    lastJoke = joke;
    return res.json({ reply: intro ? `${intro}\n${joke}` : joke });
  }
  if (lower.includes('riddle')) {
    let riddle;
    do {
      riddle = riddles[Math.floor(Math.random() * riddles.length)];
    } while (riddle === lastRiddle && riddles.length > 1);
    lastRiddle = riddle;
    return res.json({ reply: intro ? `${intro}\n${riddle.question} (Say "answer" to get the answer!)` : riddle.question + ' (Say "answer" to get the answer!)' });
  }
  if (lower.includes('answer')) {
    // Just return a generic answer for now
    return res.json({ reply: intro ? `${intro}\nThe answer is: ${riddles[0].answer}` : 'The answer is: ' + riddles[0].answer });
  }
  if (lower.includes('rock paper scissors')) {
    return res.json({ reply: intro ? `${intro}\nLet's play! Type "rock", "paper", or "scissors".` : 'Let\'s play! Type "rock", "paper", or "scissors".' });
  }
  if (rockPaperScissors.includes(lower.trim())) {
    const aiMove = rockPaperScissors[Math.floor(Math.random() * 3)];
    let result = '';
    if (lower === aiMove) result = "It's a tie!";
    else if ((lower === 'rock' && aiMove === 'scissors') || (lower === 'paper' && aiMove === 'rock') || (lower === 'scissors' && aiMove === 'paper')) result = 'You win!';
    else result = 'I win!';
    return res.json({ reply: intro ? `${intro}\nYou: ${lower}\nAI: ${aiMove}\n${result}` : `You: ${lower}\nAI: ${aiMove}\n${result}` });
  }

  // --- Melkamu Wako Personal Background ---
  if (lower.includes('who is melkamu') || lower.includes('about you') || lower.includes('melkamu wako')) {
    return res.json({ reply: "Melkamu Wako is a passionate software engineer from Ethiopia. Born in Alle, near Konso, he moved to Addis Ababa at age 12 and attended Megabit 28 Primary and Ginbot 20 Secondary School. Now at ASTU, his journey from rural roots to city life shaped his passion for learning, growth, and using technology to make a difference." });
  }
  if (lower.includes('astu') || lower.includes('adama science')) {
    return res.json({ reply: "ASTU stands for Adama Science and Technology University, located in Adama, Ethiopia. It's known for its focus on science, engineering, and technology education." });
  }
  if (lower.includes('konso') || lower.includes('alle')) {
    return res.json({ reply: "Melkamu was born in Alle, near Konso, Ethiopia. His early years in rural Ethiopia inspired his love for learning and technology." });
  }
  if (lower.includes('hana mariam') || lower.includes('nifas silk')) {
    return res.json({ reply: "Melkamu lived in Hana Mariam, Nifas Silk-Lafto Sub-City, Addis Ababa, after moving from Alle. This city life experience broadened his perspective and opportunities." });
  }
  if (lower.includes('megabit 28') || lower.includes('ginbot 20')) {
    return res.json({ reply: "Melkamu attended Megabit 28 Primary School and Ginbot 20 Secondary School in Hana Mariam, Addis Ababa." });
  }
  if (lower.includes('upbringing') || lower.includes('background')) {
    return res.json({ reply: "Melkamu's upbringing—from rural roots to city life—shaped his passion for learning, growth, and using technology to make a difference." });
  }

  // --- Family & Friends ---
  if (lower.includes('father') || lower.includes('wako')) {
    return res.json({ reply: "Melkamu's father, Wako, is a source of inspiration and support in his life. Family values and encouragement have played a big role in Melkamu's journey." });
  }
  if (lower.includes('grandfather') || lower.includes('otika')) {
    return res.json({ reply: "Melkamu's grandfather, Otika, is remembered for his wisdom and kindness. His legacy continues to inspire Melkamu and his family." });
  }
  if (lower.includes('girlfriend')) {
    return res.json({ reply: "Melkamu's girlfriend is very special to him. He appreciates her love, support, and the happiness she brings into his life. ❤️" });
  }
  if (lower.includes('i love you')) {
    return res.json({ reply: "I love you too! 🥰" });
  }
  if (lower.includes('friend')) {
    return res.json({ reply: "Friends are an important part of Melkamu's life. He values friendship, support, and the good times shared with friends." });
  }

  // --- Cybersecurity Basics ---
  if (lower.includes('cybersecurity')) return res.json({ reply: "Cybersecurity is the practice of protecting computers, networks, and data from unauthorized access, attacks, or damage. It involves using technology, processes, and best practices to keep information safe from hackers and cyber threats." });
  if (lower.includes('firewall')) return res.json({ reply: "A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between trusted and untrusted networks." });
  if (lower.includes('encryption')) return res.json({ reply: "Encryption is the process of converting information into a code to prevent unauthorized access. Only those with the decryption key can read the original data." });
  if (lower.includes('strong password')) return res.json({ reply: "A strong password is long (at least 12 characters), uses a mix of letters, numbers, and symbols, and avoids common words or patterns. Example: G7!kLm#2pQwZ." });
  if (lower.includes('malware')) return res.json({ reply: "Malware is malicious software designed to harm, exploit, or otherwise compromise a computer system. Examples include viruses, worms, ransomware, and spyware." });
  if (lower.includes('phishing')) return res.json({ reply: "Phishing is a cyber attack where attackers trick people into revealing sensitive information (like passwords) by pretending to be a trustworthy entity, often via email or fake websites." });
  if (lower.includes('avoid hacking')) return res.json({ reply: "To avoid hacking: use strong passwords, enable two-factor authentication, keep software updated, avoid suspicious links, and use antivirus software." });
  if (lower.includes('two-factor')) return res.json({ reply: "Two-factor authentication (2FA) adds an extra layer of security by requiring a second form of verification (like a code sent to your phone) in addition to your password." });
  if (lower.includes('https')) return res.json({ reply: "HTTPS (HyperText Transfer Protocol Secure) is a secure version of HTTP. It encrypts data sent between your browser and a website, protecting it from eavesdroppers." });
  if (lower.includes('cyber attack')) return res.json({ reply: "A cyber attack is an attempt by hackers to damage, steal, or disrupt computer systems, networks, or data. Types include malware, phishing, DDoS, and more." });
  if (lower.includes('brute force')) return res.json({ reply: "A brute force attack is when an attacker tries many possible passwords or keys until they find the correct one. Strong passwords and account lockouts help prevent this." });
  if (lower.includes('botnet')) return res.json({ reply: "A botnet is a network of infected computers controlled by a hacker. Botnets are used for large-scale attacks like DDoS, spam, or spreading malware." });
  if (lower.includes('ransomware')) return res.json({ reply: "Ransomware is malware that encrypts your files and demands payment (ransom) to unlock them. Never pay the ransom—restore from backups if possible." });
  if (lower.includes('social engineering')) return res.json({ reply: "Social engineering is manipulating people into giving up confidential information. It relies on human psychology rather than technical hacking." });
  if (lower.includes('vpn')) return res.json({ reply: "A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address, making your online activity more private and secure." });
  if (lower.includes('ethical hacking')) return res.json({ reply: "Ethical hacking is legally testing computer systems for vulnerabilities to help organizations fix security issues before malicious hackers exploit them." });
  if (lower.includes('penetration testing')) return res.json({ reply: "Penetration testing (pen testing) is a simulated cyber attack on a system to find vulnerabilities before real attackers do." });
  if (lower.includes('zero-day')) return res.json({ reply: "A zero-day attack exploits a previously unknown vulnerability in software, before the developer has released a fix." });
  if (lower.includes('sql injection')) return res.json({ reply: "SQL injection is a code injection attack that allows attackers to interfere with a database query. Always use parameterized queries to prevent it." });
  if (lower.includes('cross-site scripting')) return res.json({ reply: "Cross-site scripting (XSS) is a vulnerability that allows attackers to inject malicious scripts into web pages viewed by others. Use input validation and output encoding to prevent it." });
  if (lower.includes('security audit')) return res.json({ reply: "A security audit is a thorough review of an organization's security policies, procedures, and systems to identify and fix vulnerabilities." });
  if (lower.includes('data privacy')) return res.json({ reply: "Data privacy is about protecting personal information from unauthorized access or disclosure. It involves laws, policies, and best practices to keep data safe." });
  if (lower.includes('stay safe online')) return res.json({ reply: "To stay safe online: use strong passwords, enable 2FA, avoid suspicious links, keep software updated, and be cautious about sharing personal info." });
  if (lower.includes('cookie')) return res.json({ reply: "Cookies are small files stored on your computer by websites to remember your preferences or login status. Some cookies track your activity for advertising." });
  if (lower.includes('ip address')) return res.json({ reply: "An IP address is a unique number assigned to each device on a network. It identifies your device on the internet or local network." });
  if (lower.includes('digital forensics')) return res.json({ reply: "Digital forensics is the process of investigating cybercrimes by collecting, analyzing, and preserving digital evidence from computers, networks, or devices." });
  if (lower.includes('threat actor')) return res.json({ reply: "A threat actor is any person or group that poses a security risk to computer systems. Examples: hackers, cybercriminals, insiders, or nation-states." });
  if (lower.includes('security breach')) return res.json({ reply: "A security breach is an incident where unauthorized people gain access to data, applications, or networks. It can lead to data loss or theft." });
  if (lower.includes('endpoint protection')) return res.json({ reply: "Endpoint protection is security for devices like computers, phones, and tablets. It includes antivirus, firewalls, and monitoring tools." });
  if (lower.includes('cyber hygiene')) return res.json({ reply: "Cyber hygiene means following good security habits: updating software, using strong passwords, backing up data, and being cautious online." });
  if (lower.includes('cybersecurity career')) return res.json({ reply: "Cybersecurity careers include roles like security analyst, penetration tester, incident responder, and security engineer. Start by learning basics, getting certifications, and practicing skills." });
  if (lower.includes('start cybersecurity')) return res.json({ reply: "To start in cybersecurity: learn networking basics, study security concepts, practice with online labs, get certifications (like CompTIA Security+), and join cybersecurity communities." });
  if (lower.includes('network security')) return res.json({ reply: "Network security protects computer networks from attacks and unauthorized access. It includes firewalls, intrusion detection, and secure network design." });
  if (lower.includes('application security')) return res.json({ reply: "Application security is about making software safe from attacks. It includes secure coding, code reviews, and testing for vulnerabilities." });
  if (lower.includes('cloud security')) return res.json({ reply: "Cloud security protects data and applications in cloud computing environments. It involves encryption, access control, and monitoring." });
  if (lower.includes('access control')) return res.json({ reply: "Access control determines who can view or use resources in a system. It includes authentication (who are you?) and authorization (what can you do?)." });
  if (lower.includes('authentication')) return res.json({ reply: "Authentication is verifying a user's identity, usually with a password, code, or biometric data." });
  if (lower.includes('authorization')) return res.json({ reply: "Authorization is determining what an authenticated user is allowed to do (e.g., read, write, delete data)." });
  if (lower.includes('cybersecurity policy')) return res.json({ reply: "A cybersecurity policy is a set of rules and guidelines for how an organization protects its information and systems." });
  if (lower.includes('honeypot')) return res.json({ reply: "A honeypot is a decoy system set up to attract attackers and study their methods without risking real assets." });
  if (lower.includes('incident response')) return res.json({ reply: "Incident response is the process of detecting, investigating, and recovering from cybersecurity incidents." });
  if (lower.includes('ddos')) return res.json({ reply: "A DDoS (Distributed Denial of Service) attack floods a website or service with traffic to make it unavailable to users." });
  if (lower.includes('security key')) return res.json({ reply: "A security key is a physical device (like a USB key) used for two-factor authentication to enhance account security." });
  if (lower.includes('social media risk')) return res.json({ reply: "Social media risk includes privacy breaches, scams, and oversharing personal information. Be cautious about what you share online." });
  if (lower.includes('digital identity')) return res.json({ reply: "Digital identity is the online persona of a person or organization, made up of data like usernames, accounts, and online activity." });
  if (lower.includes('digital footprint')) return res.json({ reply: "A digital footprint is the record of your online activity, including websites you visit, posts you make, and data you share." });
  if (lower.includes('cybersecurity law')) return res.json({ reply: "Cybersecurity laws are regulations that protect data and systems from cybercrime. They vary by country and include privacy, data protection, and cybercrime laws." });
  if (lower.includes('cyber expert')) return res.json({ reply: "To become a cyber expert: study security concepts, practice hands-on labs, get certifications, participate in competitions, and stay updated with new threats." });
  if (lower.includes('melkamu') && lower.includes('cybersecurity')) return res.json({ reply: "Melkamu studies cybersecurity as part of his software engineering degree at ASTU. He learns about network security, ethical hacking, and protecting systems from cyber threats." });

  // --- Competitive Programming & Logic ---
  if (lower.includes('competitive programming')) return res.json({ reply: "Competitive programming is a mental sport where participants solve algorithmic and mathematical problems using code, often under time constraints. It improves problem-solving and coding skills." });
  if (lower.includes('codeforces')) return res.json({ reply: "Codeforces is a popular online platform for competitive programming. It hosts contests, problem sets, and a community for programmers to practice and compete." });
  if (lower.includes('leetcode')) return res.json({ reply: "LeetCode is an online platform for practicing coding problems, preparing for interviews, and participating in contests. It covers algorithms, data structures, and more." });
  if (lower.includes('hackerrank')) return res.json({ reply: "HackerRank is a platform for practicing coding, data science, and interview preparation. It offers challenges in algorithms, databases, AI, and more." });
  if (lower.includes('recursion')) return res.json({ reply: "Recursion is when a function calls itself to solve a smaller instance of the same problem. It's useful for problems like tree traversal, factorial, and Fibonacci." });
  if (lower.includes('time complexity')) return res.json({ reply: "Time complexity measures how the runtime of an algorithm increases as the input size grows. Common notations: O(1), O(n), O(log n), O(n^2)." });
  if (lower.includes('big-o')) return res.json({ reply: "Big-O notation describes the upper bound of an algorithm's running time or space requirements in terms of input size. It's used to compare algorithm efficiency." });
  if (lower.includes('greedy algorithm')) return res.json({ reply: "A greedy algorithm makes the locally optimal choice at each step, hoping to find the global optimum. Examples: coin change, activity selection." });
  if (lower.includes('dynamic programming')) return res.json({ reply: "Dynamic programming (DP) is a technique for solving problems by breaking them into subproblems, solving each once, and storing their solutions. Used for optimization problems." });
  if (lower.includes('dfs')) return res.json({ reply: "DFS (Depth-First Search) is an algorithm for traversing or searching tree or graph data structures by exploring as far as possible along each branch before backtracking." });
  if (lower.includes('bfs')) return res.json({ reply: "BFS (Breadth-First Search) is an algorithm for traversing or searching tree or graph data structures by visiting all neighbors at the current depth before moving to the next level." });
  if (lower.includes('binary search')) return res.json({ reply: "Binary search is an efficient algorithm for finding an item in a sorted array by repeatedly dividing the search interval in half." });
  if (lower.includes('quicksort')) return res.json({ reply: "Quicksort is a fast sorting algorithm that uses divide-and-conquer. It picks a pivot, partitions the array, and recursively sorts the subarrays." });
  if (lower.includes('merge sort')) return res.json({ reply: "Merge sort is a stable, divide-and-conquer sorting algorithm. It divides the array into halves, sorts them, and merges the sorted halves." });
  if (lower.includes('bubble sort')) return res.json({ reply: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order." });
  if (lower.includes('stack')) return res.json({ reply: "A stack is a data structure that follows Last-In-First-Out (LIFO). You can push (add) and pop (remove) elements from the top only." });
  if (lower.includes('queue')) return res.json({ reply: "A queue is a data structure that follows First-In-First-Out (FIFO). You enqueue (add) at the back and dequeue (remove) from the front." });
  if (lower.includes('hashmap')) return res.json({ reply: "A hashmap (or dictionary) is a data structure that stores key-value pairs for fast lookup, insertion, and deletion." });
  if (lower.includes('tree traversal')) return res.json({ reply: "Tree traversal is visiting all nodes in a tree. Common types: preorder, inorder, postorder, and level-order traversal." });
  if (lower.includes('binary tree')) return res.json({ reply: "A binary tree is a tree data structure where each node has at most two children, called left and right." });
  if (lower.includes('graph')) return res.json({ reply: "A graph is a collection of nodes (vertices) connected by edges. Used to model networks, relationships, and more." });
  if (lower.includes('adjacency list')) return res.json({ reply: "An adjacency list is a way to represent a graph: each node stores a list of its neighbors." });
  if (lower.includes('adjacency matrix')) return res.json({ reply: "An adjacency matrix is a 2D array used to represent a graph, where each cell indicates if an edge exists between two nodes." });
  if (lower.includes('dijkstra')) return res.json({ reply: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights." });
  if (lower.includes('floyd-warshall')) return res.json({ reply: "Floyd-Warshall is an algorithm for finding shortest paths between all pairs of nodes in a weighted graph." });
  if (lower.includes('heap')) return res.json({ reply: "A heap is a special tree-based data structure that satisfies the heap property: in a max heap, each parent is greater than its children; in a min heap, each parent is less." });
  if (lower.includes('trie')) return res.json({ reply: "A trie is a tree-like data structure used to store strings efficiently, often used for autocomplete and spell-checking." });
  if (lower.includes('union-find')) return res.json({ reply: "Union-find (Disjoint Set Union) is a data structure for tracking a set of elements partitioned into disjoint subsets. Used in Kruskal's algorithm and network connectivity." });
  if (lower.includes('backtracking')) return res.json({ reply: "Backtracking is a technique for solving problems recursively by trying to build a solution incrementally and removing solutions that fail to satisfy constraints." });
  if (lower.includes('sliding window')) return res.json({ reply: "Sliding window is a technique for solving problems involving subarrays or substrings by maintaining a window that moves through the data." });
  if (lower.includes('two pointers')) return res.json({ reply: "Two pointers is a technique where two indices move through the data structure to solve problems efficiently, often used in searching and sorting." });
  if (lower.includes('prefix sum')) return res.json({ reply: "Prefix sum is an array where each element is the sum of all previous elements. Used to answer range sum queries efficiently." });
  if (lower.includes('bit manipulation')) return res.json({ reply: "Bit manipulation involves using bitwise operators to solve problems efficiently, often used in optimization and low-level programming." });
  if (lower.includes('xor trick')) return res.json({ reply: "The XOR trick is used to swap values or find unique elements in arrays. Example: a = a ^ b; b = a ^ b; a = a ^ b;" });
  if (lower.includes('hard problem')) return res.json({ reply: "To solve hard problems: break them into smaller parts, look for patterns, try brute force, optimize, and practice regularly. Don't give up!" });
  if (lower.includes('memoization')) return res.json({ reply: "Memoization is storing the results of expensive function calls and returning the cached result when the same inputs occur again. Used in dynamic programming." });
  if (lower.includes('tabulation')) return res.json({ reply: "Tabulation is a bottom-up approach to dynamic programming, where you solve all subproblems and build up the solution in a table." });
  if (lower.includes('number theory')) return res.json({ reply: "Number theory is a branch of mathematics dealing with integers, divisibility, primes, and modular arithmetic. Important in cryptography and algorithms." });
  if (lower.includes('modular arithmetic')) return res.json({ reply: "Modular arithmetic deals with remainders. Example: 7 mod 3 = 1. Used in hashing, cryptography, and competitive programming." });
  if (lower.includes('gcd') || lower.includes('lcm')) return res.json({ reply: "GCD (Greatest Common Divisor) is the largest number that divides two numbers. LCM (Least Common Multiple) is the smallest number divisible by both. Use Euclidean algorithm for GCD." });
  if (lower.includes('sieve of eratosthenes')) return res.json({ reply: "The Sieve of Eratosthenes is an efficient algorithm to find all prime numbers up to a given limit by marking multiples of each prime." });
  if (lower.includes('prime factorization')) return res.json({ reply: "Prime factorization is breaking a number into its prime factors. Example: 12 = 2 x 2 x 3." });
  if (lower.includes('combinatorics')) return res.json({ reply: "Combinatorics is the study of counting, arrangements, and combinations. Used in probability, algorithms, and competitive programming." });
  if (lower.includes('probability logic')) return res.json({ reply: "Probability logic combines probability theory and logic to solve problems involving uncertainty and reasoning." });
  if (lower.includes('binary search tree')) return res.json({ reply: "A binary search tree (BST) is a binary tree where each node has a value greater than all nodes in its left subtree and less than all nodes in its right subtree." });
  if (lower.includes('segment tree')) return res.json({ reply: "A segment tree is a data structure for answering range queries and updates efficiently on arrays." });
  if (lower.includes('fenwick tree')) return res.json({ reply: "A Fenwick tree (Binary Indexed Tree) is a data structure for efficiently computing prefix sums and updates in logarithmic time." });
  if (lower.includes('practice cp') || lower.includes('how does melkamu practice cp')) return res.json({ reply: "Melkamu practices competitive programming on platforms like Codeforces, LeetCode, and HackerRank. He solves problems daily, participates in contests, and studies algorithms and data structures." });

  // --- Professional, Career, and Tech Skills Advice ---
  if (lower.includes('how to write a professional resume')) return res.json({ reply: "To write a professional resume: use a clean format, highlight your achievements, tailor it to the job, use action verbs, and keep it concise (1-2 pages). Include contact info, education, experience, and relevant skills." });
  if (lower.includes('tips for a job interview')) return res.json({ reply: "Job interview tips: research the company, practice common questions, dress professionally, be on time, show confidence, and ask thoughtful questions. Follow up with a thank-you note." });
  if (lower.includes('how to prepare for coding interviews')) return res.json({ reply: "Prepare for coding interviews by practicing algorithms and data structures, solving problems on LeetCode or HackerRank, reviewing system design basics, and practicing mock interviews." });
  if (lower.includes('best programming languages for beginners')) return res.json({ reply: "Best programming languages for beginners: Python (easy syntax), JavaScript (web development), and Java (widely used). Start with one and build projects to learn." });
  if (lower.includes('what skills are employers looking for')) return res.json({ reply: "Employers look for technical skills, problem-solving, teamwork, communication, adaptability, and a willingness to learn. Soft skills are as important as hard skills." });
  if (lower.includes('how to build a personal brand')) return res.json({ reply: "Build a personal brand by showcasing your work online, sharing knowledge, networking, and maintaining a professional online presence (LinkedIn, portfolio website)." });
  if (lower.includes('what is linkedin networking')) return res.json({ reply: "LinkedIn networking is connecting with professionals, sharing insights, and building relationships to advance your career. Engage with posts, join groups, and reach out politely." });
  if (lower.includes('how to improve communication skills')) return res.json({ reply: "Improve communication skills by practicing active listening, speaking clearly, asking questions, and seeking feedback. Join clubs or take courses to practice." });
  if (lower.includes('how to ask for a raise')) return res.json({ reply: "To ask for a raise: prepare evidence of your achievements, research salary benchmarks, choose the right time, and communicate your value confidently and professionally." });
  if (lower.includes('how to manage time effectively')) return res.json({ reply: "Manage time by setting priorities, using to-do lists, breaking tasks into steps, avoiding multitasking, and taking regular breaks. Tools like calendars and timers help." });
  if (lower.includes('what is agile methodology')) return res.json({ reply: "Agile methodology is an iterative approach to software development that values collaboration, flexibility, and customer feedback. Common frameworks: Scrum, Kanban." });
  if (lower.includes('how to work well in a team')) return res.json({ reply: "Work well in a team by communicating openly, respecting others, sharing responsibilities, and supporting teammates. Be reliable and open to feedback." });
  if (lower.includes('how to set career goals')) return res.json({ reply: "Set career goals by identifying your interests, researching opportunities, setting SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound), and tracking progress." });
  if (lower.includes('what is project management')) return res.json({ reply: "Project management is planning, organizing, and overseeing projects to achieve specific goals. It involves managing resources, timelines, and risks." });
  if (lower.includes('how to handle work stress')) return res.json({ reply: "Handle work stress by taking breaks, prioritizing tasks, practicing mindfulness, exercising, and seeking support when needed. Balance work and personal life." });
  if (lower.includes('how to give a great presentation')) return res.json({ reply: "Give a great presentation by knowing your audience, organizing your content, practicing delivery, using visuals, and engaging with your audience." });
  if (lower.includes('what is critical thinking')) return res.json({ reply: "Critical thinking is analyzing facts objectively to make reasoned judgments. It involves questioning assumptions, evaluating evidence, and considering alternatives." });
  if (lower.includes('how to learn new technologies fast')) return res.json({ reply: "Learn new technologies fast by building small projects, following tutorials, reading documentation, and practicing regularly. Join communities for support." });
  if (lower.includes('how to start freelancing')) return res.json({ reply: "Start freelancing by identifying your skills, creating a portfolio, joining freelance platforms, networking, and delivering quality work to build your reputation." });
  if (lower.includes('how to find an internship')) return res.json({ reply: "Find internships by searching online job boards, networking, attending career fairs, and reaching out to companies directly. Tailor your resume and cover letter." });
  if (lower.includes('how to get certifications')) return res.json({ reply: "Get certifications by choosing relevant ones for your field, studying the material, taking practice exams, and registering for the official test." });
  if (lower.includes('what is continuous learning')) return res.json({ reply: "Continuous learning is regularly updating your skills and knowledge to stay current in your field. It involves taking courses, reading, and practicing new skills." });
  if (lower.includes('how to write professional emails')) return res.json({ reply: "Write professional emails by using a clear subject, greeting, concise message, polite tone, and proper closing. Proofread before sending." });
  if (lower.includes('how to handle workplace conflict')) return res.json({ reply: "Handle workplace conflict by staying calm, listening to all sides, communicating openly, and seeking a solution that works for everyone." });
  if (lower.includes('what is a mentor')) return res.json({ reply: "A mentor is an experienced person who provides guidance, advice, and support to help you grow professionally or personally." });
  if (lower.includes('how to ask for feedback')) return res.json({ reply: "Ask for feedback by being open, specific about what you want to improve, and thanking the person for their input. Use feedback to grow." });
  if (lower.includes('how to stay motivated at work')) return res.json({ reply: "Stay motivated by setting goals, celebrating achievements, seeking new challenges, and maintaining a positive work environment." });
  if (lower.includes('what is professional networking')) return res.json({ reply: "Professional networking is building relationships with others in your field to exchange information, support, and opportunities." });
  if (lower.includes('how to improve problem-solving skills')) return res.json({ reply: "Improve problem-solving by practicing with puzzles, learning algorithms, analyzing problems, and reflecting on solutions. Collaborate with others for new perspectives." });
  if (lower.includes('how to work remotely effectively')) return res.json({ reply: "Work remotely effectively by setting a routine, creating a dedicated workspace, communicating clearly, and using collaboration tools." });
  if (lower.includes('how to keep a work-life balance')) return res.json({ reply: "Keep work-life balance by setting boundaries, prioritizing self-care, scheduling downtime, and disconnecting from work after hours." });
  if (lower.includes('what is emotional intelligence')) return res.json({ reply: "Emotional intelligence is the ability to understand and manage your own emotions and those of others. It helps in communication, teamwork, and leadership." });
  if (lower.includes('how to develop leadership skills')) return res.json({ reply: "Develop leadership skills by taking initiative, learning from leaders, seeking feedback, and practicing decision-making and communication." });
  if (lower.includes('what is effective teamwork')) return res.json({ reply: "Effective teamwork is collaborating with others to achieve common goals, using clear communication, trust, and shared responsibility." });
  if (lower.includes('how to create a portfolio')) return res.json({ reply: "Create a portfolio by showcasing your best work, including project descriptions, links, and your role. Use a personal website or platforms like GitHub or Behance." });
  if (lower.includes('what is version control')) return res.json({ reply: "Version control is a system for tracking changes to code or documents. Git is a popular tool for version control, allowing collaboration and history tracking." });
  if (lower.includes('how to prepare for technical tests')) return res.json({ reply: "Prepare for technical tests by reviewing key concepts, practicing sample questions, and timing yourself. Focus on problem areas and practice coding." });
  if (lower.includes('how to negotiate salary')) return res.json({ reply: "Negotiate salary by researching market rates, knowing your value, being confident, and discussing benefits as well as pay." });
  if (lower.includes('how to build confidence')) return res.json({ reply: "Build confidence by setting small goals, celebrating progress, practicing skills, and maintaining a positive mindset." });
  if (lower.includes('how to write a cover letter')) return res.json({ reply: "Write a cover letter by addressing the hiring manager, explaining why you're a good fit, and highlighting relevant experience. Keep it concise and tailored." });
  if (lower.includes('what are soft skills')) return res.json({ reply: "Soft skills are personal attributes like communication, teamwork, adaptability, and problem-solving that help you work well with others." });
  if (lower.includes('how to stay productive')) return res.json({ reply: "Stay productive by setting clear goals, minimizing distractions, taking breaks, and using productivity tools like to-do lists and calendars." });
  if (lower.includes('what is professional etiquette')) return res.json({ reply: "Professional etiquette is the set of rules for polite, respectful behavior in the workplace, including communication, dress, and punctuality." });
  if (lower.includes('how to manage multiple projects')) return res.json({ reply: "Manage multiple projects by prioritizing tasks, using project management tools, delegating when possible, and tracking progress regularly." });
  if (lower.includes('how to build technical skills')) return res.json({ reply: "Build technical skills by taking courses, practicing regularly, building projects, and staying updated with new technologies." });
  if (lower.includes('what is continuous integration')) return res.json({ reply: "Continuous integration is a development practice where code changes are automatically tested and merged, helping catch issues early and improve collaboration." });
  if (lower.includes('how to contribute to open source')) return res.json({ reply: "Contribute to open source by finding projects that interest you, reading contribution guidelines, fixing bugs, and submitting pull requests." });
  if (lower.includes('how to network at conferences')) return res.json({ reply: "Network at conferences by introducing yourself, attending sessions, asking questions, and following up with new contacts afterward." });
  if (lower.includes('what is time management')) return res.json({ reply: "Time management is organizing and planning how to divide your time between activities to work efficiently and meet deadlines." });
  if (lower.includes('how to handle failure professionally')) return res.json({ reply: "Handle failure professionally by learning from mistakes, staying positive, seeking feedback, and using setbacks as opportunities for growth." });

  // --- Tech Skills & Study Help ---
  if (lower.includes('how to learn python fast')) return res.json({ reply: "Learn Python fast by following tutorials, building small projects, practicing coding daily, and joining Python communities for support." });
  if (lower.includes('what is object-oriented programming')) return res.json({ reply: "Object-oriented programming (OOP) is a programming paradigm based on objects and classes. It uses concepts like inheritance, encapsulation, and polymorphism." });
  if (lower.includes('how to write clean code')) return res.json({ reply: "Write clean code by using meaningful names, keeping functions short, writing comments, and following consistent formatting and best practices." });
  if (lower.includes('what is data structure')) return res.json({ reply: "A data structure is a way of organizing and storing data for efficient access and modification. Examples: arrays, lists, stacks, queues, trees, graphs." });
  if (lower.includes('how to debug code efficiently')) return res.json({ reply: "Debug code efficiently by using print statements, debuggers, checking error messages, and isolating the problem step by step." });
  if (lower.includes('what is software testing')) return res.json({ reply: "Software testing is the process of evaluating software to find and fix bugs. Types include unit, integration, and system testing." });
  if (lower.includes('how to use github')) return res.json({ reply: "Use GitHub to host code, collaborate with others, track changes, and contribute to open source. Learn basic Git commands to get started." });
  if (lower.includes('what is cloud computing')) return res.json({ reply: "Cloud computing is delivering computing services (servers, storage, databases, networking, software) over the internet. Examples: AWS, Azure, Google Cloud." });
  if (lower.includes('how to build a website')) return res.json({ reply: "Build a website by learning HTML, CSS, and JavaScript. Use frameworks like React or Vue for dynamic sites, and host your site on platforms like Netlify or Vercel." });
  if (lower.includes('what is rest api')) return res.json({ reply: "A REST API is an interface that allows applications to communicate over HTTP using standard methods like GET, POST, PUT, and DELETE." });
  if (lower.includes('how to learn sql')) return res.json({ reply: "Learn SQL by practicing queries, building sample databases, and using online resources. Focus on SELECT, INSERT, UPDATE, DELETE, and JOIN operations." });
  if (lower.includes('what is machine learning')) return res.json({ reply: "Machine learning is a field of AI where computers learn from data to make predictions or decisions without being explicitly programmed." });
  if (lower.includes('how to write algorithms')) return res.json({ reply: "Write algorithms by breaking problems into steps, using pseudocode, and testing with sample inputs. Practice with common algorithm problems." });
  if (lower.includes('what is devops')) return res.json({ reply: "DevOps is a set of practices that combines software development and IT operations to shorten the development lifecycle and deliver high-quality software." });
  if (lower.includes('how to learn javascript')) return res.json({ reply: "Learn JavaScript by following tutorials, building interactive web pages, and practicing regularly. Use online platforms like freeCodeCamp or Codecademy." });
  if (lower.includes('what is responsive design')) return res.json({ reply: "Responsive design ensures websites look good on all devices by using flexible layouts, images, and CSS media queries." });
  if (lower.includes('how to prepare for exams')) return res.json({ reply: "Prepare for exams by reviewing notes, practicing past questions, making a study schedule, and taking regular breaks to stay focused." });
  if (lower.includes('what is pair programming')) return res.json({ reply: "Pair programming is a practice where two programmers work together at one workstation, collaborating on code and sharing ideas." });
  if (lower.includes('how to build mobile apps')) return res.json({ reply: "Build mobile apps by learning platforms like Android (Java/Kotlin), iOS (Swift), or cross-platform tools like Flutter and React Native." });
  if (lower.includes('what is database normalization')) return res.json({ reply: "Database normalization is organizing data to reduce redundancy and improve integrity. It involves dividing tables and defining relationships." });
  if (lower.includes('how to write documentation')) return res.json({ reply: "Write documentation by explaining how your code works, providing examples, and keeping it clear and up to date. Use tools like Markdown or JSDoc." });
  if (lower.includes('what is cybersecurity basics')) return res.json({ reply: "Cybersecurity basics include protecting devices and data from threats, using strong passwords, updating software, and being aware of phishing and malware." });
  if (lower.includes('how to improve coding speed')) return res.json({ reply: "Improve coding speed by practicing regularly, using keyboard shortcuts, and learning your development tools well." });
  if (lower.includes('what is encryption')) return res.json({ reply: "Encryption is converting data into a coded form to prevent unauthorized access. Only those with the key can decrypt and read the data." });
  if (lower.includes('how to use command line')) return res.json({ reply: "Use the command line to navigate files, run programs, and automate tasks. Learn basic commands like cd, ls, mkdir, rm, and touch." });
  if (lower.includes('what is api testing')) return res.json({ reply: "API testing checks if your APIs work as expected. It involves sending requests, checking responses, and validating data and error handling." });
  if (lower.includes('how to handle exceptions')) return res.json({ reply: "Handle exceptions by using try-catch blocks, logging errors, and providing meaningful error messages to users." });
  if (lower.includes('what is asynchronous programming')) return res.json({ reply: "Asynchronous programming allows tasks to run in the background, improving performance. In JavaScript, use callbacks, promises, or async/await." });
  if (lower.includes('how to learn data science')) return res.json({ reply: "Learn data science by studying statistics, Python, data analysis libraries (Pandas, NumPy), and practicing with real datasets." });
  if (lower.includes('what is software architecture')) return res.json({ reply: "Software architecture is the high-level structure of a software system, defining how components interact and are organized." });
  if (lower.includes('how to implement algorithms')) return res.json({ reply: "Implement algorithms by understanding the logic, writing code step by step, and testing with different inputs." });
  if (lower.includes('what is functional programming')) return res.json({ reply: "Functional programming is a paradigm where programs are built using pure functions, avoiding shared state and side effects." });
  if (lower.includes('how to prepare coding projects')) return res.json({ reply: "Prepare coding projects by planning features, designing architecture, setting up version control, and breaking work into tasks." });
  if (lower.includes('what is network security')) return res.json({ reply: "Network security protects computer networks from attacks and unauthorized access using firewalls, encryption, and monitoring." });
  if (lower.includes('how to use docker')) return res.json({ reply: "Use Docker to package applications into containers for easy deployment. Learn basic commands: docker build, run, pull, and push." });
  if (lower.includes('what is agile scrum')) return res.json({ reply: "Agile Scrum is a framework for managing projects with short iterations (sprints), daily standups, and regular reviews to improve teamwork and delivery." });
  if (lower.includes('how to manage databases')) return res.json({ reply: "Manage databases by designing schemas, using SQL for queries, backing up data, and monitoring performance." });
  if (lower.includes('what is version control')) return res.json({ reply: "Version control tracks changes to code, allowing collaboration and history tracking. Git is the most popular version control system." });
  if (lower.includes('how to write unit tests')) return res.json({ reply: "Write unit tests by creating small tests for individual functions or components to ensure they work as expected. Use frameworks like Jest or Mocha." });
  if (lower.includes('what is cloud storage')) return res.json({ reply: "Cloud storage lets you save data online and access it from anywhere. Examples: Google Drive, Dropbox, AWS S3." });
  if (lower.includes('how to improve problem-solving')) return res.json({ reply: "Improve problem-solving by practicing coding challenges, learning algorithms, and analyzing different solutions." });
  if (lower.includes('what is artificial intelligence')) return res.json({ reply: "Artificial intelligence (AI) is the simulation of human intelligence in machines, enabling them to learn, reason, and solve problems." });
  if (lower.includes('how to learn linux commands')) return res.json({ reply: "Learn Linux commands by practicing in the terminal, following tutorials, and using cheat sheets for common commands." });
  if (lower.includes('what is api documentation')) return res.json({ reply: "API documentation explains how to use an API, including endpoints, parameters, and examples. Good docs help developers integrate easily." });
  if (lower.includes('how to improve code readability')) return res.json({ reply: "Improve code readability by using clear names, consistent formatting, comments, and breaking code into small functions." });
  if (lower.includes('what is continuous delivery')) return res.json({ reply: "Continuous delivery is a practice where code changes are automatically prepared for release, enabling frequent and reliable deployments." });
  if (lower.includes('how to automate testing')) return res.json({ reply: "Automate testing by writing scripts or using tools to run tests automatically, saving time and catching bugs early." });
  if (lower.includes('what is big data')) return res.json({ reply: "Big data refers to extremely large datasets that require special tools and techniques to store, process, and analyze." });
  if (lower.includes('how to learn algorithms and data structures')) return res.json({ reply: "Learn algorithms and data structures by studying theory, practicing problems, and building projects that use them." });
  if (lower.includes('what is blockchain technology')) return res.json({ reply: "Blockchain is a decentralized digital ledger that records transactions securely and transparently. It's used in cryptocurrencies and more." });

  // --- Fallback to OpenAI for anything else ---
  if (!process.env.OPENAI_API_KEY) {
    return res.json({ reply: intro ? `${intro}\nSorry, I cannot process your request right now. Please try again later.` : 'Sorry, I cannot process your request right now. Please try again later.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 200
    });
    const aiReply = completion.choices[0].message.content;
    res.json({ reply: intro ? `${intro}\n${aiReply}` : aiReply });
  } catch (err) {
    res.status(500).json({ error: 'AI request failed', details: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple chat backend running on port ${PORT}`);
}); 