// Highlight Section
import enWorkshop from "../../assets/images/highlight/en/workshop.png";
import enExhibition from "../../assets/images/highlight/en/exhibition.png";
import enJourney from "../../assets/images/highlight/en/engi-journey.png";
import enIdol from "../../assets/images/highlight/en/idol.png";
// Department Section
import imgCPE from "../../assets/images/department/CPE.png";
import imgCHE from "../../assets/images/department/CHE.png";
import imgME from "../../assets/images/department/ME.png";
import imgTME from "../../assets/images/department/TME.png";
import imgEE from "../../assets/images/department/EE.png";
import imgCE from "../../assets/images/department/CE.png";
import imgINC from "../../assets/images/department/INC.png";
import imgENV from "../../assets/images/department/ENV.png";
import imgENE from "../../assets/images/department/ENE.png";
import imgPE from "../../assets/images/department/PE.png";
import iconCPE from "../../assets/icons/department/CPE.svg";
import iconCHE from "../../assets/icons/department/CHE.svg";
import iconME from "../../assets/icons/department/ME.svg";
import iconTME from "../../assets/icons/department/TME.svg";
import iconEE from "../../assets/icons/department/EE.svg";
import iconCE from "../../assets/icons/department/CE.svg";
import iconINC from "../../assets/icons/department/INC.svg";
import iconENV from "../../assets/icons/department/ENV.svg";
import iconENE from "../../assets/icons/department/ENE.svg";
import iconPE from "../../assets/icons/department/PE.svg";
import { map } from "zod";

export default {
  hero: {
    date: "10-12 October 2025",
    place: "At the Faculty of Engineering\nKing Mongkut's University of Technology Thonburi",
  },
  nav: {
    menu: {
      highlight: {
        title: "Highlight",
        href: "#highlight",
      },
      departments: {
        title: "Department",
        href: "#department",
      },
      inside: {
        title: "Inside",
        href: "#inside",
      },
      competitions: {
        title: "Competition",
        href: "#competition",
      },
      map: {
        title: "Location",
        href: "#map",
      },
      faq: {
        title: "FAQ",
        href: "#faq",
      },
    },
    language: {
      th: "TH",
      en: "EN",
    },
  },
  highlight: {
    title: "Highlight",
    card: [
      {
        title: "Workshop",
        description:
          "An exciting workshop that gives you a full-scale view of Engineering Bangmod This is an exclusive chance to learn by doing rather than simply sitting to lectures. You will get to interact with professors, real staff, and university students from many departments of the institution. They'll be sharing knowledge, tips, and demonstrating cutting-edge tools that engineering students actually use.This is a perfect season to explore your passions, skills, and even fresh ideas that can impact your future. There is no reason why you can miss this event, which is full of fun, education, and a warm vibe!",
        image: enWorkshop,
      },
      {
        title: "Exhibition",
        description:
          "Get ready! We're taking you on a journey to explore the creative projects and innovations from the talented students of KMUTT Engineering. This event isn't just about checking out projects, you will also get a behind-the-scenes look at the thought process and development behind each one. You'll have the chance to discover all 10 departments, learn about their programs, study paths, and career opportunities after graduation, almost like experiencing life as an engineering student in advance. university students from every department will be sharing real experiences and answering all your questions about studies, activities, student life, and future opportunities. It's fun, informative, and full of inspiration, you won't want to miss it!",
        image: enExhibition,
      },
      {
        title: "Engi's Journey",
        description:
          "A special event you can't miss! From observing real laboratory settings and seeing the actual tools used in classes from actual engineering students, we're taking you on a tour to get a close-up look at every department at Bangmod Engineering. This is more than simply a department introduction; it's a chance to find your passion and your ideal career path. Expect a fun, warm atmosphere filled with knowledge, friendships, and unforgettable experiences.",
        image: enJourney,
      },
      {
        title: "Idol",
        description:
          "Students will get to sit down and talk, ask for advice and techniques for creating a portfolio, and prepare for entrance exams for various fields in the Faculty of Engineering from senior students from all 10 departments, one-on-one.",
        image: enIdol,
      },
    ],
  },
  department: {
    title: "Departments",
    department: [
      {
        title: "Computer",
        href: "/department/cpe",
        image: imgCPE,
        icon: iconCPE,
      },
      {
        title: "Chemical",
        href: "/department/che",
        image: imgCHE,
        icon: iconCHE,
      },
      {
        title: "Mechanical",
        href: "/department/me",
        image: imgME,
        icon: iconME,
      },
      {
        title: "Tool and Materials",
        href: "/department/tme",
        image: imgTME,
        icon: iconTME,
      },
      {
        title: "Electrical",
        href: "/department/ee",
        image: imgEE,
        icon: iconEE,
      },
      {
        title: "Civil",
        href: "/department/ce",
        image: imgCE,
        icon: iconCE,
      },
      {
        title: "Instrumentation and Control Systems",
        href: "/department/inc",
        image: imgINC,
        icon: iconINC,
      },
      {
        title: "Environmental",
        href: "/department/env",
        image: imgENV,
        icon: iconENV,
      },
      {
        title: "Electronics and Telecommunication",
        href: "/department/ene",
        image: imgENE,
        icon: iconENE,
      },
      {
        title: "Production",
        href: "/department/pe",
        image: imgPE,
        icon: iconPE,
      },
    ],
  },
  map: {
    title: "Location",
  },
  faq: {
    title: "FAQ",
    questions: [
      {
        question: "Where is the KMUTT Engineering Open House held?",
        answer:
          "The event is held at King Mongkut's University of Technology Thonburi (KMUTT), Bangmod campus only.",
      },
      {
        question: "What can I do at the event?",
        answer:
          "KMUTT Engineering Open House 2025 features a variety of activities, including department exhibitions, hands-on workshops where you can try things yourself, and Engi's Journey, which guides you to learn more about the Faculty of Engineering at KMUTT.",
      },
      {
        question: "What should I bring?",
        answer:
          "A mobile phone with internet access. We collect E-stamps via the website for issuing certificates.",
      },
      {
        question: "What should I wear?",
        answer:
          "School uniform or smart attire (long trousers and closed-toe shoes). Please avoid sleeveless shirts, spaghetti straps, crop tops, short shorts, or flip-flops. Wear something comfortable for active participation.",
      },
      {
        question: "Can parents or teachers join?",
        answer:
          "Yes. Parents, teachers, and interested visitors can register to join the activities.",
      },
      {
        question: "Are certificates provided?",
        answer:
          "Certificates are available in 3 types:\n1) Event Participation Certificate — awarded when you collect at least 5 points via E-stamps, as follows:\n- Exhibitions from 10 departments (total 10 stamps): 1 point/stamp\n- Workshops from 10 departments and INNO-X (total 11 stamps): 3 points/stamp\n- Engi's Journey (3 stamps): 3 points/stamp\n- Engineering Quest 2025 (1 stamp): 1 point/stamp\n- Science & Technology Idea Contest Engineering KMUTT (1 stamp): 1 point/stamp\n2) Workshop Participation Certificate — awarded upon attending any department or INNO-X workshop.\n3) Academic Competition Certificate — awarded according to each competition's rules.",
      },
      {
        question: "How do I register?",
        answer: "Register via the Admission website.",
      },
    ],
  },
};
