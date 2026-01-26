const fs = require('fs');
const path = require('path');

// Blog metadata mapping - normalized keys
const blogMetadata = {
  '1.1': { title: 'Cheque especial para pagar dívidas: vale a pena?', category: 'conselhos-financeiros', readTime: 8 },
  '1-1': { title: 'Cheque especial para pagar dívidas: vale a pena?', category: 'conselhos-financeiros', readTime: 8 },
  '2.2': { title: 'Sobre a Resolvver', category: 'sobre-nos', readTime: 5 },
  '2-2': { title: 'Sobre a Resolvver', category: 'sobre-nos', readTime: 5 },
  '3': { title: 'Dicas de Orçamento Pessoal', category: 'conselhos-financeiros', readTime: 7 },
  '4': { title: 'Como Funciona Nossa Metodologia', category: 'sobre-nos', readTime: 6 },
  '5': { title: 'Planejamento Financeiro Para Iniciantes', category: 'conselhos-financeiros', readTime: 9 },
  '6': { title: 'Economize Dinheiro no Dia a Dia', category: 'conselhos-financeiros', readTime: 6 },
  '7': { title: 'Como Sair das Dívidas', category: 'conselhos-financeiros', readTime: 10 },
  '8': { title: 'Educação Financeira na Prática', category: 'conselhos-financeiros', readTime: 8 },
  '9': { title: 'Investimentos Para Iniciantes', category: 'conselhos-financeiros', readTime: 7 },
  '10': { title: 'Como Melhorar Seu Score de Crédito', category: 'credito', readTime: 8 },
  '11': { title: 'Entenda Seu Relatório de Crédito', category: 'credito', readTime: 7 },
  '12': { title: 'Tipos de Crédito Disponíveis', category: 'credito', readTime: 9 },
  '13': { title: 'Crédito Consciente', category: 'credito', readTime: 6 },
  '14': { title: 'Como Negociar Taxas de Juros', category: 'credito', readTime: 8 },
  '15': { title: 'Recuperação de Crédito', category: 'credito', readTime: 10 },
  '16': { title: 'Depoimentos de Clientes', category: 'sobre-nos', readTime: 5 },
  '17': { title: 'Nossa História', category: 'sobre-nos', readTime: 6 },
  '18': { title: 'Missão e Valores', category: 'sobre-nos', readTime: 5 },
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractExcerpt(html) {
  // Remove HTML tags and get first 150 characters
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  return text.substring(0, 150) + '...';
}

// Process HTML files
const tmpDir = '/tmp';
const outputDir = path.join(__dirname, '../src/data/blog');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const htmlFiles = fs.readdirSync(tmpDir).filter(f => f.startsWith('blog-') && f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process`);

htmlFiles.forEach((filename) => {
  try {
    // Extract blog number from filename (e.g., "blog-Blog-1.1.html" -> "1.1" or "blog-blog-10.html" -> "10")
    const match = filename.match(/blog-[Bb]log-?(\d+(?:\.\d+)?)/);
    if (!match) {
      console.log(`Skipping ${filename} - cannot extract blog number`);
      return;
    }

    let blogNum = match[1];

    // Try to find metadata with the exact key first, then try normalized version
    let metadata = blogMetadata[blogNum];

    if (!metadata) {
      // Try with dot converted to dash (e.g., "1.1" -> "1-1")
      const normalizedKey = blogNum.replace('.', '-');
      metadata = blogMetadata[normalizedKey];
    }

    if (!metadata) {
      console.log(`Skipping ${filename} - no metadata for blog ${blogNum}`);
      return;
    }

    const htmlPath = path.join(tmpDir, filename);
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    const slug = slugify(metadata.title);
    const excerpt = extractExcerpt(htmlContent);
    const publishedAt = new Date(2025, 0, parseInt(blogNum) || 1).toISOString().split('T')[0];

    // Clean HTML content (remove image references that don't exist)
    const cleanedHtml = htmlContent
      .replace(/<img[^>]+>/g, '')
      .replace(/src="media\/[^"]+"/g, '');

    const tsContent = `import { BlogPost } from '@/types/blog'

export const post: BlogPost = {
  slug: '${slug}',
  title: '${metadata.title.replace(/'/g, "\\'")}',
  excerpt: '${excerpt.replace(/'/g, "\\'")}',
  category: '${metadata.category}',
  readTime: ${metadata.readTime},
  publishedAt: '${publishedAt}',
  content: \`${cleanedHtml.replace(/`/g, '\\`')}\`,
}
`;

    const outputFilename = `post-${blogNum.replace('.', '-')}.ts`;
    const outputPath = path.join(outputDir, outputFilename);

    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    console.log(`✓ Generated ${outputFilename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
});

console.log('Blog conversion complete!');
