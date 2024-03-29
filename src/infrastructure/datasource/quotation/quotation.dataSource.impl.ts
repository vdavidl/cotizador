import { prisma } from "../../../data";
import { CreateQuotationDto, CustomError, QuotationDataSource, ServerResponseEntity } from "../../../domain";
import { ServerResponseProps } from "../../../domain/server/response.server";
import { QuotationEntityMapper, QuotationListEntityMapper, SelectionListDataEntityMapper } from "../../mappers";




export class QuotationDataSourceImpl implements QuotationDataSource{


    async showAllQuotations(): Promise<ServerResponseEntity['props']>{
        try {
            // //Obtener lista de prospectos - solo sus nombres
            // const prospectlist = await prisma.prospect.findMany({
            //     select:{id: true, organization_name: true} 
            // })
            // //Obtener lista de servicios - solo nombres
            // const serviceList = await prisma.service.findMany({
            //     select:{id: true, service_name: true}
            // })

            //Lista de cotizaciones
            const quotationArray = await this.getAllQuotations();
            
            // Si la lista está vacía no se ejeucta el mapper
            // if(quotationArray.length === 0 ){
            //     return ServerResponseEntity.fromObject({
            //         message: 'Quotations found correctly',
            //         status: 'success',
            //         data: {"quotationsList": quotationArray,
            //         // "servicesList": serviceList,
            //         // "prospectList": prospectlist, 
            //         },
            //         error: null
            //     });
            // }

            const quotationArrayToEntity = quotationArray.map(QuotationListEntityMapper.quotationToJson);
            return ServerResponseEntity.fromObject({
                message: 'Quotations found correctly',
                status: 'success',
                data: {"quotationsList": quotationArrayToEntity,
                // "servicesList": serviceList,
                // "prospectList": prospectlist, 
                },
                error: null
            });
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }


    async createQuotation(quotationDto: CreateQuotationDto): Promise<ServerResponseEntity['props']>{

        try {
            const {prospect_id, service_id, user_id, net_amount, discount, quotation_date, final_delivery_date, description, important, billing, igv_included, type_currency, bank, bank_code, interbank_code, detraction_account, stages} = quotationDto;
            // const existQuotation = await prisma.quotation.findFirst()
            // if(existQuotation) throw CustomError.badRequest('Quota already exist');
           

            const newQuotation = await prisma.quotation.create({
                data: {prospect_id_fk: prospect_id, service_id_fk: service_id, user_id_fk: user_id, net_amount, discount, quotation_date, final_delivery_date, description, important, billing, igv_included, type_currency, bank, bank_code, interbank_code, detraction_account}
            });
            //CREANDO LOS STAGES DE LA COTIZACION
            const newStage_list: any[] = []; //PRUEBA *borrar ésta constante que solo es para verificar
            for(const stage of stages){
                const {stage_name, delivery_time, percentage, advance_payment, activities} = stage;
                const newStage = await prisma.stage.create({
                    data:{quotation_id_fk: newQuotation.id, stage_name, delivery_time, percentage, advance_payment, activities}
                })
                newStage_list.push(newStage)//PRUEBA
            }


            return ServerResponseEntity.fromObject({
                message: 'Quotation created successfully',
                status: 'success',
                data: newStage_list,
                error: null
            });

        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
        
        
    }


    async showSelectionListData(): Promise<ServerResponseEntity['props']> {
        try {
            const SelectionListData = await this.getDataList();
            const SelectionListaDatatoEntityMapper = SelectionListDataEntityMapper.selectionListToJson(SelectionListData);
            return ServerResponseEntity.fromObject({
                message: 'Selection list data sent successfully',
                status: 'success',
                data: SelectionListaDatatoEntityMapper,
                error: null
            });

        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }



    private async getAllQuotations(){
        try {
            const quotationArray = await prisma.quotation.findMany({
                select:{
                    id: true,
                    net_amount: true,
                    discount: true,
                    quotation_date: true,
                    igv_included: true,
                    type_currency: true,
                },
            });
            return quotationArray
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }

    private async getDataList(){
        try {
            const prospectList = await prisma.prospect.findMany({
                select: {
                    id: true,
                    organization_name: true,
                }
            })
            const serviceList = await prisma.service.findMany({
                select: {
                    id: true,
                    service_name: true,
                }
            })
            return {
                prospectList: prospectList,
                serviceList: serviceList,
            }
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer('Internal server error')
        }
    }


}

    
