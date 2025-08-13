import React, { useRef } from 'react';
import { skills, personalInfo } from '../data/portfolio';
import { useIntersectionObserver } from '../hooks';
import { Skill, SkillCategory } from '../types';
import './About.css';

/**
 * About section component showcasing background, skills, and experience
 * Features responsive design, skill categorization, and accessibility
 */
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const categoryLabels: Record<SkillCategory, string> = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Database & Storage',
    tools: 'Tools & Technologies',
    other: 'Other Skills',
  };

  const getSkillLevelPercentage = (level: Skill['level']): number => {
    switch (level) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 100;
      default: return 0;
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`about ${isVisible ? 'about--visible' : ''}`}
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about__content">
          {/* Section Header */}
          <div className="about__header">
            <h2 id="about-title" className="about__title">
              About Me
            </h2>
            <p className="about__subtitle">
              Get to know more about my background, skills, and passion for development
            </p>
          </div>

          <div className="about__grid">
            {/* Bio Section */}
            <div className="about__bio">
              <div className="about__bio-content">
                <h3 className="about__bio-title">My Story</h3>
                <div className="about__bio-text">
                  <p>
                    {personalInfo.bio}
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and creating user experiences 
                    that are both beautiful and functional. My approach combines technical expertise 
                    with creative problem-solving to deliver solutions that exceed expectations.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing 
                    to open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="about__facts">
                  <h4 className="about__facts-title">Quick Facts</h4>
                  <ul className="about__facts-list">
                    <li>
                      <strong>Location:</strong> {personalInfo.location}
                    </li>
                    <li>
                      <strong>Experience:</strong> 5+ years in web development
                    </li>
                    <li>
                      <strong>Focus:</strong> Full-stack development with React & Node.js
                    </li>
                    <li>
                      <strong>Passion:</strong> Creating accessible, performant web applications
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="about__skills">
              <h3 className="about__skills-title">Technical Skills</h3>
              <div className="skills-grid">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category} className="skill-category">
                    <h4 className="skill-category__title">
                      {categoryLabels[category as SkillCategory]}
                    </h4>
                    <div className="skill-category__items">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="skill-item">
                          <div className="skill-item__header">
                            <span className="skill-item__name">{skill.name}</span>
                            <span className="skill-item__level">{skill.level}</span>
                          </div>
                          <div className="skill-item__bar">
                            <div 
                              className="skill-item__progress"
                              style={{ 
                                width: `${getSkillLevelPercentage(skill.level)}%`,
                                animationDelay: `${Math.random() * 0.5}s`
                              }}
                              role="progressbar"
                              aria-valuenow={getSkillLevelPercentage(skill.level)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${skill.name} skill level: ${skill.level}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="about__experience">
            <h3 className="about__experience-title">Professional Journey</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-item__marker" aria-hidden="true" />
                <div className="timeline-item__content">
                  <h4 className="timeline-item__title">Senior Full Stack Developer</h4>
                  <p className="timeline-item__company">Tech Company Inc.</p>
                  <p className="timeline-item__period">2022 - Present</p>
                  <p className="timeline-item__description">
                    Leading development of scalable web applications using React, Node.js, and cloud technologies. 
                    Mentoring junior developers and driving technical decisions for multiple projects.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-item__marker" aria-hidden="true" />
                <div className="timeline-item__content">
                  <h4 className="timeline-item__title">Full Stack Developer</h4>
                  <p className="timeline-item__company">Digital Solutions Ltd.</p>
                  <p className="timeline-item__period">2020 - 2022</p>
                  <p className="timeline-item__description">
                    Developed and maintained multiple client projects, focusing on performance optimization 
                    and user experience improvements. Collaborated with design teams to implement pixel-perfect interfaces.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-item__marker" aria-hidden="true" />
                <div className="timeline-item__content">
                  <h4 className="timeline-item__title">Frontend Developer</h4>
                  <p className="timeline-item__company">Startup Ventures</p>
                  <p className="timeline-item__period">2019 - 2020</p>
                  <p className="timeline-item__description">
                    Built responsive web applications from scratch, implemented modern JavaScript frameworks, 
                    and established development best practices for the growing team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
