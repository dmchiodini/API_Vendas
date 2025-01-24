import { Request, Response } from "express";
import { ListProductsService } from "../services/ListProductsService";
import { container } from "tsyringe";
import { ShowProductService } from "../services/ShowProductService";
import { CreateProductService } from "../services/CreateProductService";
import { UpdateProductService } from "../services/UpdateProductService";
import { DeleteProductService } from "../services/DeleteProductService";

export class ProductsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const listProductService = container.resolve(ListProductsService);

    const products = await listProductService.execute();

    return response.status(200).json(products);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showProductService = container.resolve(ShowProductService);

    const { id } = request.params;

    const product = await showProductService.execute({ id });

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);

    const { name, price, quantity } = request.body;

    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductService = container.resolve(UpdateProductService);
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductService = container.resolve(DeleteProductService);
    const { id } = request.params;

    await deleteProductService.execute({ id });

    return response.status(204).json([]);
  }
}
