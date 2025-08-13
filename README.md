# Modern Portfolio Website

A modern, responsive portfolio website built with React 18+, TypeScript, and Vite. Features comprehensive accessibility support, performance optimizations, and deployment configurations for multiple platforms.

## ✨ Features

- **Modern Tech Stack**: React 18+, TypeScript, Vite
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Performance Optimized**: Lazy loading, code splitting, image optimization
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive ARIA support
- **SEO Ready**: Meta tags, structured data, Open Graph support
- **PWA Support**: Service worker, web app manifest
- **Error Handling**: Comprehensive error boundaries and logging
- **Testing**: Vitest setup with React Testing Library
- **Deployment Ready**: Configurations for Vercel, Netlify, GitHub Pages, Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modern-portfolio.git
cd modern-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── __tests__/      # Component tests
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Site footer
├── data/               # Static data and content
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── test/               # Test configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 🎨 Customization

### Personal Information

Update your personal information in `src/data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other details
};
```

### Projects

Add your projects to the `projects` array in `src/data/portfolio.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project Title',
    description: 'Project description',
    // ... other project details
  },
];
```

### Styling

The project uses CSS custom properties for theming. Update colors and spacing in `src/index.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  /* ... other variables */
}
```

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with the included `vercel.json` configuration

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically with the included `netlify.toml` configuration

### GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Push to the `main` branch to trigger the GitHub Actions workflow
3. Your site will be deployed automatically

### Docker

1. Build the Docker image:
```bash
docker build -t portfolio .
```

2. Run the container:
```bash
docker run -p 80:80 portfolio
```

## 🧪 Testing

The project includes comprehensive testing setup with Vitest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## ♿ Accessibility

This portfolio is built with accessibility in mind:

- Semantic HTML structure
- ARIA attributes and labels
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🔧 Performance

Performance optimizations included:

- Lazy loading of components and images
- Code splitting and dynamic imports
- Service worker for caching
- Optimized bundle size
- Modern image formats (WebP, AVIF)
- Performance monitoring in development

## 📱 PWA Features

- Service worker for offline support
- Web app manifest
- Installable on mobile devices
- Background sync capabilities

## 🔒 Security

Security headers and best practices:

- Content Security Policy
- XSS Protection
- Frame Options
- Content Type Options
- Referrer Policy

## 📊 SEO

SEO optimizations included:

- Meta tags and Open Graph
- Structured data (JSON-LD)
- Semantic HTML
- Sitemap generation
- Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Unsplash](https://unsplash.com/) for placeholder images

## 📞 Support

If you have any questions or need help with customization, please open an issue or contact [your.email@example.com](mailto:your.email@example.com).

---

Made with ❤️ by [Your Name](https://yourportfolio.com)
