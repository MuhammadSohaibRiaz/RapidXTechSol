-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    technology TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    long_description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    images JSONB DEFAULT '[]',
    duration VARCHAR(50),
    team_size INTEGER DEFAULT 1,
    client_type VARCHAR(100),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
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
    tags TEXT[] DEFAULT '{}',
    author VARCHAR(100) DEFAULT 'RapidXTech Team',
    date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT false,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_reviews table
CREATE TABLE IF NOT EXISTS client_reviews (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_position VARCHAR(100) NOT NULL,
    client_company VARCHAR(100) NOT NULL,
    client_image VARCHAR(500),
    review_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    project_category VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trusted_partners table
CREATE TABLE IF NOT EXISTS trusted_partners (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_logo VARCHAR(500) NOT NULL,
    company_website VARCHAR(500),
    partnership_type VARCHAR(50) DEFAULT 'client',
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_client_reviews_published ON client_reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_client_reviews_featured ON client_reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_trusted_partners_published ON trusted_partners(is_published);
CREATE INDEX IF NOT EXISTS idx_trusted_partners_featured ON trusted_partners(is_featured);
CREATE INDEX IF NOT EXISTS idx_trusted_partners_order ON trusted_partners(display_order);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_reviews_updated_at BEFORE UPDATE ON client_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trusted_partners_updated_at BEFORE UPDATE ON trusted_partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, category, technology, description, long_description, challenge, solution, results, features, images, duration, team_size, client_type, live_url, github_url, is_published, testimonial) VALUES
('E-Commerce Platform', 'Web Development', ARRAY['React', 'Next.js', 'Node.js', 'MongoDB'], 'Modern e-commerce platform with advanced features', 'A comprehensive e-commerce solution built with modern technologies to provide seamless shopping experience.', 'Building a scalable platform that can handle high traffic', 'Implemented microservices architecture with caching', ARRAY['50% increase in conversion rate', '99.9% uptime'], ARRAY['Real-time inventory', 'Payment integration', 'Admin dashboard'], '[{"id": 1, "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d", "alt": "E-commerce platform", "caption": "Modern shopping interface"}]', '4 months', 3, 'Enterprise', 'https://example-ecommerce.com', 'https://github.com/example/ecommerce', true, '{"quote": "Outstanding work! The platform exceeded our expectations.", "author": "John Smith", "position": "CEO", "company": "TechCorp"}')
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, image, tags, author, date, is_published, seo_title, seo_description) VALUES
('The Future of Web Development', 'future-of-web-development', 'Exploring the latest trends and technologies shaping the future of web development.', '<p>Web development is constantly evolving, with new technologies and frameworks emerging regularly. In this post, we explore the key trends that will shape the future of web development.</p><h2>Key Trends</h2><ul><li>AI Integration</li><li>Progressive Web Apps</li><li>Serverless Architecture</li></ul>', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', ARRAY['web development', 'technology', 'trends'], 'RapidXTech Team', CURRENT_DATE, true, 'Future of Web Development - Latest Trends 2024', 'Discover the latest web development trends and technologies that will shape the future of digital experiences.')
ON CONFLICT DO NOTHING;

INSERT INTO client_reviews (client_name, client_position, client_company, client_image, review_text, rating, project_category, is_featured, is_published) VALUES
('Sarah Johnson', 'CTO', 'InnovateTech', 'https://images.unsplash.com/photo-1494790108755-2616b612b786', 'RapidXTech delivered an exceptional web application that transformed our business operations. Their attention to detail and technical expertise is unmatched.', 5, 'Web Development', true, true),
('Michael Chen', 'Product Manager', 'StartupXYZ', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', 'The mobile app they developed for us has received outstanding user feedback. Professional team with great communication throughout the project.', 5, 'App Development', true, true)
ON CONFLICT DO NOTHING;

INSERT INTO trusted_partners (company_name, company_logo, company_website, partnership_type, description, is_featured, is_published, display_order) VALUES
('Google Cloud', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd', 'https://cloud.google.com', 'technology', 'Cloud infrastructure and services partner', true, true, 1),
('Microsoft Azure', 'https://images.unsplash.com/photo-1617042375876-a13e36732a04', 'https://azure.microsoft.com', 'technology', 'Enterprise cloud solutions partner', true, true, 2),
('AWS', 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2', 'https://aws.amazon.com', 'technology', 'Cloud computing services partner', true, true, 3)
ON CONFLICT DO NOTHING;
