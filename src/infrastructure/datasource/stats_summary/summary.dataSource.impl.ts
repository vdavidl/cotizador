import { prisma } from "../../../data";
import { CustomError, ServerResponseEntity, SummaryDataSource } from "../../../domain";



export class SummaryDataSourceImpl implements SummaryDataSource{

    async showStatsSummary(): Promise<ServerResponseEntity['props']> {
        try {
            // const number_of_prospects = await prisma.prospect.count()
            // const number_of_quotations = await prisma.quotation.count()
            // const number_of_services = await prisma.service.count()

            const [number_of_prospects, number_of_quotations, number_of_services] = await Promise.all([
                prisma.prospect.count(),
                prisma.quotation.count(),
                prisma.service.count()
            ]);

            const number_of_entities = {
                prospect: number_of_prospects, 
                quotation: number_of_quotations, 
                service: number_of_services
            }

            return ServerResponseEntity.fromObject({
                message: 'Stats summary retrieved successfully',
                status: "success",
                data: {number_of_entities},
                error: null
            });

        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }

    }

}

