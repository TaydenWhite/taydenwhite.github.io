---
title: About Me
linkTitle: About Me
url: "/about-me/"
menu: {main: {weight: 20}}
cascade:
  - type: "docs"
no_list: true
---

<style>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-module {
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  background: #2d3748;
  border: 2px solid #4a5568;
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 3rem;
}

.contact-module img {
  width: 280px;
  height: auto;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.contact-info p {
  margin: 0.5rem 0;
  color: #e2e8f0;
  line-height: 1.6;
}

.contact-info a {
  color: #63b3ed;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.experience-card {
  background: #2d3748;
  border: 2px solid #4a5568;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.experience-card h4 {
  color: #ffffff;
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.experience-card .role {
  color: #cbd5e0;
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.experience-card .date {
  color: #cbd5e0;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}

.experience-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.experience-card li {
  color: #e2e8f0;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.experience-card li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #63b3ed;
  font-weight: bold;
}

@media (max-width: 992px) {
  .experience-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-module {
    flex-direction: column;
  }
  
  .contact-module img {
    width: 100%;
    max-width: 280px;
  }
}
</style>

<div class="about-container">
  <div class="contact-module">
    <img src="/images/about_me.jpg" alt="Profile Photo">
    <div class="contact-info">
      <h2>Tayden White</h2>
      <p style="font-size: 0.8rem; margin-bottom: 1.5rem;">
        <a href="mailto:tayden.white@gmail.com">tayden.white@gmail.com</a> | docu
        908-369-1626 | 
        <a href="https://linkedin.com/in/tayden-white/" target="_blank">linkedin.com/in/tayden-white/</a>
      </p>
      <hr style="margin: 1.5rem 0; border-color: #4a5568;">
      <p style="margin-bottom: 0.3rem;"><strong>Purdue University</strong> | West Lafayette, IN <span style="float: right;">Aug 2023 - May 2027</span></p>
      <p style="margin-bottom: 0.3rem; font-style: italic;">Dual Degrees in Computer Science & Mathematical Economics</p>
      <p style="margin-bottom: 0.8rem;"><strong>GPA: 3.9</strong> – Dean's List & Semester Honors (3x)</p>
      <p style="margin-bottom: 0;"><strong>Relevant Coursework:</strong> Data Structure & Algorithms, Data Mining & Machine Learning, Systems Programming</p>
    </div>
  </div>

  <h3 style="color: #63b3ed; font-size: 1.1rem; margin-top: 2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Work Experience</h3>
  <div class="experience-grid">
    <div class="experience-card">
      <h4>Johnson & Johnson – Innovative Medicine</h4>
      <p class="role">Software Engineer</p>
      <p class="date">Aug 2025 – Present</p>
      <ul>
        <li>Optimizing static site build/deployment with Hugo, Jenkins and AWS. Enhancing CI/CD pipeline to support feeding up to one million documents into GenAI, allowing the large scale presentation of and modeling with FDA records</li>
      </ul>
    </div><div class="experience-card">
      <h4>Undergraduate Research Assistant</h4>
      <p class="role">Research Undergraduate for Purdue University</p>
      <p class="date">May 2025 – Aug 2025</p>
      <ul>
        <li>Performed an analysis on an algorithm for the fusion of permutation defects, a type of quasi-particle whose interactions can be harnessed in implementing qubits for topological quantum computing.</li>
        <li>Undertook extensive case work and calculations describing the "fusion rules" for permutation defects, helped identify and find solutions for various edge cases in the algorithm with the goal of eventually rewriting the paper</li>
        <li>Presented my research at Purdue's Summer Undergraduate Research Exposition</li>
      </ul>
    </div><div class="experience-card">
      <h4>Johnson & Johnson – Innovative Medicine</h4>
      <p class="role">Software Engineering Intern</p>
      <p class="date">May 2024 – Aug 2024</p>
      <ul>
        <li>Assisted in the optimization and refactoring of GAMEs (Generic Analytics Modeling Engine), an internal "generic" machine learning engine. Decreased the size of the R package by 25%, made the code base more modular</li>
        <li>Developed an automation script in Python to generate web forms for JnJ's clients to evaluate the respective services they are using, saving hundreds of hours of manual configuring.</li>
        <li>Built and deployed websites using Hugo & GitHub Pages. Created tutorials and trained others in building sites</li>
      </ul>
    </div>
  </div>
</div>