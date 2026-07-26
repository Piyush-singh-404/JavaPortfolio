import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class PortfolioServer {

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new PortfolioHandler());
        server.setExecutor(null);
        System.out.println("Server running at http://localhost:8080");
        server.start();
    }

    static class PortfolioHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {

            // --- APNI DETAILS YAHAN CHANGE KAREIN ---
            String fullName = "Aapka Naam";
            String education = "B.Tech in Computer Science / Software Engineering";
            String profilePicUrl = "https://via.placeholder.com/150"; // Yahan apni photo ka URL daalein
            String linkedinUrl = "https://linkedin.com/in/your-profile";
            String githubUrl = "https://github.com/your-username";

            String htmlResponse = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>%s | Portfolio</title>
                    <style>
                        :root {
                            --bg: #0f172a;
                            --card-bg: #1e293b;
                            --accent: #38bdf8;
                            --text: #f8fafc;
                            --muted: #94a3b8;
                        }
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body {
                            font-family: system-ui, -apple-system, sans-serif;
                            background-color: var(--bg);
                            color: var(--text);
                            line-height: 1.6;
                            padding: 40px 20px;
                        }
                        .container { max-width: 850px; margin: 0 auto; }
                        
                        header { 
                            text-align: center; 
                            margin-bottom: 40px; 
                        }
                        .profile-img {
                            width: 140px;
                            height: 140px;
                            border-radius: 50%%;
                            object-fit: cover;
                            border: 3px solid var(--accent);
                            margin-bottom: 15px;
                        }
                        h1 { color: var(--accent); font-size: 2.5rem; margin-bottom: 6px; }
                        p.subtitle { color: var(--muted); font-size: 1.1rem; margin-bottom: 12px; }
                        p.education { color: var(--text); font-weight: 500; font-size: 1rem; margin-bottom: 15px; }
                        
                        .social-links {
                            display: flex;
                            justify-content: center;
                            gap: 15px;
                            margin-top: 10px;
                        }
                        .social-btn {
                            background-color: var(--card-bg);
                            color: var(--accent);
                            padding: 8px 16px;
                            border-radius: 6px;
                            text-decoration: none;
                            font-weight: 600;
                            border: 1px solid #334155;
                            transition: background 0.2s;
                        }
                        .social-btn:hover {
                            background-color: #334155;
                        }

                        .section { margin-bottom: 40px; }
                        h2 { border-bottom: 2px solid var(--card-bg); padding-bottom: 8px; margin-bottom: 20px; }
                        
                        .grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                            gap: 20px;
                        }
                        .card {
                            background-color: var(--card-bg);
                            padding: 20px;
                            border-radius: 8px;
                            border: 1px solid #334155;
                        }
                        .card h3 { color: var(--accent); margin-bottom: 8px; }
                        .card p { color: var(--muted); font-size: 0.95rem; }
                        
                        .tags { margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
                        .tag {
                            background-color: #334155;
                            color: var(--accent);
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 0.8rem;
                        }

                        .skills-list { display: flex; gap: 10px; flex-wrap: wrap; list-style: none; }
                        .skills-list li {
                            background: var(--card-bg);
                            padding: 8px 16px;
                            border-radius: 6px;
                            border: 1px solid #334155;
                        }

                        footer { text-align: center; color: var(--muted); margin-top: 50px; font-size: 0.9rem; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <header>
                            <img src="%s" alt="Profile Picture" class="profile-img">
                            <h1>%s</h1>
                            <p class="subtitle">Software Engineer | AI & Machine Learning</p>
                            <p class="education">🎓 %s</p>
                            
                            <div class="social-links">
                                <a href="%s" target="_blank" class="social-btn">LinkedIn</a>
                                <a href="%s" target="_blank" class="social-btn">GitHub</a>
                            </div>
                        </header>

                        <div class="section">
                            <h2>Skills</h2>
                            <ul class="skills-list">
                                <li>Java</li>
                                <li>Python</li>
                                <li>Machine Learning</li>
                                <li>Computer Vision</li>
                                <li>Data Structures & Algorithms</li>
                            </ul>
                        </div>

                        <div class="section">
                            <h2>Projects</h2>
                            <div class="grid">
                                <div class="card">
                                    <h3>AI-Emotion-Detection-System</h3>
                                    <p>Real-time facial expression and sentiment analysis system using deep learning and computer vision.</p>
                                    <div class="tags">
                                        <span class="tag">Python</span>
                                        <span class="tag">Computer Vision</span>
                                        <span class="tag">AI</span>
                                    </div>
                                </div>

                                <div class="card">
                                    <h3>Smart-Agriculture</h3>
                                    <p>IoT & Machine Learning based platform for crop health monitoring, soil analysis, and yield prediction.</p>
                                    <div class="tags">
                                        <span class="tag">IoT</span>
                                        <span class="tag">Machine Learning</span>
                                        <span class="tag">Analytics</span>
                                    </div>
                                </div>

                                <div class="card">
                                    <h3>HIRE PILOT AI</h3>
                                    <p>An autonomous AI assistant designed to streamline candidate sourcing and screening for recruitment teams.</p>
                                    <div class="tags">
                                        <span class="tag">Generative AI</span>
                                        <span class="tag">Automation</span>
                                        <span class="tag">NLP</span>
                                    </div>
                                </div>

                                <div class="card">
                                    <h3>AI-Powered Applicant Tracking System</h3>
                                    <p>Smart ATS that automatically parses resumes, ranks candidate profiles, and matches skills with job requirements.</p>
                                    <div class="tags">
                                        <span class="tag">Python</span>
                                        <span class="tag">NLP</span>
                                        <span class="tag">Resume Parser</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer>
                            <p>&copy; 2026 %s. Powered by Java Server.</p>
                        </footer>
                    </div>
                </body>
                </html>
                """.formatted(
                    fullName, 
                    profilePicUrl, 
                    fullName, 
                    education, 
                    linkedinUrl, 
                    githubUrl, 
                    fullName
                );

            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(200, htmlResponse.getBytes().length);
            
            OutputStream os = exchange.getResponseBody();
            os.write(htmlResponse.getBytes());
            os.close();
        }
    }
}