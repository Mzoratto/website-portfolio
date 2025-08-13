import React, { useState, useRef, useMemo } from 'react';
import { projects } from '../data/portfolio';
import { useIntersectionObserver } from '../hooks';
import { Project, ProjectCategory } from '../types';
import { formatRelativeTime } from '../utils';
import LazyImage from './LazyImage';
import './Projects.css';

/**
 * Projects section component with filtering and lazy loading
 * Features responsive grid, category filtering, and accessibility
 */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects.sort((a, b) => {
        // Featured projects first, then by completion date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      });
    }
    return projects
      .filter(project => project.category === activeFilter)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }, [activeFilter]);

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return ['all', ...uniqueCategories] as const;
  }, []);

  const categoryLabels: Record<ProjectCategory | 'all', string> = {
    all: 'All Projects',
    web: 'Web Apps',
    mobile: 'Mobile Apps',
    desktop: 'Desktop Apps',
    api: 'APIs',
    other: 'Other',
  };

  const handleFilterChange = (filter: ProjectCategory | 'all') => {
    setActiveFilter(filter);
  };

  const handleProjectClick = (project: Project) => {
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubClick = (e: React.MouseEvent, githubUrl: string) => {
    e.stopPropagation();
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`projects ${isVisible ? 'projects--visible' : ''}`}
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="projects__content">
          {/* Section Header */}
          <div className="projects__header">
            <h2 id="projects-title" className="projects__title">
              My Projects
            </h2>
            <p className="projects__subtitle">
              A showcase of my recent work and personal projects
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="projects__filters" role="tablist" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`filter-btn ${activeFilter === category ? 'filter-btn--active' : ''}`}
                role="tab"
                aria-selected={activeFilter === category}
                aria-controls="projects-grid"
                aria-label={`Show ${categoryLabels[category]}`}
              >
                {categoryLabels[category]}
                <span className="filter-btn__count" aria-hidden="true">
                  {category === 'all' 
                    ? projects.length 
                    : projects.filter(p => p.category === category).length
                  }
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div 
            id="projects-grid"
            className="projects__grid"
            role="tabpanel"
            aria-labelledby="projects-title"
          >
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project)}
                role="button"
                tabIndex={0}
                aria-label={`View ${project.title} project`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="project-card__badge" aria-label="Featured project">
                    <span>Featured</span>
                  </div>
                )}

                {/* Project Image */}
                <div className="project-card__image">
                  <LazyImage
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    className="project-card__img"
                  />
                  <div className="project-card__overlay">
                    <div className="project-card__actions">
                      {project.demoUrl && (
                        <span className="project-card__action-hint">
                          Click to view demo
                        </span>
                      )}
                      {project.githubUrl && (
                        <button
                          onClick={(e) => handleGithubClick(e, project.githubUrl!)}
                          className="project-card__github-btn"
                          aria-label={`View ${project.title} source code on GitHub`}
                          title="View source code"
                        >
                          <GithubIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="project-card__content">
                  <div className="project-card__header">
                    <h3 className="project-card__title">{project.title}</h3>
                    <span className="project-card__category">
                      {categoryLabels[project.category]}
                    </span>
                  </div>

                  <p className="project-card__description">
                    {hoveredProject === project.id && project.longDescription
                      ? project.longDescription
                      : project.description
                    }
                  </p>

                  {/* Technologies */}
                  <div className="project-card__tech">
                    <ul className="tech-list" aria-label="Technologies used">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech} className="tech-item">
                          {tech}
                        </li>
                      ))}
                      {project.technologies.length > 4 && (
                        <li className="tech-item tech-item--more">
                          +{project.technologies.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Project Meta */}
                  <div className="project-card__meta">
                    <span className="project-card__date">
                      Completed {formatRelativeTime(project.completedAt)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="projects__empty" role="status">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * GitHub Icon Component
 */
const GithubIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default Projects;
