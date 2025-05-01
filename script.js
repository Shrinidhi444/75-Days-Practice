
document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

function initChatbot() {
    const chatbotHTML = `
        <div class="chatbot-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="chatbot-container">
            <div class="chatbot-header">
                <div class="chatbot-avatar">
                    🤖
                </div>
                <div class="chatbot-title">
                    <h3>Portfolio Assistant</h3>
                    <p>Ask me about Shrinidhi</p>
                </div>
            </div>
            <div class="chatbot-messages" id="chatMessages">
                <div class="message bot-message">
                    <div class="message-content">
                        Hi there! I'm Shrinidhi's assistant. Ask me about his skills, projects, or education.
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="userInput" placeholder="Type your message..." autocomplete="off">
                <button id="sendMessage">➡️</button>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = chatbotHTML;
    document.body.appendChild(wrapper);

    const toggle = document.querySelector('.chatbot-toggle');
    const container = document.querySelector('.chatbot-container');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('userInput');
    const send = document.getElementById('sendMessage');

    toggle.addEventListener('click', () => {
        container.classList.toggle('active');
        if (container.classList.contains('active')) input.focus();
    });

    const sendMessage = () => {
        const msg = input.value.trim();
        if (!msg) return;
        addMessage(msg, 'user');
        input.value = '';
        setTimeout(() => {
            const reply = getBotResponse(msg);
            addMessage(reply, 'bot');
        }, 500);
    };

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = getCurrentTime();
        div.appendChild(content);
        div.appendChild(time);
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m} ${ampm}`;
    }

    function getBotResponse(msg) {
        const txt = msg.toLowerCase();
        const responses = [
            { patterns: ['name'], response: 'My name is Shrinidhi Shrenik Pandit.' },
            { patterns: ['contact', 'email', 'phone'], response: 'Email: shrinidhipandit02@gmail.com | Phone: +91 7447640454' },
            { patterns: ['education', 'college', 'school'], response: 'B.Tech in Computer Science from Walchand Institute Of Technology (9.72 CGPA).' },
            { patterns: ['skills', 'languages', 'technologies'], response: 'Python, Java, C, HTML, CSS, Springboot, SQL, Git, AWS.' },
            { patterns: ['projects', 'work'], response: 'Projects: Password Analyzer, Rock-Paper-Scissors Game, Spring Java Login App.' },
            { patterns: ['certifications', 'achievements'], response: 'AI-900, Google Cloud Career Launchpad, Agile Scrum.' },
            { patterns: ['activities', 'hackathon'], response: 'Smart India Hackathon 2024, GATE 2025, ISTE class coordinator.' },
            { patterns: ['resume', 'cv'], response: 'Please check the Contact section or email me for my resume.' }
        ];
        for (let r of responses) {
            if (r.patterns.some(p => txt.includes(p))) return r.response;
        }
        return "I'm not sure about that. Try asking about my skills, education, or contact info.";
    }
}
