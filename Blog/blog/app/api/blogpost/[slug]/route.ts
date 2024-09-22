import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import rehypeSlug from "rehype-slug";
import { rehypePrettyCode } from 'rehype-pretty-code';

const Slugger = async (slug: string) => {
    const result = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypePrettyCode);

    const filepath = path.join(process.cwd(), 'content', `${slug}.md`);
    const filepath1 = path.join(process.cwd(), 'content', `${slug}content.md`);

    try {
        const filecontent = fs.readFileSync(filepath, 'utf-8');
        const { data, content } = matter(filecontent);
        const htmlcontent = (await result.process(content)).toString();

        try {
            const filecontent1 = fs.readFileSync(filepath1, 'utf-8');
            const { data: data1, content: content1 } = matter(filecontent1);
            const htmlcontenter = (await result.process(content1)).toString();
            return [data, htmlcontent, htmlcontenter];
        } catch (err) {
            console.error('Error reading secondary file:', err);
            return `
              <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-red-600">Blog Not Found</h1>
          <p className="mt-4 text-gray-700">Sorry, the blog post you're looking for does not exist.</p>
        </div>
      </div>
    `;
        }
    } catch (err) {
        console.error('Error reading primary file:', err);
        return `
          <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white shadow-md rounded-lg ">
          <h1 className="text-2xl font-bold text-red-600">Blog Not Found</h1>
          <p className="mt-4 text-gray-700">Sorry, the blog post you're looking for does not exist.</p>
        </div>
      </div>
    `;
    }
};

export default Slugger;
