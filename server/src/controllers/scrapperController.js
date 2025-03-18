import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

export const scrapeArticles = async (req, res) => {
  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: "Termo de busca é obrigatório" });

    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(term)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&lr=lang_pt`;

    const response = await axios.get(searchUrl);
    const links = response.data.items
    const aa = response.data.items
    console.log(aa)

    let articles = [];
    for (const item of links) {
      const article = await prisma.article.create({
        data: { title: item.title, url: item.link, content: "Conteúdo a ser capturado depois" },
      });
      articles.push(article);
    }

    res.json({ articles });
  } catch (error) {
    res.status(500).json({ error: "Erro no scraping", details: error.message });
  }
};

export default {
  scrapeArticles
}