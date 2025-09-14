// Highlight Section
import enWorkshop from "../../assets/images/highlight/en/workshop.webp";
import enExhibition from "../../assets/images/highlight/en/exhibition.webp";
import enJourney from "../../assets/images/highlight/en/engi-journey.webp";
import enIdol from "../../assets/images/highlight/en/idol.webp";
// Department Section
import imgCPE from "../../assets/images/departments/CPE.webp";
import imgCHE from "../../assets/images/departments/CHE.webp";
import imgME from "../../assets/images/departments/ME.webp";
import imgTME from "../../assets/images/departments/TME.webp";
import imgEE from "../../assets/images/departments/EE.webp";
import imgCE from "../../assets/images/departments/CE.webp";
import imgINC from "../../assets/images/departments/INC.webp";
import imgENV from "../../assets/images/departments/ENV.webp";
import imgENE from "../../assets/images/departments/ENE.webp";
import imgPE from "../../assets/images/departments/PE.webp";
import iconCPE from "../../assets/icons/departments/CPE.svg";
import iconCHE from "../../assets/icons/departments/CHE.svg";
import iconME from "../../assets/icons/departments/ME.svg";
import iconTME from "../../assets/icons/departments/TME.svg";
import iconEE from "../../assets/icons/departments/EE.svg";
import iconCE from "../../assets/icons/departments/CE.svg";
import iconINC from "../../assets/icons/departments/INC.svg";
import iconENV from "../../assets/icons/departments/ENV.svg";
import iconENE from "../../assets/icons/departments/ENE.svg";
import iconPE from "../../assets/icons/departments/PE.svg";
// Insight Section
import imgAdmission from "../../assets/images/insight/admission.webp";
import imgINNOX from "../../assets/images/insight/innox.webp";
// Contest Section
import imgIC from "../../assets/images/contest/ic.webp";
import imgEQ from "../../assets/images/contest/eq.webp";
import imgBH from "../../assets/images/contest/bh.webp";
// Icons
import iconFacebook from "../../assets/icons/facebook.svg";
import iconInstagram from "../../assets/icons/instagram.svg";
import iconLOC from "../../assets/icons/location.svg";

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
        title: "Departments",
        href: "#departments",
      },
      insight: {
        title: "Faculty Insight",
        href: "#insight",
      },
      contests: {
        title: "Contest",
        href: "#contest",
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
        href: "/",
      },
      {
        title: "Exhibition",
        description:
          "Get ready! We're taking you on a journey to explore the creative projects and innovations from the talented students of KMUTT Engineering. This event isn't just about checking out projects, you will also get a behind-the-scenes look at the thought process and development behind each one. You'll have the chance to discover all 10 departments, learn about their programs, study paths, and career opportunities after graduation, almost like experiencing life as an engineering student in advance. university students from every department will be sharing real experiences and answering all your questions about studies, activities, student life, and future opportunities. It's fun, informative, and full of inspiration, you won't want to miss it!",
        image: enExhibition,
        href: "/",
      },
      {
        title: "Engi's Journey",
        description:
          "A special event you can't miss! From observing real laboratory settings and seeing the actual tools used in classes from actual engineering students, we're taking you on a tour to get a close-up look at every department at Bangmod Engineering. This is more than simply a department introduction; it's a chance to find your passion and your ideal career path. Expect a fun, warm atmosphere filled with knowledge, friendships, and unforgettable experiences.",
        image: enJourney,
        href: "/",
      },
      {
        title: "Idol",
        description:
          "Students will get to sit down and talk, ask for advice and techniques for creating a portfolio, and prepare for entrance exams for various fields in the Faculty of Engineering from senior students from all 10 departments, one-on-one.",
        image: enIdol,
        href: "/",
      },
    ],
  },
  departments: {
    title: "Departments",
    departments: [
      {
        title: "Computer",
        href: "departments/cpe/",
        image: imgCPE,
        icon: iconCPE,
      },
      {
        title: "Chemical",
        href: "departments/che/",
        image: imgCHE,
        icon: iconCHE,
      },
      {
        title: "Mechanical",
        href: "departments/me/",
        image: imgME,
        icon: iconME,
      },
      {
        title: "Tool and Materials",
        href: "departments/tme/",
        image: imgTME,
        icon: iconTME,
      },
      {
        title: "Electrical",
        href: "departments/ee/",
        image: imgEE,
        icon: iconEE,
      },
      {
        title: "Civil",
        href: "departments/ce/",
        image: imgCE,
        icon: iconCE,
      },
      {
        title: "Instrumentation and Control Systems",
        href: "departments/inc/",
        image: imgINC,
        icon: iconINC,
      },
      {
        title: "Environmental",
        href: "departments/env/",
        image: imgENV,
        icon: iconENV,
      },
      {
        title: "Electronics and Telecommunication",
        href: "departments/ene/",
        image: imgENE,
        icon: iconENE,
      },
      {
        title: "Production",
        href: "departments/pe/",
        image: imgPE,
        icon: iconPE,
      },
    ],
  },
  insight: {
    title: "Faculty Insight",
    insight: [
      {
        title: "Admission",
        description:
          "Whether you are an undergraduate or graduate student, get information on scholarships, application schedules (TCAS 69), English development activities, and opportunities for international exchanges. Exclusive privileges for participants of KMUTT Engineering Open House 2025.",
        points: [
          "Undergraduate students: Prepare your portfolio to apply for Early Admission (International Programs)",
          "Graduate students: Register your intention to continue your studies immediately",
        ],
        image: imgAdmission,
        location: [
          {
            text: "Learning Building 4 (S12), 1st Floor, in front of ICE Center",
            href: "https://maps.app.goo.gl/hfSeMHNDbkmEZfGU6",
            icon: iconLOC,
          },
          {
            text: "ICE KMUTT",
            href: "https://www.facebook.com/InternationalCenterforEngineeringKMUTT",
            icon: iconFacebook,
          },
          {
            text: "kmutt.ice",
            href: "https://www.instagram.com/kmutt.ice/",
            icon: iconInstagram,
          },
        ],
      },
      {
        title: "INNO-X",
        description:
          "creative space for prototyping, innovation, and invention, equipped with cutting-edge tools such as 3D Printers, Laser Cutters, and Mini CNC machines. In the workshop, you will get hands-on experience using the 3D Printer and Laser Cutter up close and even create their own projects for real!",
        image: imgINNOX,
        href: "https://www.facebook.com/p/Innovation-Exchange-KMUTT-100064519611257",
        location: [
          {
            text: "Wissawa Wattana Building (S4)",
            href: "https://maps.app.goo.gl/w1h5V5dBoTa3UNr87",
            icon: iconLOC,
          },
          {
            text: "Innovation Exchange KMUTT ",
            href: "https://www.facebook.com/p/Innovation-Exchange-KMUTT-100064519611257",
            icon: iconFacebook,
          },
        ],
      },
    ],
  },
  activity: {
    title: "Activity",
    seeAll: "See All Activities",
    card: [
      {
        title: "Workshop",
        description:
          "An exciting workshop that gives you a full-scale view of Engineering Bangmod This is an exclusive chance to learn by doing rather than simply sitting to lectures. You will get to interact with professors, real staff, and university students from many departments of the institution. They'll be sharing knowledge, tips, and demonstrating cutting-edge tools that engineering students actually use.This is a perfect season to explore your passions, skills, and even fresh ideas that can impact your future. There is no reason why you can miss this event, which is full of fun, education, and a warm vibe!",
        image: enWorkshop,
        href: "/",
      },
      {
        title: "Exhibition",
        description:
          "Get ready! We're taking you on a journey to explore the creative projects and innovations from the talented students of KMUTT Engineering. This event isn't just about checking out projects, you will also get a behind-the-scenes look at the thought process and development behind each one. You'll have the chance to discover all 10 departments, learn about their programs, study paths, and career opportunities after graduation, almost like experiencing life as an engineering student in advance. university students from every department will be sharing real experiences and answering all your questions about studies, activities, student life, and future opportunities. It's fun, informative, and full of inspiration, you won't want to miss it!",
        image: enExhibition,
        href: "/",
      },
      {
        title: "Engi's Journey",
        description:
          "A special event you can't miss! From observing real laboratory settings and seeing the actual tools used in classes from actual engineering students, we're taking you on a tour to get a close-up look at every department at Bangmod Engineering. This is more than simply a department introduction; it's a chance to find your passion and your ideal career path. Expect a fun, warm atmosphere filled with knowledge, friendships, and unforgettable experiences.",
        image: enJourney,
        href: "/",
      },
    ],
  },
  contest: {
    title: "Contest",
    contest: [
      {
        title: "Science & Technology Idea Contest Engineering KMUTT",
        description: `a competition for high school students or their equivalents to submit scientific and technological inventions under the theme "Engineering for Sustainability."On October 10, 2025, you have been invited to participate in the final round competition and all-day exhibition.`,
        points: [
          "Seeing 40 teams' innovative project concepts and inventions",
          "Vote for your preferred team in the popular vote",
          "Listening to presentations from the top five teams to decide the winner",
        ],
        image: imgIC,
        location: [
          {
            text: "KMUTT Library Building (N10), King Mongkut's University of Technology Thonburi",
            href: "https://maps.app.goo.gl/p1oFmS8yp9duxFRJA",
            icon: iconLOC,
          },
        ],
      },
      {
        title: "Engineering Quest 2025",
        description:
          "First, 350 teams, then 50 teams, and lastly, the top 5. On October 11, 2025, you can watch the semi-final and final rounds of the Engineering Academic Quiz Competition for students in high school or its equivalent in the Academic Year 2025. The competition will be live-streamed on the KMUTT Engineering Open House 2025 Facebook page, so you may follow, cheer, and support throughout.",
        image: imgEQ,
        href: "https://www.facebook.com/share/1BZD9tJbzG/?mibextid=wwXIfr ",
        location: [
          {
            text: "Preliminary Round: Classroom Building 2 (N17)",
            href: "https://maps.app.goo.gl/MXUNduPtscmUkYj59",
            icon: iconLOC,
          },
          {
            text: "Semi-Final & Final Rounds: King Mongkut’s 190th Anniversary Memorial Building (S14)",
            href: "https://maps.app.goo.gl/3TsAguSd91EkBRA59",
            icon: iconLOC,
          },
        ],
      },
      {
        title: "Bangmod Hackathon 2025",
        description:
          "Bangmod Hackathon is a computer programming competition that allows high school and vocational students (or equivalents) to compete in a team-based C/C++ programming contest. The event's goal is to improve programming abilities, build teamwork, and provide participants with practical experience through real-world situations.",
        image: imgBH,
        href: "https://bangmodhackathon.com/",
        location: [
          {
            text: "Wissawa Wattana Building (S4), 11th Floor, King Mongkut’s University of Technology Thonburi",
            href: "https://maps.app.goo.gl/65YM3k6JdvKM1tLD8",
            icon: iconLOC,
          },
        ],
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
  footer: {
    faculty: "Faculty of Engineering,",
    university: "King Mongkut's University of Technology Thonburi (Bangmod)",
    address: "126 Pracha Uthit Road, Bangmod, Thung Khru, Bangkok 10140",
    copyright: "Copyright © KMUTT Engineering Open House 2025. All rights reserved.",
    social: {
      facebook: {
        icon: iconFacebook,
        href: "https://www.facebook.com/100087709743668",
        alt: "Facebook",
      },
      instagram: {
        icon: iconInstagram,
        href: "https://www.instagram.com/samovidva_bangmod",
        alt: "Instagram",
      },
    },
  },
};
