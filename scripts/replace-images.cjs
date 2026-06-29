const fs = require('fs');
const path = require('path');

const TRAE_API = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=';

const replacements = [
  {
    file: 'src/lib/seo.ts',
    replacements: [
      {
        old: "'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80'",
        new: `'${TRAE_API}high%20quality%20solar%20panels%20on%20a%20modern%20UK%20house%20roof%20with%20a%20clear%20blue%20sky&image_size=landscape_16_9'`
      }
    ]
  },
  {
    file: 'src/pages/Home.tsx',
    replacements: [
      {
        old: '"https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"',
        new: `"${TRAE_API}modern%20solar%20panels%20on%20a%20uk%20house%20roof&image_size=landscape_4_3"`
      },
      {
        old: '"https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80"',
        new: `"${TRAE_API}close%20up%20of%20a%20solar%20inverter%20and%20battery%20system&image_size=square"`
      }
    ]
  },
  {
    file: 'src/pages/Business.tsx',
    replacements: [
      {
        old: '"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"',
        new: `"${TRAE_API}large%20commercial%20building%20with%20solar%20panels%20on%20flat%20roof&image_size=landscape_16_9"`
      }
    ]
  },
  {
    file: 'src/pages/Education.tsx',
    replacements: [
      {
        old: "'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}solar%20panels%20on%20residential%20roof%20uk&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}high%20tech%20solar%20battery%20energy%20storage%20system&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}financial%20chart%20with%20solar%20energy%20icon&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}solar%20panel%20installation%20process%20on%20a%20roof&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1592833159117-ac790d406391?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}modern%20home%20solar%20battery%20storage%20unit&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1620800632597-9e0d16568eb2?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}electric%20meter%20and%20solar%20battery%20setup&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1592833159057-6dd15bd0b852?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}solar%20panels%20with%20protective%20bird%20mesh%20netting&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}cleaning%20solar%20panels%20with%20water&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}aerial%20view%20of%20warehouse%20roof%20covered%20in%20solar%20panels&image_size=landscape_4_3'`
      },
      {
        old: "'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80'",
        new: `'${TRAE_API}architectural%20blueprint%20of%20a%20house%20with%20solar%20panels&image_size=landscape_4_3'`
      }
    ]
  }
];

replacements.forEach(({ file, replacements }) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    replacements.forEach(({ old, new: replacement }) => {
      if (content.includes(old)) {
        content = content.replace(old, replacement);
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated images in ${file}`);
    }
  }
});
