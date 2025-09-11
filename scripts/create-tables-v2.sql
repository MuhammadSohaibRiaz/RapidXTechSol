-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    technology TEXT[] NOT NULL DEFAULT '{}',
    description TEXT NOT NULL,
    long_description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    images JSONB NOT NULL DEFAULT '[]',
    duration VARCHAR(50),
    team_size INTEGER NOT NULL DEFAULT 1,
    client_type VARCHAR(100),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    is_published BOOLEAN NOT NULL DEFAULT false,
    testimonial JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(500),
    tags TEXT[] NOT NULL DEFAULT '{}',
    author VARCHAR(100) NOT NULL DEFAULT 'RapidXTech Team',
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_published BOOLEAN NOT NULL DEFAULT false,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_reviews table
CREATE TABLE IF NOT EXISTS client_reviews (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255) NOT NULL,
    client_company VARCHAR(255) NOT NULL,
    client_image VARCHAR(500),
    review_text TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    project_category VARCHAR(100),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trusted_partners table
CREATE TABLE IF NOT EXISTS trusted_partners (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_logo VARCHAR(500) NOT NULL,
    company_website VARCHAR(500),
    partnership_type VARCHAR(100), -- 'client', 'technology', 'strategic'
    description TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_reviews_updated_at ON client_reviews;
CREATE TRIGGER update_client_reviews_updated_at 
    BEFORE UPDATE ON client_reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_trusted_partners_updated_at ON trusted_partners;
CREATE TRIGGER update_trusted_partners_updated_at 
    BEFORE UPDATE ON trusted_partners 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_client_reviews_is_published ON client_reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_client_reviews_is_featured ON client_reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_client_reviews_rating ON client_reviews(rating DESC);

CREATE INDEX IF NOT EXISTS idx_trusted_partners_is_published ON trusted_partners(is_published);
CREATE INDEX IF NOT EXISTS idx_trusted_partners_is_featured ON trusted_partners(is_featured);
CREATE INDEX IF NOT EXISTS idx_trusted_partners_display_order ON trusted_partners(display_order);

-- Insert sample data for projects
INSERT INTO projects (
    title, category, technology, description, long_description, challenge, solution, 
    results, features, images, duration, team_size, client_type, is_published,
    testimonial
) VALUES (
    'E-commerce Platform',
    'Web Development',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    'A full-featured e-commerce platform with inventory management and payment processing.',
    'A comprehensive e-commerce solution built for a growing retail business. The platform handles everything from product catalog management to order processing, inventory tracking, and customer relationship management. Built with modern technologies to ensure scalability and performance.',
    'The client needed a robust e-commerce platform that could handle high traffic volumes during peak seasons while maintaining fast loading times and secure payment processing. They also required advanced inventory management and analytics capabilities.',
    'We developed a scalable microservices architecture using React for the frontend and Node.js for the backend. Implemented real-time inventory tracking, integrated multiple payment gateways, and built a comprehensive admin dashboard for business management.',
    ARRAY['40% increase in conversion rates', '60% reduction in page load times', '99.9% uptime during peak traffic', '50% reduction in cart abandonment'],
    ARRAY['Real-time inventory management', 'Multi-payment gateway integration', 'Advanced search and filtering', 'Mobile-responsive design', 'Admin analytics dashboard', 'Customer review system', 'Wishlist and favorites', 'Order tracking system'],
    '[
        {"id": 1, "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", "alt": "E-commerce homepage", "caption": "Clean, modern homepage design with featured products"},
        {"id": 2, "url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop", "alt": "Product detail page", "caption": "Detailed product page with image gallery and reviews"},
        {"id": 3, "url": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop", "alt": "Shopping cart", "caption": "Streamlined checkout process with multiple payment options"}
    ]'::jsonb,
    '4 months',
    5,
    'Retail Business',
    true,
    '{"quote": "RapidXTech delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise helped us achieve remarkable growth.", "author": "Sarah Johnson", "position": "CEO", "company": "RetailCorp"}'::jsonb
),
(
    'Financial Services App',
    'App Development',
    ARRAY['React Native', 'Firebase', 'Node.js', 'PostgreSQL', 'AWS'],
    'Mobile banking application with secure authentication and real-time transaction tracking.',
    'A comprehensive mobile banking solution that provides users with secure access to their financial accounts, real-time transaction monitoring, and advanced financial management tools. Built with security and user experience as top priorities.',
    'Creating a secure, user-friendly mobile banking app that meets strict financial regulations while providing a seamless user experience. The app needed to handle sensitive financial data with bank-level security.',
    'Implemented multi-layer security architecture with biometric authentication, end-to-end encryption, and real-time fraud detection. Used React Native for cross-platform compatibility and Firebase for real-time data synchronization.',
    ARRAY['95% user satisfaction rate', 'Zero security breaches', '30% increase in mobile transactions', '50% reduction in customer service calls'],
    ARRAY['Biometric authentication', 'Real-time transaction alerts', 'Budget tracking and analytics', 'Bill payment integration', 'Card management', 'Investment portfolio tracking', 'Secure messaging', 'ATM locator'],
    '[
        {"id": 1, "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=600&fit=crop", "alt": "App login screen", "caption": "Secure login with biometric authentication"},
        {"id": 2, "url": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=600&fit=crop", "alt": "App dashboard", "caption": "Clean dashboard showing account overview and recent transactions"}
    ]'::jsonb,
    '6 months',
    4,
    'Financial Institution',
    true,
    '{"quote": "The mobile banking app developed by RapidXTech has transformed our customer experience. The security features and user interface are outstanding.", "author": "Michael Chen", "position": "CTO", "company": "SecureBank"}'::jsonb
);

-- Insert sample blog posts
INSERT INTO blog_posts (
    title, slug, excerpt, content, image, tags, author, date, is_published,
    seo_title, seo_description
) VALUES (
    'The Future of Web Development: Trends to Watch in 2024',
    'future-of-web-development-2024',
    'Explore the cutting-edge trends shaping web development in 2024, from AI integration to advanced frameworks.',
    '<h2>Introduction</h2><p>The web development landscape continues to evolve rapidly, with new technologies and methodologies emerging every year. As we progress through 2024, several key trends are reshaping how we build and interact with web applications.</p><h2>AI-Powered Development</h2><p>Artificial Intelligence is revolutionizing web development by automating code generation, optimizing performance, and enhancing user experiences through personalization.</p><h2>Advanced Frameworks</h2><p>Next.js, React, and Vue.js continue to dominate, while new frameworks like Svelte and Solid.js are gaining traction for their performance benefits.</p><h2>WebAssembly Growth</h2><p>WebAssembly is enabling near-native performance in web browsers, opening new possibilities for complex applications previously limited to desktop environments.</p><h2>Conclusion</h2><p>The future of web development is bright, with these trends promising more efficient, powerful, and user-friendly web applications.</p>',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    ARRAY['web development', 'trends', 'AI', 'frameworks', 'technology'],
    'Alex Rodriguez',
    '2024-01-15',
    true,
    'The Future of Web Development: Key Trends to Watch in 2024 | RapidXTech',
    'Discover the latest web development trends for 2024, including AI integration, advanced frameworks, and emerging technologies that will shape the future of web applications.'
),
(
    'Building Scalable React Applications: Best Practices Guide',
    'building-scalable-react-applications',
    'Learn essential best practices for building scalable React applications that can grow with your business needs.',
    '<h2>Project Structure</h2><p>A well-organized project structure is crucial for scalability. We recommend a feature-based approach where components, hooks, and utilities are grouped by functionality rather than by type.</p><h2>State Management</h2><p>Choose the right state management solution based on your applications complexity. For simple apps, React Context might suffice, while complex applications benefit from Redux Toolkit or Zustand.</p><h2>Code Splitting</h2><p>Implement code splitting using React.lazy() and Suspense to reduce initial bundle size and improve loading performance.</p><h2>Performance Optimization</h2><p>Use React.memo(), useMemo(), and useCallback() judiciously to prevent unnecessary re-renders. Implement virtualization for large lists and optimize images with next/image.</p><h2>Testing Strategy</h2><p>Establish a comprehensive testing strategy including unit tests with Jest, integration tests with React Testing Library, and end-to-end tests with Cypress or Playwright.</p>',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    ARRAY['react', 'scalability', 'best practices', 'javascript', 'frontend'],
    'Sarah Kim',
    '2024-01-10',
    true,
    'Building Scalable React Applications: Complete Best Practices Guide',
    'Master the art of building scalable React applications with this comprehensive guide covering project structure, state management, performance optimization, and testing strategies.'
);

-- Insert sample client reviews
INSERT INTO client_reviews (
    client_name, client_position, client_company, client_image, review_text, 
    rating, project_category, is_featured, is_published
) VALUES (
    'Sarah Johnson',
    'CEO',
    'RetailCorp',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'RapidXTech delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise helped us achieve remarkable growth. Our conversion rates increased by 40% within the first month of launch.',
    5,
    'Web Development',
    true,
    true
),
(
    'Michael Chen',
    'CTO',
    'SecureBank',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'The mobile banking app developed by RapidXTech has transformed our customer experience. The security features and user interface are outstanding. We have seen a 95% user satisfaction rate and zero security incidents.',
    5,
    'App Development',
    true,
    true
),
(
    'Emily Rodriguez',
    'Marketing Director',
    'TechStartup Inc',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'Working with RapidXTech was a game-changer for our startup. They understood our vision and delivered a product that perfectly aligned with our business goals. The team was professional, responsive, and delivered on time.',
    5,
    'UI/UX Design',
    true,
    true
),
(
    'David Park',
    'Founder',
    'InnovateLab',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'RapidXTech helped us build a complex enterprise solution that streamlined our operations. Their technical expertise and project management skills are top-notch. Highly recommended for any serious development project.',
    5,
    'Enterprise Software',
    false,
    true
),
(
    'Lisa Wang',
    'Product Manager',
    'DigitalFlow',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'The team at RapidXTech is incredibly talented and professional. They took our complex requirements and turned them into a beautiful, functional application. The project was delivered on time and within budget.',
    5,
    'Web Development',
    false,
    true
);

-- Insert sample trusted partners
INSERT INTO trusted_partners (
    company_name, company_logo, company_website, partnership_type, 
    description, is_featured, is_published, display_order
) VALUES (
    'TechCorp Solutions',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    'https://techcorp.com',
    'client',
    'Leading technology solutions provider',
    true,
    true,
    1
),
(
    'InnovateHub',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
    'https://innovatehub.com',
    'strategic',
    'Strategic innovation partner',
    true,
    true,
    2
),
(
    'CloudTech Systems',
    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop',
    'https://cloudtech.com',
    'technology',
    'Cloud infrastructure partner',
    true,
    true,
    3
),
(
    'DataFlow Analytics',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
    'https://dataflow.com',
    'client',
    'Data analytics and insights',
    true,
    true,
    4
),
(
    'SecureNet Inc',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    'https://securenet.com',
    'technology',
    'Cybersecurity solutions partner',
    false,
    true,
    5
),
(
    'GrowthLab',
    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop',
    'https://growthlab.com',
    'strategic',
    'Business growth consultancy',
    false,
    true,
    6
);
