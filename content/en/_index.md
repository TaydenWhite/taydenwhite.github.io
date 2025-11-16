---
title: Tayden White
---

<head>
  <style>
    .btn-social {
      background-color: #ff0000; /* YouTube red */
      color: #fff; /* White text */
      width: 60px; /* Increased button size */
      height: 60px; /* Increased button size */
      font-size: 28px; /* Increased icon size */
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .btn-social.btn-linkedin {  /* Target LinkedIn button */
      background-color: #0077b5; /* LinkedIn blue */
      color: #fff; /* White text */
    }
    .btn-social.btn-instagram {
      background: linear-gradient(to right, #f44336, #e91e63); /* Purple to orange gradient */
      color: #fff; /* White text */
    }
    .btn-social.btn-github {
      background-color: #333; /* GitHub dark gray */
      color: #fff; /* White text */
    }
    .btn-social:hover {
      background-color: white; 
      color: #e00000;
    }
  </style>
</head>

{{< blocks/cover title="Tayden White" image_anchor="top" height="med" >}}

<p class="lead mt-4">
  I initially built this website during an internship at Johnson & Johnson, where I learned a great deal about data engineering, machine learning, and building websites. In the projects tab you can find “Website Tutorials,” an initiative I led during my internship to educate my coworkers about the process of building and deploying your own personal site.
</p>

<div class="container">
  <div class="row">
    <div class="col-lg-8 mx-auto text-center">
      <a class="btn btn-lg btn-social me-3 mb-4 btn-linkedin" href="https://www.linkedin.com/in/tayden-white/" target="_blank">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a class="btn btn-lg btn-social me-3 mb-4 btn-github" href="https://github.com/TaydenWhite/" target="_blank">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </div>
</div>
{{< /blocks/cover >}}

<section style="padding: 1rem 0;">
  <div style="position: relative; overflow: hidden; margin: 0 1rem; padding: 3rem; border-radius: 1.5rem; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <img src="/images/section-grey.png" alt="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; border-radius: 1.5rem;">
    <div class="container" style="position: relative; z-index: 1;">
      <div class="row align-items-center">
        <div class="col-md-4">
          <a href="https://taydenwhite.github.io/about-me/" style="display: block; width: 70%; margin: 0 auto; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.3)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';">
            <img src="/images/about_me.jpg" alt="About Me" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: block;">
          </a>
        </div>
        <div class="col-md-8">
          <h3 style="margin-bottom: 1rem;"><a href="https://taydenwhite.github.io/about-me/" style="color: #111111; text-decoration: underline; font-weight: bold; font-size: 1.8rem;">About Me</a></h3>
          <p style="color: #111111; font-family: Verdana, sans-serif;">
            Hi, my name is Tayden White, I am a Junior at Purdue University pursuing dual-degrees in Computer Science and Economics. These subjects have been my forefront interests since I learned Python in 8th grade, while the stock market or some financial question would act as inspiration, coding was my medium for learning. In having opposite yet compatible proficiencies, I have gained an extremely well-rounded skillset, and taken a diverse range of opportunities in the process.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section style="padding: 1rem 0;">
  <div style="position: relative; overflow: hidden; margin: 0 1rem; padding: 3rem; border-radius: 1.5rem; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <img src="/images/section-blue.png" alt="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; border-radius: 1.5rem;">
    <div class="container" style="position: relative; z-index: 1;">
      <div class="row align-items-center">
        <div class="col-md-6 order-md-2">
          <a href="https://taydenwhite.github.io/projects/fusion-of-permutation-defects/" style="display: block; width: 75%; margin: 0 auto; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.4)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';">
            <img src="/images/braiding_anyons.png" alt="Braiding Anyons" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: block;">
          </a>
        </div>
        <div class="col-md-6 order-md-1">
          <h3 style="margin-bottom: 1rem;"><a href="https://taydenwhite.github.io/projects/fusion-of-permutation-defects/" style="color: #f4f6fb; text-decoration: underline; font-weight: bold; font-size: 1.8rem;">Undergraduate Research</a></h3>
          <p style="color: #f4f6fb; font-family: Verdana, sans-serif;">
            As an Undergraduate Research Assistant, I analyzed an algorithm for topological quantum computing that describes the fusion of "permutation defects," a type of quasiparticles whose interactions can be harnessed in implementing qubits. I also diagnosed and resolved critical edge cases through extensive casework and calculations, contributing a revised set of "fusion rules" for these particles, to be implemented in a future publication.
          </p>
          <p style="color: #f4f6fb; font-family: Verdana, sans-serif;">
            I presented this research at <a href="https://taydenwhite.github.io/projects/fusion-of-permutation-defects/" target="_blank" style="color: #88ccff; text-decoration: underline;">Purdue's Summer Undergraduate Research Exposition</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section style="padding: 1rem 0;">
  <div style="position: relative; overflow: hidden; margin: 0 1rem; padding: 3rem; border-radius: 1.5rem; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <img src="/images/section-grey.png" alt="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; border-radius: 1.5rem;">
    <div class="container" style="position: relative; z-index: 1;">
      <div class="row align-items-center">
        <div class="col-md-6">
          <a href="https://taydenwhite.github.io/projects/jj-internship-wrap-up/" style="display: block; width: 75%; margin: 0 auto; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.3)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';">
            <img src="/images/jnj.png" alt="Johnson & Johnson" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: block;">
          </a>
        </div>
        <div class="col-md-6">
          <h3 style="margin-bottom: 1rem;"><a href="https://taydenwhite.github.io/projects/jj-internship-wrap-up/" style="color: #111111; text-decoration: underline; font-weight: bold; font-size: 1.8rem;">Johnson & Johnson</a></h3>
          <p style="color: #111111; font-family: Verdana, sans-serif;">
            In 2024, I worked at J&J as an software & data engineer, completing work on multiple teams. This involved reducing the size of an internal "generic" Machine Learning R package (GAMEs) by over 1,000 lines in a strategic refactoring designed to make the code base more modular. As well as developing an automation script in Python to generate web forms for JnJ's clients to evaluate their respective services, saving hundreds of hours of manual configuring.
          </p>
          <p style="color: #111111; font-family: Verdana, sans-serif;">
            More than a year later, I work part-time as a full stack developer for JnJ, optimizing an FDA compliance analytics pipeline to support more than 60k records in HUGO static sites. Additionally, I've designed an AI Agent Workflow that dynamically generates SQL prompts for parallel delta tables to answer user queries.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section style="padding: 1rem 0;">
  <div style="position: relative; overflow: hidden; margin: 0 1rem; padding: 3rem; border-radius: 1.5rem; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <img src="/images/section-blue.png" alt="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; border-radius: 1.5rem;">
    <div class="container" style="position: relative; z-index: 1;">
      <div class="row align-items-center">
        <div class="col-md-6 order-md-2">
          <a href="https://taydenwhite.github.io/projects/" style="display: block; width: 75%; margin: 0 auto; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.4)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';">
            <img src="/images/future_ai.jpg" alt="Future of AI" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: block;">
          </a>
        </div>
        <div class="col-md-6 order-md-1">
          <h3 style="margin-bottom: 1rem;"><a href="https://taydenwhite.github.io/projects/" style="color: #f4f6fb; text-decoration: underline; font-weight: bold; font-size: 1.8rem;">Personal Projects</a></h3>
          <p style="color: #f4f6fb; font-family: Verdana, sans-serif;">
            In the Fall of my Freshman year, I conducted a social study on the sentiment of Purdue leaders on the classroom use of AI. I compared their opinions with those of other other Universities, building a model of "AI-Friendliness" to see where Purdue lies. I used python to visualize the data and create informed guesses as to how AI usage may evolve the classroom environement.
          </p>
          <p style="color: #f4f6fb; font-family: Verdana, sans-serif;">
            I wrote a comprehensive research paper displaying my findings, as well as presented at Purdue's Fall Undergraduate Research Exposition to professors and students.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>