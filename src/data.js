import { Github, Linkedin, Mail, Twitter, BookOpen } from 'lucide-react';

export const personalInfo = {
    name: "Gourav Paul",
    title: "Pursuing Bachelor of Data Science & AI/ML | Techno India University",
    email: "gouravkumarpaul1@gmail.com",
    about: "I am a Data Science and AI/ML student at Techno India University. Beyond my academic studies, I am a passionate iOS app builder (hobbyist) and deeply interested in AI/ML Engineering research. I love creating mobile experiences with Swift/SwiftUI and exploring the future of intelligent systems through research and hands-on projects.",
    phone: "+91-8100442091",
    socials: [
        {
            name: "GitHub",
            url: "https://github.com/heygaurav1",
            icon: Github,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/gaurav-paul-678586246/",
            icon: Linkedin,
        },
        {
            name: "Email",
            url: "mailto:gouravkumarpaul1@gmail.com",
            icon: Mail,
        }
    ],
    favoriteSongs: [
        "1oVLVwzhkulLMmO0maVYrw", // i think i wanna text u
        "43Yp9gfS3yVqKjE0T1hZkR", // I miss you, I'm sorry
        "62O85j5k6e71X67tGgY2Z3"  // Gameboy
    ],
    goals: ["GSoC (Google Summer of Code)", "Summer of Blockchain", "Amazon SDE 1 Internship"]
};

export const skills = [
    {
        title: "iOS Development",
        description: "Building premium mobile experiences as a hobby using Swift, SwiftUI, and Firebase. Focused on clean UI and smooth interactions.",
        icon: "Smartphone",
        tags: ["Swift", "SwiftUI", "Firebase", "iOS", "Mobile Design"]
    },
    {
        title: "AI/ML Engineering",
        description: "Deepening my knowledge in artificial intelligence and machine learning through dedicated research and academic projects.",
        icon: "Brain",
        tags: ["Research", "Neural Networks", "Python", "Predictive Modeling"]
    },
    {
        title: "Academic Data Science",
        description: "Applying statistical methods and data manipulation techniques to solve complex problems through university projects.",
        icon: "Database",
        tags: ["SQL", "Python", "Pandas", "NumPy", "GCP"]
    },
    {
        title: "Cloud & Ops",
        description: "Managing project deployments and automated workflows using cloud platforms and Git-based version control.",
        icon: "Code2",
        tags: ["GCP", "BigQuery", "ETL", "Git", "Reporting"]
    }
];

export const education = [
    {
        institution: "Techno India University",
        degree: "Bachelor of Data Science and AI/ML",
        period: "2024 - 2028",
        location: "Saltlake, Kolkata"
    }
];

export const experience = [];

export const projects = [
    {
        title: "Lumine - iOS Wallpaper App",
        description: "A premium iOS application built with Swift, SwiftUI, and Firebase. Features dynamic wallpaper loading and user authentication.",
        link: "https://github.com/heygaurav1/Lumine"
    },
    {
        title: "Reservation System Backend",
        description: "Robust backend system built with Spring Boot and Java. Handles complex booking logic, seat availability, and secure transactions.",
        link: "https://github.com/heygaurav1"
    },
    {
        title: "Transaction Analytics Dashboard",
        description: "Built a comprehensive multi-country APAC merchant transaction dataset using SQL, Python, and Excel. Designed Power BI dashboards for churn and ARPU insights.",
        link: "https://github.com/heygaurav1"
    },
    {
        title: "Uber Ride Analysis",
        description: "Analyzed 10,000+ ride records to quantify inefficiencies. Estimated 1M+ potential revenue leakage using SQL and Python.",
        link: "https://github.com/heygaurav1"
    }
];
