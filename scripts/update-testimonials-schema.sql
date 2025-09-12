-- Add testimonial_type column to client_reviews table
ALTER TABLE client_reviews 
ADD COLUMN testimonial_type VARCHAR(20) DEFAULT 'identified' CHECK (testimonial_type IN ('identified', 'anonymous'));

-- Make client identity fields nullable for anonymous testimonials
ALTER TABLE client_reviews 
ALTER COLUMN client_name DROP NOT NULL,
ALTER COLUMN client_position DROP NOT NULL,
ALTER COLUMN client_company DROP NOT NULL;

-- Update existing records to be 'identified' type
UPDATE client_reviews SET testimonial_type = 'identified' WHERE testimonial_type IS NULL;

-- Add some sample anonymous testimonials
INSERT INTO client_reviews (testimonial_type, review_text, rating, project_category, is_published) VALUES
('anonymous', 'Exceptional service and outstanding results. The team delivered exactly what we needed on time and within budget.', 5, 'Web Development', true),
('anonymous', 'Professional, reliable, and innovative. They transformed our digital presence completely.', 5, 'UI/UX Design', true),
('anonymous', 'Great communication throughout the project. The final product exceeded our expectations.', 4, 'App Development', true);
