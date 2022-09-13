import { Category } from "../models";

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name", "position"],
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      cateoreis: rows,
      page: page,
      perPage: perPage,
      count: count,
    };
  },

  findByIdWithAnimes: async (id: string) => {
    const categoryWithAnimes = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "animes",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
    return categoryWithAnimes;
  },
};
