const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
const scratch = fs.readFileSync('scratch.tsx', 'utf8');

// Inject the components before SEOContentBlock
app = app.replace('// ───────────────────────────────────────────\n// SECTION: SEO CONTENT BLOCK', scratch + '\n// ───────────────────────────────────────────\n// SECTION: SEO CONTENT BLOCK');

// Now inject the component tags into the App render function
const insertPoint = '{/* Section 8: SEO Block */}';
const newSections = `        {/* Section 6.1: Dining */}
        <DiningSection />
        
        {/* Section 6.2: Attractions */}
        <AttractionsSection />
        
        {/* Section 6.3: Gallery */}
        <GallerySection />
        
        {/* Section 6.4: FAQ */}
        <FAQSection />

        `;
        
app = app.replace(insertPoint, newSections + insertPoint);

fs.writeFileSync('src/App.tsx', app);
