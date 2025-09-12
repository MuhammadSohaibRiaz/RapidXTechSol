-- Add testimonial_type column to client_reviews table
ALTER TABLE client_reviews 
ADD COLUMN testimonial_type VARCHAR(20) DEFAULT 'identified' CHECK (testimonial_type IN ('identified', 'anonymous'));

-- Make client fields nullable for anonymous testimonials
ALTER TABLE client_reviews 
ALTER COLUMN client_name DROP NOT NULL,
ALTER COLUMN client_position DROP NOT NULL,
ALTER COLUMN client_company DROP NOT NULL;

-- Update existing records to be 'identified' type
UPDATE client_reviews 
SET testimonial_type = 'identified' 
WHERE testimonial_type IS NULL;

-- Add index for better performance
CREATE INDEX idx_client_reviews_type ON client_reviews(testimonial_type);
CREATE INDEX idx_client_reviews_published_type ON client_reviews(is_published, testimonial_type);

-- Add some sample anonymous testimonials (optional)
INSERT INTO client_reviews (
  client_name, 
  client_position, 
  client_company, 
  client_image, 
  review_text, 
  rating, 
  project_category, 
  testimonial_type, 
  is_featured, 
  is_published
) VALUES 
(
  NULL, 
  NULL, 
  NULL, 
  NULL, 
  'Outstanding work! The team delivered exactly what we needed and exceeded our expectations. The project was completed on time and within budget.', 
  5, 
  'Web Development', 
  'anonymous', 
  true, 
  true
),
(
  NULL, 
  NULL, 
  NULL, 
  NULL, 
  'Professional service and excellent communication throughout the project. Highly recommend their expertise in mobile app development.', 
  5, 
  'App Development', 
  'anonymous', 
  false, 
  true
),
(
  NULL, 
  NULL, 
  NULL, 
  NULL, 
  'Great attention to detail and user experience. The UI/UX design was exactly what our brand needed.', 
  4, 
  'UI/UX Design', 
  'anonymous', 
  false, 
  true
);
