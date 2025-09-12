import enWorkshop from "../../assets/images/highlight/en/workshop.png";
import enExhibition from "../../assets/images/highlight/en/exhibition.png";
import enJourney from "../../assets/images/highlight/en/engi-journey.png";
import enIdol from "../../assets/images/highlight/en/idol.png";
import { de } from "zod/locales";

export default {
  hero: {
    date: "10-12 October 2025",
    place: "At the Faculty of Engineering\nKing Mongkut's University of Technology Thonburi",
  },
  highlight: {
    title: "Highlight",
    card: [
      {
        title: "Workshop",
        description:
          "An exciting workshop that gives you a full-scale view of Engineering Bangmod This is an exclusive chance to learn by doing rather than simply sitting to lectures. You will get to interact with professors, real staff, and university students from many departments of the institution. They’ll be sharing knowledge, tips, and demonstrating cutting-edge tools that engineering students actually use.This is a perfect season to explore your passions, skills, and even fresh ideas that can impact your future. There is no reason why you can miss this event, which is full of fun, education, and a warm vibe!",
        image: enWorkshop,
      },
      {
        title: "Exhibition",
        description:
          "Get ready! We're taking you on a journey to explore the creative projects and innovations from the talented students of KMUTT Engineering. This event isn't just about checking out projects, you will also get a behind-the-scenes look at the thought process and development behind each one. You'll have the chance to discover all 10 departments, learn about their programs, study paths, and career opportunities after graduation, almost like experiencing life as an engineering student in advance. university students from every department will be sharing real experiences and answering all your questions about studies, activities, student life, and future opportunities. It’s fun, informative, and full of inspiration, you won’t want to miss it!",
        image: enExhibition,
      },
      {
        title: "Engi's Journey",
        description:
          "A special event you can’t miss! From observing real laboratory settings and seeing the actual tools used in classes from actual engineering students, we're taking you on a tour to get a close-up look at every department at Bangmod Engineering. This is more than simply a department introduction; it's a chance to find your passion and your ideal career path. Expect a fun, warm atmosphere filled with knowledge, friendships, and unforgettable experiences.",
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
};
