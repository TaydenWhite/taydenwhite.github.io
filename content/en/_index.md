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

{{< blocks/cover title="Tayden White" image_anchor="top" height="full" >}}
<p class="lead mt-5">Hi! My name is Tayden White and this is my personal website. I built this site during an internship at Johnson & Johnson, where I learned a great deal, including subjects like data engineering, machine learning, and static websites. Currently, I am a rising sophomore at Purdue University, pursuing degrees in both Computer Science and Mathematical Economics. While coding has always been a passion of mine -- I have fond memories of building my first tic-tac-toe in python the summer before Freshman year -- , my interest in economics is relatively new.</p>

<p>You can find me here:</p>

<div class="container">
  <div class="row">
    <div class="col-lg-8 mx-auto text-center">
      <a class="btn btn-lg btn-social me-3 mb-4 btn-linkedin" href="https://www.linkedin.com/in/tayden-white/" target="_blank">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a class="btn btn-lg btn-social me-3 mb-4 btn-instagram" href="https://www.instagram.com/tayden_white/" target="_blank">
        <i class="fab fa-instagram"></i>
      </a>
      <a class="btn btn-lg btn-social me-3 mb-4 btn-github" href="https://github.com/TaydenWhite/" target="_blank">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </div>
</div>
{{< /blocks/cover >}}