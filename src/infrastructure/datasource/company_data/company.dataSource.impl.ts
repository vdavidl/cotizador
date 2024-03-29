import { prisma } from "../../../data";
import { CompanyDataDto, CustomError, EditCompanyDataDto, IdDto, ServerResponseEntity } from "../../../domain";
import { CompanyDataSource } from "../../../domain/datasource/company_data/company.dataSource";
import { CompanyDataEntityMapper } from "../../mappers";




export class CompanyDataSourceImpl implements CompanyDataSource{

    async showCompanyData(): Promise<ServerResponseEntity['props']> {
        try {
            const dataCompany = await this.getAllDataCompany();
            if(!dataCompany || dataCompany.length === 0) throw CustomError.notFound('Company data doesnt exist');

            const dataCompanyToEntity = dataCompany.map(CompanyDataEntityMapper.companyDataToJson);
            return ServerResponseEntity.fromObject({
                message: 'Company data retrieved successfully', 
                status: 'success', 
                data: { dataCompanyToEntity }, 
                error: null
            });

        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server Error");
        }

    }

    async createCompanyData(createCompanyDataDto: CompanyDataDto): Promise<ServerResponseEntity['props']>{
        try {
            const {commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email} =  createCompanyDataDto;
            //Comprobar que no exista ningún registro datos Empresa
            const existCompanyData = await this.getAllDataCompany();
            if(existCompanyData && existCompanyData.length > 0)  throw CustomError.badRequest('Data company already exist');

            const companyData = await prisma.companyData.create({
                data: {commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email}
            });
            
            return ServerResponseEntity.fromObject({
                message: 'Company data created successfully',
                status: 'success',
                data: null,
                error: null
            })


        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server Error")
        }
    }

    async editCompanyData(companyDataId: IdDto, editCompanyDataDto: EditCompanyDataDto): Promise<ServerResponseEntity['props']> {
        try {
            const {id} = companyDataId;
            const {commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email} = editCompanyDataDto;
            
            const existCompanyData = await this.getCompanyDataById(id);
            if(!existCompanyData) throw CustomError.badRequest('Company data doesnt exist');

            const createCompanyData = await prisma.companyData.update({
                where: {id: id},
               data: {commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email}
            });
            return ServerResponseEntity.fromObject({
                message: 'Company data created successfully', 
                status: 'success',
                data: null,
                error: null
            });

        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Error")
        }
    }


    private async getAllDataCompany(){
        try {
            const dataCompany = await prisma.companyData.findMany();
            return dataCompany;
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }
    private async getCompanyDataById(id: number){
        try {
            const companyData = await prisma.companyData.findUnique( { where: { id }});
            return companyData
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error");
        }
    }

    // private async deleteCompanyDataById(id: number){
    //     try {
    //         const companyData = await prisma.companyData.delete( { where: { id: id }});
    //         return companyData
    //     } catch (error) {
    //         throw CustomError.internalServer(`${error}`);
    //     }
    // }


}