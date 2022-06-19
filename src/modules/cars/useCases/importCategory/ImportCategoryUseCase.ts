import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

type ImportCategoryDTO = {
    name: string;
    description: string;
};
@injectable()
export class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepositories")
        private categoryRepository: ICategoryRepository
    ) {}

    private loadCategories(
        file: Express.Multer.File
    ): Promise<ImportCategoryDTO[]> {
        return new Promise((resolve, reject) => {
            console.log("loadCategories");
            const categories: Array<ImportCategoryDTO> = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => reject(err));
        });
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const existCategory = await this.categoryRepository.findByName(
                name
            );

            if (!existCategory) {
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}
